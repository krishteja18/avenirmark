<?php
/**
 * AvenirMark Blog System - Secure File Upload Endpoint
 */

require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

// Require auth and validate CSRF
requireAuth();
validateCSRFToken();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

if (!isset($_FILES['bannerImage']) || $_FILES['bannerImage']['error'] !== UPLOAD_ERR_OK) {
    $errorMsg = 'No file uploaded or upload error occurred.';
    if (isset($_FILES['bannerImage'])) {
        switch ($_FILES['bannerImage']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errorMsg = 'File exceeds upload limit (Max 10MB).';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMsg = 'File uploaded only partially.';
                break;
            case UPLOAD_ERR_NO_FILE:
                $errorMsg = 'No file was uploaded.';
                break;
        }
    }
    
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        'success' => false,
        'message' => $errorMsg
    ]);
    exit;
}

$file = $_FILES['bannerImage'];

// Enforce Max File Size limit
if ($file['size'] > MAX_FILE_SIZE) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        'success' => false,
        'message' => 'File size exceeds limit of 10MB.'
    ]);
    exit;
}

// Enforce extension validation
$fileInfo = pathinfo($file['name']);
$extension = isset($fileInfo['extension']) ? strtolower($fileInfo['extension']) : '';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

if (!in_array($extension, $allowedExtensions)) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        'success' => false,
        'message' => 'Only JPG, PNG, JPEG, and WebP files are allowed.'
    ]);
    exit;
}

// Verify MIME Type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!in_array($mimeType, $allowedMimeTypes)) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        'success' => false,
        'message' => 'Invalid image content (MIME type mismatch).'
    ]);
    exit;
}

// Sanitize filename and make it unique
$filename = uniqid('banner_', true) . '.' . $extension;
$destination = UPLOAD_DIR . $filename;

// Ensure upload directory exists
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Move file to upload directory
if (move_uploaded_file($file['tmp_name'], $destination)) {
    // Return relative URL for storage in the JSON database
    // We construct a path relative to the root URL (e.g. /api/uploads/filename)
    // Note: Adjust UPLOAD_URL in config.php to match your Hostinger deployment folder structure
    $fileUrl = UPLOAD_URL . $filename;
    
    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully.',
        'url' => $fileUrl
    ]);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save uploaded file on the server.'
    ]);
}
?>
