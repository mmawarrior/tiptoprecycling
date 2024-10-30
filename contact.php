<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json'); // Zorg ervoor dat de header JSON aangeeft

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Controleer of de velden zijn ingevuld
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Vul alle velden in.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Debugging (alleen inschakelen tijdens ontwikkeling)
        // $mail->SMTPDebug = 2;  // Zet op 2 voor gedetailleerde foutmeldingen, 0 voor productie
        
        // Serverinstellingen
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'datmmawarrior@gmail.com';  // Je Gmail-adres
        $mail->Password = '';  // Het app-wachtwoord dat je hebt aangemaakt
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Ontvangers
        $mail->setFrom($email, $name);
        $mail->addAddress('datmmawarrior@gmail.com');  // Ontvanger, in dit geval jouw eigen e-mailadres

        // E-mail content
        $mail->isHTML(true);
        $mail->Subject = "Nieuw contactformulier bericht van $name";
        $mail->Body    = "
            <h3>Nieuw bericht ontvangen:</h3>
            <p><strong>Naam:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Bericht:</strong><br>$message</p>
        ";

        // Verstuur de e-mail
        if ($mail->send()) {
            echo json_encode(['success' => true, 'message' => 'Je bericht is succesvol verstuurd!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Het versturen van de e-mail is mislukt.']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Er is iets misgegaan, probeer het opnieuw. Error: ' . $mail->ErrorInfo]);
    }
} else {
    // Als het geen POST-verzoek is, geven we een foutmelding
    echo json_encode(['success' => false, 'message' => 'Ongeldige aanvraag.']);
}
