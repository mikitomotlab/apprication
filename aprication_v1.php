<?php require('C:\xampp\htdocs\dbconnect.php'): ?>

<?php
$params = json_decode(file_get_contents('php://input'), true);
$latitude = $params["latitude"];
$logitude = $params["logitude"];
$time = $params["time"];

$statement = $db->prepare('INSERT INTO data SET latitude=> $latitude , longitude=> $logitude , time=> $time  ');
$statement->execute();
echo 'メッセージが登録されました';
?>
