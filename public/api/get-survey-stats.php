
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://sarjfiyatlari.com');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

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

// Rate limiting for stats endpoint
session_start();
$current_time = time();
$ip_hash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');
$stats_requests_key = 'stats_requests_' . $ip_hash;
$stats_requests = $_SESSION[$stats_requests_key] ?? [];

// Clean old requests (older than 10 minutes)
$stats_requests = array_filter($stats_requests, function($time) use ($current_time) {
    return ($current_time - $time) < 600;
});

// Check rate limits (max 30 requests per 10 minutes)
if (count($stats_requests) >= 30) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Rate limit exceeded']);
    exit();
}

$stats_requests[] = $current_time;
$_SESSION[$stats_requests_key] = $stats_requests;

try {
    // Database credentials from environment variables
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
    
    // Enhanced secure query with better filtering
    $sql = "SELECT 
                provider_id, 
                provider_name, 
                AVG(rating) as average_rating, 
                COUNT(*) as response_count,
                GROUP_CONCAT(
                    CASE 
                        WHEN comment IS NOT NULL AND comment != '' AND LENGTH(comment) > 3
                        THEN SUBSTRING(comment, 1, 150) 
                        ELSE NULL 
                    END 
                    SEPARATOR '|||'
                ) as comments
            FROM survey_responses 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            AND rating BETWEEN 1 AND 5
            AND LENGTH(provider_id) <= 50
            AND LENGTH(provider_name) <= 100
            GROUP BY provider_id, provider_name
            HAVING response_count >= 1 AND response_count <= 10000
            ORDER BY average_rating DESC, response_count DESC
            LIMIT 25";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        error_log("Query failed: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Enhanced comment processing with security
        $comments = [];
        if (!empty($row['comments'])) {
            $rawComments = explode('|||', $row['comments']);
            foreach ($rawComments as $comment) {
                $comment = trim($comment);
                if (!empty($comment) && strlen($comment) > 3 && strlen($comment) <= 150) {
                    // Additional XSS protection
                    $comment = preg_replace('/[<>"\']/', '', $comment);
                    $comments[] = $comment;
                }
                if (count($comments) >= 5) break; // Limit to 5 comments
            }
        }
        
        // Validate and sanitize all output
        $provider_id = htmlspecialchars($row['provider_id'], ENT_QUOTES, 'UTF-8');
        $provider_name = htmlspecialchars($row['provider_name'], ENT_QUOTES, 'UTF-8');
        $average_rating = round((float)$row['average_rating'], 1);
        $response_count = min((int)$row['response_count'], 10000); // Cap at reasonable number
        
        // Final validation
        if (!empty($provider_id) && !empty($provider_name) && $average_rating >= 1 && $average_rating <= 5) {
            $data[] = [
                'provider_id' => $provider_id,
                'provider_name' => $provider_name,
                'average_rating' => $average_rating,
                'response_count' => $response_count,
                'comments' => array_map(function($comment) {
                    return htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');
                }, $comments)
            ];
        }
    }
    
    echo json_encode([
        'success' => true, 
        'data' => $data,
        'generated_at' => date('c'),
        'total_providers' => count($data)
    ]);
    
    $conn->close();
    
} catch (Exception $e) {
    error_log("Survey stats error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable']);
}
?>
