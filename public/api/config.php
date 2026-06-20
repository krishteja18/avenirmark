<?php
/**
 * AvenirMark Blog System - Configuration File
 */

// Error reporting - disable in production, enable for debugging
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Define site constants
define('DB_FILE', __DIR__ . '/blogs.json');
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('UPLOAD_URL', '/api/uploads/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB in bytes

// Admin Credentials Configuration
define('ADMIN_USERNAME', 'admin');

// Bcrypt hash for default password: AvenirMark@2026
// To change your password, generate a new bcrypt hash and paste it here.
define('ADMIN_PASSWORD_HASH', '$2y$10$tZ922sM1YIqW0e3T2y9eOeM9wK17V3c51WdSwr1qWjXG.Q6zZ2u.C');

// Helper function to check/create uploads directory
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Helper function to check/create database file
if (!file_exists(DB_FILE)) {
    file_put_contents(DB_FILE, json_encode([], JSON_PRETTY_PRINT));
}
?>
