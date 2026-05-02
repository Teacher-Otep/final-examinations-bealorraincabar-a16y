<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit();
}

try {
    $sql = "UPDATE students SET 
            surname = :surname,
            name = :name,
            middlename = :middlename,
            address = :address,
            contact_number = :contact_number
            WHERE id = :id";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id' => $data['id'],
        ':surname' => $data['surname'],
        ':name' => $data['name'],
        ':middlename' => $data['middlename'],
        ':address' => $data['address'],
        ':contact_number' => $data['contact_number']
    ]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>