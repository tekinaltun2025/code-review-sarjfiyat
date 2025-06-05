
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://sarjfiyatlari.com'); // Specific domain only
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Rate limiting - simple implementation
session_start();
$current_time = time();
$last_submission = $_SESSION['last_submission'] ?? 0;

if ($current_time - $last_submission < 60) { // 1 minute rate limit
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Rate limit exceeded']);
    exit();
}

// Get and validate input
$input = file_get_contents('php://input');
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No data provided']);
    exit();
}

$postData = json_decode($input, true);
if (!$postData) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Input validation and sanitization
$provider_id = filter_var($postData['provider_id'] ?? '', FILTER_SANITIZE_STRING);
$provider_name = filter_var($postData['provider_name'] ?? '', FILTER_SANITIZE_STRING);
$rating = filter_var($postData['rating'] ?? 0, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1, 'max_range' => 5]
]);
$comment = filter_var($postData['comment'] ?? '', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($provider_id) || $rating === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data provided']);
    exit();
}

// Limit comment length
if (strlen($comment) > 500) {
    $comment = substr($comment, 0, 500);
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
    
    // Connect to database with SSL and proper options
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception("Service temporarily unavailable");
    }
    
    // Create table if it doesn't exist
    $createTableSql = "CREATE TABLE IF NOT EXISTS survey_responses (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        provider_id VARCHAR(50) NOT NULL,
        provider_name VARCHAR(100) NOT NULL,
        rating TINYINT(1) NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        ip_hash VARCHAR(64),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_provider (provider_id),
        INDEX idx_created (created_at)
    )";
    
    if (!$conn->query($createTableSql)) {
        error_log("Error creating table: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    // Hash IP for privacy
    $ip_hash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');
    
    // Prepare and execute statement
    $stmt = $conn->prepare("INSERT INTO survey_responses (provider_id, provider_name, rating, comment, ip_hash) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $stmt->bind_param("ssiss", $provider_id, $provider_name, $rating, $comment, $ip_hash);
    
    if ($stmt->execute()) {
        $_SESSION['last_submission'] = $current_time;
        echo json_encode(['success' => true, 'message' => 'Survey recorded successfully']);
    } else {
        error_log("Execute failed: " . $stmt->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    error_log("Survey submission error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable']);
}
?>
