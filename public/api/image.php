<?php
/**
 * AvenirMark Blog System - Secure Image Proxy Endpoint
 * Serves uploaded images securely from persistent storage outside public_html.
 */

require_once __DIR__ . '/config.php';

$file = isset($_GET['file']) ? basename($_GET['file']) : '';

if (empty($file)) {
    header('HTTP/1.1 400 Bad Request');
    echo 'Filename parameter missing.';
    exit;
}

$filePath = UPLOAD_DIR . $file;

if (!file_exists($filePath)) {
    header('HTTP/1.1 404 Not Found');
    echo 'Image not found.';
    exit;
}

// Determine MIME type
$mime = 'image/jpeg';
$ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
switch ($ext) {
    case 'png':
        $mime = 'image/png';
        break;
    case 'webp':
        $mime = 'image/webp';
        break;
    case 'gif':
        $mime = 'image/gif';
        break;
    case 'svg':
        $mime = 'image/svg+xml';
        break;
}

// Cache control headers for fast delivery
header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($filePath));
header('Cache-Control: public, max-age=31536000');

readfile($filePath);
exit;
?>
