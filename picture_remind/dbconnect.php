<?php
try{
  $db = new PDO('mysql:host=localhost;dbname=picture_data;charset=utf8' , 'miki' , '19960807Sm');
}catch (PDOException $e) {
  echo 'DB接続エラー: '. $e->getMessage();
}
?>
