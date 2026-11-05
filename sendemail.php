<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pulizia e sicurezza dei campi in ingresso
    $name = trim($_POST["name"]);
    $name = str_replace(array("\r", "\n"), '', $name);
    $name = strip_tags($name);

    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    
    $phone = trim($_POST["phone"]);
    $phone = str_replace(array("\r", "\n"), '', $phone);
    $phone = strip_tags($phone);

    $message = trim($_POST["message"]);
    $message = strip_tags($message);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Errore: dati non validi.";
        exit;
    }

    $recipient = "info@simoneligi.it";
    $subject = "Nuovo messaggio da $name";

    $email_content = "Nome: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Telefono: $phone\n";
    }
    $email_content .= "Messaggio:\n$message\n";

    // Usiamo la casella postmaster esistente come mittente tecnico
    $email_headers = "From: postmaster@simoneligi.it\r\n";
    $email_headers .= "Reply-To: $email";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        header("Location: success.html");
        exit;
    } else {
        http_response_code(500);
        echo "Errore interno, riprova più tardi.";
    }
} else {
    http_response_code(403);
    echo "Metodo non consentito.";
}
?>
