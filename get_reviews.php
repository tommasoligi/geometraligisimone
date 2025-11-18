<?php
header('Content-Type: application/json');
if (file_exists('recensioni.json')) {
    echo file_get_contents('recensioni.json');
} else {
    echo json_encode([]);
}
?>
