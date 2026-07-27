<?php
/**
 * AvenirMark Blog System - Dynamic XML Sitemap Generator
 */

// Set XML content type header
header('Content-Type: application/xml; charset=utf-8');

// Define the website domain (adjust to your production domain if different)
$domain = "https://avenirmark.com";

// Base static pages list
$staticPages = [
    [
        'loc' => $domain . '/',
        'changefreq' => 'weekly',
        'priority' => '1.0'
    ],
    [
        'loc' => $domain . '/about-us',
        'changefreq' => 'monthly',
        'priority' => '0.8'
    ],
    [
        'loc' => $domain . '/blogs',
        'changefreq' => 'daily',
        'priority' => '0.9'
    ],
    [
        'loc' => $domain . '/ai-conference',
        'changefreq' => 'monthly',
        'priority' => '0.8'
    ]
];

// Read blogs.json database
$blogsFile = __DIR__ . '/api/blogs.json';
$blogs = [];

if (file_exists($blogsFile)) {
    $rawContent = file_get_contents($blogsFile);
    $decoded = json_decode($rawContent, true);
    if (is_array($decoded)) {
        $blogs = $decoded;
    }
}

// Generate the sitemap XML
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Output static pages
foreach ($staticPages as $page) {
    echo '  <url>' . "\n";
    echo '    <loc>' . htmlspecialchars($page['loc']) . '</loc>' . "\n";
    echo '    <changefreq>' . $page['changefreq'] . '</changefreq>' . "\n";
    echo '    <priority>' . $page['priority'] . '</priority>' . "\n";
    echo '  </url>' . "\n";
}

// Output dynamic blog pages
foreach ($blogs as $blog) {
    // Only include published blogs in the public sitemap
    if (isset($blog['published']) && $blog['published'] === true) {
        $slug = isset($blog['slug']) ? $blog['slug'] : '';
        if ($slug) {
            $loc = $domain . '/blog/' . $slug;
            // Use edit date or creation date if available for lastmod
            $lastmod = isset($blog['updatedAt']) ? $blog['updatedAt'] : (isset($blog['createdAt']) ? $blog['createdAt'] : '');
            
            echo '  <url>' . "\n";
            echo '    <loc>' . htmlspecialchars($loc) . '</loc>' . "\n";
            
            if ($lastmod) {
                // Format lastmod date to W3C datetime format (YYYY-MM-DD)
                $dateOnly = substr($lastmod, 0, 10);
                if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateOnly)) {
                    echo '    <lastmod>' . $dateOnly . '</lastmod>' . "\n";
                }
            }
            
            echo '    <changefreq>monthly</changefreq>' . "\n";
            echo '    <priority>0.7</priority>' . "\n";
            echo '  </url>' . "\n";
        }
    }
}

echo '</urlset>' . "\n";
?>
