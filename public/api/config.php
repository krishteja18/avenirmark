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

// Determine persistent data directory (outside deployment root on live server)
$persistentBase = dirname(__DIR__, 2) . '/avenirmark_persistent_data';
if (!@is_dir($persistentBase)) {
    @mkdir($persistentBase, 0755, true);
}
// Fallback if parent dir is not writable
if (!@is_dir($persistentBase) || !@is_writable($persistentBase)) {
    $persistentBase = __DIR__ . '/data';
    if (!file_exists($persistentBase)) {
        @mkdir($persistentBase, 0755, true);
    }
}

define('DATA_DIR', $persistentBase);
define('DB_FILE', DATA_DIR . '/blogs.json');
define('UPLOAD_DIR', DATA_DIR . '/uploads/');
define('UPLOAD_URL', '/api/image.php?file=');
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB in bytes

// Admin Credentials Configuration
define('ADMIN_USERNAME', 'admin');

// Bcrypt hash for default password: AvenirMark@2026
// To change your password, generate a new bcrypt hash and paste it here.
define('ADMIN_PASSWORD_HASH', '$2y$10$BJv.SSD3cRJdiA6Yak0dOeG/52qvy4GLvPnbMepBoHmUqTi00YoFu');

// Helper function to check/create uploads directory
if (!file_exists(UPLOAD_DIR)) {
    @mkdir(UPLOAD_DIR, 0755, true);
}

// Helper function to check/create database file
if (!file_exists(DB_FILE)) {
    @file_put_contents(DB_FILE, json_encode([], JSON_PRETTY_PRINT));
}
?>
