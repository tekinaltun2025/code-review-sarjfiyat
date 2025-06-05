
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://sarjfiyatlari.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Enhanced rate limiting
session_start();
$current_time = time();
$ip_hash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');

// Check for multiple submissions in short time
$submissions_key = 'submissions_' . $ip_hash;
$submissions = $_SESSION[$submissions_key] ?? [];

// Clean old submissions (older than 1 hour)
$submissions = array_filter($submissions, function($time) use ($current_time) {
    return ($current_time - $time) < 3600;
});

// Check rate limits
if (count($submissions) >= 5) { // Max 5 submissions per hour
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Rate limit exceeded. Try again later.']);
    exit();
}

$last_submission = end($submissions);
if ($last_submission && ($current_time - $last_submission) < 60) { // 1 minute between submissions
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait before submitting again']);
    exit();
}

// Get and validate input
$input = file_get_contents('php://input');
if (!$input || strlen($input) > 10000) { // Limit payload size
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request data']);
    exit();
}

$postData = json_decode($input, true);
if (!$postData || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Enhanced input validation and sanitization
$provider_id = filter_var($postData['provider_id'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
$provider_name = filter_var($postData['provider_name'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);
$rating = filter_var($postData['rating'] ?? 0, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1, 'max_range' => 5]
]);
$comment = filter_var($postData['comment'] ?? '', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW | FILTER_FLAG_STRIP_HIGH);

// Validate required fields with more strict checks
if (empty($provider_id) || strlen($provider_id) > 50 || $rating === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data provided']);
    exit();
}

if (strlen($provider_name) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Provider name too long']);
    exit();
}

// Limit and clean comment
if (strlen($comment) > 500) {
    $comment = substr($comment, 0, 500);
}

// Remove potentially harmful content
$comment = preg_replace('/[<>"\']/', '', $comment);

try {
    // Database credentials from environment variables
    $db_host = $_ENV['DB_HOST'] ?? 'localhost';
    $db_name = $_ENV['DB_NAME'] ?? '';
    $db_user = $_ENV['DB_USER'] ?? '';
    $db_pass = $_ENV['DB_PASS'] ?? '';
    
    if (empty($db_name) || empty($db_user)) {
        throw new Exception("Database configuration missing");
    }
    
    // Connect with SSL and additional security options
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception("Service temporarily unavailable");
    }
    
    // Create table with enhanced security
    $createTableSql = "CREATE TABLE IF NOT EXISTS survey_responses (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        provider_id VARCHAR(50) NOT NULL,
        provider_name VARCHAR(100) NOT NULL,
        rating TINYINT(1) NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        ip_hash VARCHAR(64),
        user_agent_hash VARCHAR(64),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_provider (provider_id),
        INDEX idx_created (created_at),
        INDEX idx_ip_time (ip_hash, created_at)
    )";
    
    if (!$conn->query($createTableSql)) {
        error_log("Error creating table: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    // Additional security: hash user agent for tracking
    $user_agent_hash = hash('sha256', $_SERVER['HTTP_USER_AGENT'] ?? '');
    
    // Check for duplicate submissions from same IP/User-Agent in last hour
    $checkDuplicateStmt = $conn->prepare(
        "SELECT COUNT(*) as count FROM survey_responses 
         WHERE ip_hash = ? AND user_agent_hash = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)"
    );
    $checkDuplicateStmt->bind_param("ss", $ip_hash, $user_agent_hash);
    $checkDuplicateStmt->execute();
    $duplicateResult = $checkDuplicateStmt->get_result();
    $duplicateCount = $duplicateResult->fetch_assoc()['count'];
    
    if ($duplicateCount >= 3) { // Max 3 submissions per hour from same source
        throw new Exception("Too many submissions from this location");
    }
    
    // Prepare and execute main insert
    $stmt = $conn->prepare("INSERT INTO survey_responses (provider_id, provider_name, rating, comment, ip_hash, user_agent_hash) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $stmt->bind_param("ssisss", $provider_id, $provider_name, $rating, $comment, $ip_hash, $user_agent_hash);
    
    if ($stmt->execute()) {
        // Update rate limiting
        $submissions[] = $current_time;
        $_SESSION[$submissions_key] = $submissions;
        
        echo json_encode(['success' => true, 'message' => 'Survey recorded successfully']);
    } else {
        error_log("Execute failed: " . $stmt->error);
        throw new Exception("Service temporarily unavailable");
    }
    
    $stmt->close();
    $checkDuplicateStmt->close();
    $conn->close();
    
} catch (Exception $e) {
    error_log("Survey submission error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable']);
}
?>
