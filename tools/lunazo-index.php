<?php
// Fallback when the root front controller forwards /lunazo/* here.
$path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
if (!is_string($path) || strpos($path, '/lunazo/') !== 0) {
    http_response_code(404);
    exit('page not found');
}

$relative = rawurldecode(substr($path, strlen('/lunazo/')));
if (preg_match('#^(wheel-v[12]-(?:ar|co))/?$#', $relative, $match)) {
    require __DIR__ . '/' . $match[1] . '/index.php';
    return;
}

// Existing static files are normally served by the web server. This branch
// also handles them if the server forwards every request to the root PHP file.
if (strpos($relative, 'dist/') === 0) {
    $file = realpath(__DIR__ . '/' . $relative);
    $distRoot = realpath(__DIR__ . '/dist');
    $types = [
        'css' => 'text/css',
        'js' => 'text/javascript',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'png' => 'image/png',
        'ico' => 'image/x-icon',
        'woff2' => 'font/woff2',
        'otf' => 'font/otf',
    ];
    $extension = $file ? strtolower(pathinfo($file, PATHINFO_EXTENSION)) : '';
    if ($file && $distRoot && strpos($file, $distRoot . DIRECTORY_SEPARATOR) === 0
        && is_file($file) && isset($types[$extension])) {
        header('Content-Type: ' . $types[$extension]);
        header('Content-Length: ' . filesize($file));
        readfile($file);
        return;
    }
}

http_response_code(404);
echo 'page not found';
