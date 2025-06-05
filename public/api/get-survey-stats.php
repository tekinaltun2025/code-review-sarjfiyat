
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://sarjfiyatlari.com'); // Specific domain only
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Database credentials should come from environment variables
    $db_host = $_ENV['DB_HOST'] ?? 'localhost';
    $db_name = $_ENV['DB_NAME'] ?? '';
    $db_user = $_ENV['DB_USER'] ?? '';
    $db_pass = $_ENV['DB_PASS'] ?? '';
    
    if (empty($db_name) || empty($db_user)) {
        throw new Exception("Database configuration missing");
    }
    
    // Connect to database
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception("Service temporarily unavailable");
    }
    
    // Check if table exists
    $tableExists = $conn->query("SHOW TABLES LIKE 'survey_responses'");
    if ($tableExists->num_rows == 0) {
        echo json_encode(['success' => true, 'data' => []]);
        exit();
    }
    
    // Secure query with proper sanitization
    $sql = "SELECT 
                provider_id, 
                provider_name, 
                AVG(rating) as average_rating, 
                COUNT(*) as response_count,
                GROUP_CONCAT(
                    CASE 
                        WHEN comment IS NOT NULL AND comment != '' 
                        THEN SUBSTRING(comment, 1, 200) 
                        ELSE NULL 
                    END 
                    SEPARATOR '|||'
                ) as comments
            FROM survey_responses 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
            GROUP BY provider_id, provider_name
            HAVING response_count >= 1
            ORDER BY average_rating DESC, response_count DESC
            LIMIT 50";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        error_log("Query failed: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Process comments safely
        $comments = [];
        if (!empty($row['comments'])) {
            $rawComments = explode('|||', $row['comments']);
            $comments = array_filter(array_map('trim', $rawComments), function($comment) {
                return !empty($comment) && strlen($comment) > 3;
            });
        }
        
        $data[] = [
            'provider_id' => htmlspecialchars($row['provider_id'], ENT_QUOTES, 'UTF-8'),
            'provider_name' => htmlspecialchars($row['provider_name'], ENT_QUOTES, 'UTF-8'),
            'average_rating' => round((float)$row['average_rating'], 1),
            'response_count' => (int)$row['response_count'],
            'comments' => array_map(function($comment) {
                return htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');
            }, array_slice($comments, 0, 10)) // Limit to 10 comments
        ];
    }
    
    echo json_encode([
        'success' => true, 
        'data' => $data,
        'generated_at' => date('c')
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    error_log("Survey stats error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable']);
}
?>
