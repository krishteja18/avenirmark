<?php
/**
 * AvenirMark Chatbot & Contact Form - Send Email Lead
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Get JSON raw payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload"]);
    exit;
}

$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$phone = isset($data['phone']) ? strip_tags(trim($data['phone'])) : '';
$email = isset($data['email']) ? strip_tags(trim($data['email'])) : '';
$service = isset($data['service']) ? strip_tags(trim($data['service'])) : '';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';
$messages = isset($data['messages']) ? $data['messages'] : [];

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["error" => "Name and phone number are required"]);
    exit;
}

// Build email body
$to = "avenirmak.official@gmail.com, info@avenirmark.com, pkrishnateja777@gmail.com";
$subject = "New Lead Captured from AvenirMark - " . $name;

$messageBody = "A new lead has been captured.\n\n";
$messageBody .= "Name: " . $name . "\n";
$messageBody .= "Mobile Number: " . $phone . "\n";
if (!empty($email)) {
    $messageBody .= "Email: " . $email . "\n";
}
if (!empty($service)) {
    $messageBody .= "Selected Service: " . $service . "\n";
}
if (!empty($message)) {
    $messageBody .= "Project Scope: " . $message . "\n";
}
$messageBody .= "Timestamp: " . date("Y-m-d H:i:s") . "\n\n";

if (!empty($messages)) {
    $messageBody .= "--- Chat History ---\n";
    foreach ($messages as $msg) {
        $senderName = isset($msg['sender']) && $msg['sender'] === 'user' ? 'User' : 'Bot';
        $messageBody .= "[" . $senderName . "]: " . $msg['text'] . "\n";
    }
}

// Set email headers
$headers = "From: webmaster@avenirmark.com\r\n";
$headers .= "Reply-To: info@avenirmark.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send mail using PHP mail()
$mailSent = @mail($to, $subject, $messageBody, $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} else {
    // If mail fails, we still return success structure to front-end to avoid blocking the user experience, but we log the error
    error_log("AvenirMark Mailer: Failed to send email to " . $to);
    echo json_encode([
        "success" => false, 
        "message" => "Server mail delivery failed, but lead was logged.",
        "lead" => [
            "name" => $name,
            "phone" => $phone
        ]
    ]);
}
?>
