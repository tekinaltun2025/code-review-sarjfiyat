
<?php
header('Content-Type: application/json');

// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST method is allowed']);
    exit();
}

// Get the POST data
$postData = json_decode(file_get_contents('php://input'), true);

if (!$postData) {
    echo json_encode(['success' => false, 'message' => 'No data provided']);
    exit();
}

// Extract database credentials from the request
$db_name = $postData['db_name'] ?? '';
$db_user = $postData['db_user'] ?? '';
$db_pass = $postData['db_pass'] ?? '';

// Remove database credentials from the data to be stored
unset($postData['db_name']);
unset($postData['db_user']);
unset($postData['db_pass']);

// Extract the survey data
$provider_id = $postData['provider_id'] ?? '';
$provider_name = $postData['provider_name'] ?? '';
$rating = $postData['rating'] ?? 0;
$comment = $postData['comment'] ?? '';

// Validate required fields
if (empty($provider_id) || $rating <= 0) {
    echo json_encode(['success' => false, 'message' => 'Provider and rating are required']);
    exit();
}

try {
    // Connect to the database
    $conn = new mysqli('localhost', $db_user, $db_pass, $db_name);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Create table if it doesn't exist
    $createTableSql = "CREATE TABLE IF NOT EXISTS survey_responses (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        provider_id VARCHAR(255) NOT NULL,
        provider_name VARCHAR(255) NOT NULL,
        rating INT(1) NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($createTableSql)) {
        throw new Exception("Error creating table: " . $conn->error);
    }
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO survey_responses (provider_id, provider_name, rating, comment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssis", $provider_id, $provider_name, $rating, $comment);
    
    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Survey response recorded successfully']);
    } else {
        throw new Exception("Error inserting data: " . $stmt->error);
    }
    
    // Close connections
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
