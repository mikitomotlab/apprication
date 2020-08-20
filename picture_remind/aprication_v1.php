<?php require('C:\xampp\htdocs\dbconnect.php'): ?>

<?php
	print("ようこそ！このホームページへ！");
?>

<?php

//$con = mysql_connect('localhost', 'miki', '19960807Sm', 'picture_data');

print 'mysql 関数で接続に成功しました。'

$params = json_decode(file_get_contents('php://input'), true);
$latitude = $params["latitude"];
$logitude = $params["logitude"];
$time = $params["time"];

$statement = $db->prepare('INSERT INTO data SET latitude=> $latitude , longitude=> $logitude , time=> $time  ');
$statement->execute();
echo 'メッセージが登録されました';


//mysql_close($con);
?>
