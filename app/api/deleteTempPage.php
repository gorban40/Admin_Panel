<?php
$file = "../../2ifjdfua8u28y372h87ih2ui3h.html";

if (file_exists($file)) {
    unlink($file);
} else {
    header("HTTP/1.0 400 Bad Request");
}