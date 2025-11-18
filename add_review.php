<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
    $testo = isset($_POST['testo']) ? trim($_POST['testo']) : '';
    $stelle = isset($_POST['stelle']) ? intval($_POST['stelle']) : 5;

    if (empty($nome) || empty($testo) || strlen($testo) < 10) {
        echo json_encode(['success' => false, 'message' => 'Nome e testo sono obbligatori e testo almeno 10 caratteri.']);
        exit;
    }
    if ($stelle < 1 || $stelle > 5) $stelle = 5;

    $file_path = 'recensioni.json';
    if (file_exists($file_path)) {
        $json = file_get_contents($file_path);
        $reviews = json_decode($json, true);
        if (!is_array($reviews)) $reviews = [];
    } else {
        $reviews = [];
    }

    $new_review = [
        'nome' => htmlspecialchars($nome),
        'stelle' => $stelle,
        'testo' => htmlspecialchars($testo),
        'data' => date('d/m/Y H:i')
    ];

    array_unshift($reviews, $new_review);
    $json_output = json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    if (file_put_contents($file_path, $json_output)) {
        echo json_encode(['success' => true, 'message' => 'Recensione aggiunta!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
}
?>
