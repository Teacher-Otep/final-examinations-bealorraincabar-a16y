<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

try {
    $sql = "SELECT id, surname, name, middlename, address, contact_number FROM students ORDER BY id DESC";
    $stmt = $pdo->query($sql);
    $students = $stmt->fetchAll();
    
    echo json_encode(['success' => true, 'students' => $students]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>