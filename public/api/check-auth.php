<?php
/**
 * AvenirMark Blog System - Auth Status Check Endpoint
 */

require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

if (isAuthenticated()) {
    echo json_encode([
        'authenticated' => true,
        'username' => $_SESSION['admin_username'],
        'csrfToken' => getCSRFToken()
    ]);
} else {
    echo json_encode([
        'authenticated' => false
    ]);
}
?>
