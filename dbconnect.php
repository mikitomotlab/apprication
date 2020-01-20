<?php
try{
  $db = new PDO('mysql:dbname=picture_data;host=127.0.0.1:charset=utf8' , 'root' , '');
}catch (PDOException $e) {
  echo 'DB接続エラー: '. $e->getMessage();
}
?>
