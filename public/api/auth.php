<?php
/**
 * AvenirMark Blog System - Authentication Security Helpers
 */

require_once __DIR__ . '/config.php';

// Safe session start settings
if (session_status() == PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure' => isset($_SERVER['HTTPS']),
        'cookie_samesite' => 'Lax',
        'use_strict_mode' => true
    ]);
}

/**
 * Checks if the user is currently authenticated.
 * Returns true if logged in, false otherwise.
 */
function isAuthenticated() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

/**
 * Enforces admin authentication. If not logged in, returns a 401 Unauthorized JSON response and exits.
 */
function requireAuth() {
    if (!isAuthenticated()) {
        header('Content-Type: application/json', true, 401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized. Please log in.'
        ]);
        exit;
    }
}

/**
 * Generates or retrieves a CSRF token for the session.
 */
function getCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validates the CSRF token in the request headers.
 */
function validateCSRFToken() {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    
    // Retrieve token case-insensitively from headers
    $token = '';
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'x-csrf-token') {
            $token = $value;
            break;
        }
    }
    
    // Fallback to standard PHP server variable (populated by CGI/FastCGI/Nginx)
    if (empty($token) && isset($_SERVER['HTTP_X_CSRF_TOKEN'])) {
        $token = $_SERVER['HTTP_X_CSRF_TOKEN'];
    }
    
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        header('Content-Type: application/json', true, 403);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid CSRF token.'
        ]);
        exit;
    }
}

// Enable CORS for development/testing if requested (since React usually runs on dev server)
// In production on Hostinger, the React SPA and API are on the same domain, so this is just a fallback.
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token, X-Requested-With");
}

// Handle CORS preflight options request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>
