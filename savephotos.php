<?php 
header('Content-Type: application/json');
define('UPLOAD_DIR', 'images/');
 // previously it was $img = $_POST['data']
 $img = $_POST['data'];
 $img = str_replace('data:image/jpeg;base64,', '', $img);
 $img = str_replace(' ', '+', $img);
 $fileUrl = base64_decode($img);
 $file = UPLOAD_DIR . uniqid(rand()) .'.jpeg';
 $success = file_put_contents($file, $fileUrl);
 echo json_encode($file);
 //send request to ocr
 // print $success ? $file : 'Unable to save the file.';
?>