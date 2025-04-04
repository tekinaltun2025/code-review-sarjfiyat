
<?php
// Set headers first before any output
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Only GET method is allowed']);
    exit();
}

// Get database credentials from query parameters
$db_name = $_GET['db_name'] ?? '';
$db_user = $_GET['db_user'] ?? '';
$db_pass = $_GET['db_pass'] ?? '';

// Validate database credentials
if (empty($db_name) || empty($db_user) || empty($db_pass)) {
    echo json_encode(['success' => false, 'message' => 'Database credentials are required']);
    exit();
}

try {
    // Connect to the database
    $conn = new mysqli('localhost', $db_user, $db_pass, $db_name);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Check if table exists
    $tableExists = $conn->query("SHOW TABLES LIKE 'survey_responses'");
    if ($tableExists->num_rows == 0) {
        // Return empty data if table doesn't exist
        echo json_encode(['success' => true, 'data' => []]);
        exit();
    }
    
    // Query to get average ratings by provider
    $sql = "SELECT 
                provider_id, 
                provider_name, 
                AVG(rating) as average_rating, 
                COUNT(*) as response_count,
                GROUP_CONCAT(comment SEPARATOR '|||') as comments
            FROM survey_responses 
            GROUP BY provider_id, provider_name
            ORDER BY average_rating DESC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Error executing query: " . $conn->error);
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Format the comments array
        $comments = explode('|||', $row['comments']);
        $filteredComments = array_filter($comments, function($comment) {
            return !empty(trim($comment));
        });
        
        $data[] = [
            'provider_id' => $row['provider_id'],
            'provider_name' => $row['provider_name'],
            'average_rating' => (float)number_format($row['average_rating'], 1),
            'response_count' => (int)$row['response_count'],
            'comments' => $filteredComments
        ];
    }
    
    echo json_encode(['success' => true, 'data' => $data]);
    
    // Close connection
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
