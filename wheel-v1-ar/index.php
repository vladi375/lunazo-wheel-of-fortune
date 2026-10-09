<?php
$target = __DIR__ . '/../dist/wheel-v1-ar/index.php';
if (is_file($target)) {
    include $target;
} else {
    http_response_code(404);
    echo 'Landing build not found';
}
