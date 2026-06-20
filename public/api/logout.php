<?php
/**
 * AvenirMark Blog System - Admin Logout Endpoint
 */

require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

if (session_status() !== PHP_SESSION_NONE) {
    // Unset all session variables
    $_SESSION = array();
    
    // Destroy the session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(), 
            '', 
            time() - 42000,
            $params["path"], 
            $params["domain"],
            $params["secure"], 
            $params["httponly"]
        );
    }
    
    // Destroy the session
    session_destroy();
}

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully.'
]);
?>
