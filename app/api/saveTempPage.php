<?php
$_POST = json_decode( file_get_contents("php://input"), true );
$newFile = "../../2ifjdfua8u28y372h87ih2ui3h.html";

if ($_POST["html"]) {
    file_put_contents($newFile, $_POST["html"]);
} else {
    header("HTTP/1.0 400 Bad Request");
}