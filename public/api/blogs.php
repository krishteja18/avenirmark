<?php
/**
 * AvenirMark Blog System - Blogs CRUD Endpoint
 */

require_once __DIR__ . '/auth.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Helper to read database with shared lock
function readDB() {
    if (!file_exists(DB_FILE)) {
        return [];
    }
    
    $fp = fopen(DB_FILE, 'r');
    if (!$fp) {
        return [];
    }
    
    // Acquire shared lock
    flock($fp, LOCK_SH);
    
    $size = filesize(DB_FILE);
    $data = $size > 0 ? fread($fp, $size) : '[]';
    
    flock($fp, LOCK_UN);
    fclose($fp);
    
    $blogs = json_decode($data, true);
    return is_array($blogs) ? $blogs : [];
}

// Helper to write database with exclusive lock
function writeDB($data) {
    $fp = fopen(DB_FILE, 'w');
    if (!$fp) {
        return false;
    }
    
    // Acquire exclusive lock
    flock($fp, LOCK_EX);
    
    $result = fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
    
    flock($fp, LOCK_UN);
    fclose($fp);
    
    return $result !== false;
}

// Route request based on HTTP method
switch ($method) {
    case 'GET':
        $blogs = readDB();
        
        // If not authenticated, filter out draft posts
        if (!isAuthenticated()) {
            $blogs = array_filter($blogs, function($blog) {
                return isset($blog['published']) && $blog['published'] === true;
            });
            // Reset array keys for JSON conversion
            $blogs = array_values($blogs);
        }
        
        // Sort by createdAt descending
        usort($blogs, function($a, $b) {
            return strcmp($b['createdAt'] ?? '', $a['createdAt'] ?? '');
        });
        
        echo json_encode([
            'success' => true,
            'data' => $blogs
        ]);
        break;
        
    case 'POST':
        // Require auth and validate CSRF token for write requests
        requireAuth();
        validateCSRFToken();
        
        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $slug = isset($input['slug']) ? trim($input['slug']) : '';
        $shortDescription = isset($input['shortDescription']) ? trim($input['shortDescription']) : '';
        $bannerImage = isset($input['bannerImage']) ? trim($input['bannerImage']) : '';
        $bannerImageAlt = isset($input['bannerImageAlt']) ? trim($input['bannerImageAlt']) : '';
        $content = isset($input['content']) ? trim($input['content']) : '';
        $published = isset($input['published']) ? (bool)$input['published'] : false;
        
        if (empty($title) || empty($slug)) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode([
                'success' => false,
                'message' => 'Post title and URL slug are required.'
            ]);
            exit;
        }
        
        $blogs = readDB();
        
        // Check if slug already exists
        foreach ($blogs as $blog) {
            if ($blog['slug'] === $slug) {
                header('HTTP/1.1 409 Conflict');
                echo json_encode([
                    'success' => false,
                    'message' => 'A blog post with this URL slug already exists.'
                ]);
                exit;
            }
        }
        
        // Create new blog entry
        $newBlog = [
            'id' => uniqid('post_', true),
            'title' => $title,
            'slug' => $slug,
            'shortDescription' => $shortDescription,
            'bannerImage' => $bannerImage,
            'bannerImageAlt' => $bannerImageAlt,
            'content' => $content,
            'published' => $published,
            'createdAt' => date('c'),
            'updatedAt' => date('c')
        ];
        
        $blogs[] = $newBlog;
        
        if (writeDB($blogs)) {
            echo json_encode([
                'success' => true,
                'message' => 'Blog post created successfully.',
                'data' => $newBlog
            ]);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode([
                'success' => false,
                'message' => 'Failed to save blog post to server.'
            ]);
        }
        break;
        
    case 'PUT':
        // Require auth and validate CSRF token for write requests
        requireAuth();
        validateCSRFToken();
        
        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);
        
        $id = isset($input['id']) ? trim($input['id']) : '';
        $title = isset($input['title']) ? trim($input['title']) : '';
        $slug = isset($input['slug']) ? trim($input['slug']) : '';
        $shortDescription = isset($input['shortDescription']) ? trim($input['shortDescription']) : '';
        $bannerImage = isset($input['bannerImage']) ? trim($input['bannerImage']) : '';
        $bannerImageAlt = isset($input['bannerImageAlt']) ? trim($input['bannerImageAlt']) : '';
        $content = isset($input['content']) ? trim($input['content']) : '';
        $published = isset($input['published']) ? (bool)$input['published'] : false;
        
        if (empty($id) || empty($title) || empty($slug)) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode([
                'success' => false,
                'message' => 'Post ID, title, and URL slug are required.'
            ]);
            exit;
        }
        
        $blogs = readDB();
        $foundIndex = -1;
        
        for ($i = 0; $i < count($blogs); $i++) {
            if ($blogs[$i]['id'] === $id) {
                $foundIndex = $i;
            } elseif ($blogs[$i]['slug'] === $slug) {
                // Ensure the slug is not taken by another blog post
                header('HTTP/1.1 409 Conflict');
                echo json_encode([
                    'success' => false,
                    'message' => 'Another blog post with this URL slug already exists.'
                ]);
                exit;
            }
        }
        
        if ($foundIndex === -1) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode([
                'success' => false,
                'message' => 'Blog post not found.'
            ]);
            exit;
        }
        
        // Update the blog entry
        $blogs[$foundIndex]['title'] = $title;
        $blogs[$foundIndex]['slug'] = $slug;
        $blogs[$foundIndex]['shortDescription'] = $shortDescription;
        $blogs[$foundIndex]['bannerImage'] = $bannerImage;
        $blogs[$foundIndex]['bannerImageAlt'] = $bannerImageAlt;
        $blogs[$foundIndex]['content'] = $content;
        $blogs[$foundIndex]['published'] = $published;
        $blogs[$foundIndex]['updatedAt'] = date('c');
        
        if (writeDB($blogs)) {
            echo json_encode([
                'success' => true,
                'message' => 'Blog post updated successfully.',
                'data' => $blogs[$foundIndex]
            ]);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update blog post.'
            ]);
        }
        break;
        
    case 'DELETE':
        // Require auth and validate CSRF token for write requests
        requireAuth();
        validateCSRFToken();
        
        $rawInput = file_get_contents('php://input');
        $input = json_decode($rawInput, true);
        
        $id = isset($input['id']) ? trim($input['id']) : '';
        
        if (empty($id)) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode([
                'success' => false,
                'message' => 'Post ID is required.'
            ]);
            exit;
        }
        
        $blogs = readDB();
        $foundIndex = -1;
        
        for ($i = 0; $i < count($blogs); $i++) {
            if ($blogs[$i]['id'] === $id) {
                $foundIndex = $i;
                break;
            }
        }
        
        if ($foundIndex === -1) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode([
                'success' => false,
                'message' => 'Blog post not found.'
            ]);
            exit;
        }
        
        // Optional: delete associated banner image file if it exists and is in the uploads directory
        $bannerUrl = $blogs[$foundIndex]['bannerImage'] ?? '';
        if ($bannerUrl && strpos($bannerUrl, UPLOAD_URL) === 0) {
            $filename = basename($bannerUrl);
            $filePath = UPLOAD_DIR . $filename;
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        
        // Remove the blog entry
        array_splice($blogs, $foundIndex, 1);
        
        if (writeDB($blogs)) {
            echo json_encode([
                'success' => true,
                'message' => 'Blog post deleted successfully.'
            ]);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode([
                'success' => false,
                'message' => 'Failed to delete blog post.'
            ]);
        }
        break;
        
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed.'
        ]);
        break;
}
?>
