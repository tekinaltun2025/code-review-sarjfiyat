
<?php
// Set headers first before any output
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parametreleri al (GET veya POST metodu için destek sağla)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db_name = $_GET['db_name'] ?? '';
    $db_user = $_GET['db_user'] ?? '';
    $db_pass = $_GET['db_pass'] ?? '';
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents('php://input'), true);
    $db_name = $postData['db_name'] ?? '';
    $db_user = $postData['db_user'] ?? '';
    $db_pass = $postData['db_pass'] ?? '';
} else {
    echo json_encode(['success' => false, 'message' => 'Sadece GET veya POST metodu kabul edilir']);
    exit();
}

// Veritabanı bilgilerini doğrula
if (empty($db_name) || empty($db_user) || empty($db_pass)) {
    echo json_encode(['success' => false, 'message' => 'Veritabanı bilgileri gereklidir']);
    exit();
}

try {
    // Veritabanına bağlan
    $conn = new mysqli('localhost', $db_user, $db_pass, $db_name);

    // Bağlantıyı kontrol et
    if ($conn->connect_error) {
        throw new Exception("Bağlantı hatası: " . $conn->connect_error);
    }
    
    // Tablo var mı kontrol et
    $tableExists = $conn->query("SHOW TABLES LIKE 'survey_responses'");
    if ($tableExists->num_rows == 0) {
        // Tablo yoksa boş veri döndür
        echo json_encode(['success' => true, 'data' => []]);
        exit();
    }
    
    // Operatörlere göre ortalama puanları sorgula
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
        throw new Exception("Sorgu çalıştırılırken hata: " . $conn->error);
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Yorumları düzenle
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
    
    // Bağlantıyı kapat
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
