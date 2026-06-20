<?php
/**
 * AvenirMark Blog System - Admin Login Endpoint
 */

require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

// Get JSON post data
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$username = isset($input['username']) ? trim($input['username']) : '';
$password = isset($input['password']) ? trim($input['password']) : '';

if (empty($username) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required.'
    ]);
    exit;
}

// Verify credentials
if (strtolower($username) === strtolower(ADMIN_USERNAME) && password_verify($password, ADMIN_PASSWORD_HASH)) {
    // Regenerate session ID for security to prevent session fixation
    session_regenerate_id(true);
    
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = ADMIN_USERNAME;
    
    // Generate new CSRF token
    $token = getCSRFToken();
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful.',
        'username' => ADMIN_USERNAME,
        'csrfToken' => $token
    ]);
} else {
    // Add artificial delay to slow down brute force attacks
    usleep(800000); // 800ms
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password.'
    ]);
}
?>
