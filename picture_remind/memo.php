<!doctype html>
<html lang="ja">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<style>
    #maps{
        height: 400px;
    }
</style>
<!-- Bootstrap CSS -->
<!-- <link rel="stylesheet" href="css/style.css"> -->

<!-- <title>よくわかるPHPの教科書</title>
</head>
<body>
<header>
<h1 class="font-weight-normal"><?php print($memory['imgname']); ?></h1>    
</header>

<main>
<h2>Practice</h2> -->
<!-- <pre> -->
<?php
require('dbconnect.php'); 
// 移動前のページから'id'を受け取る
$id = $_REQUEST['id'];
$memories = $db->prepare('SELECT * FROM data WHERE id=?');
// $memos->execute(array($_REQUEST['id']));
// memosで宣言したコマンドに$idを与えて実行する
$memories->execute(array($id));
// $memosで実行して受け取る値を$memoへ格納する
$memory = $memories->fetch();
?>

<script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCs_DClOnoW5XWPya5HLPTh1yHexpAab64&callback=initMap" async></script>
  <script>
    function initMap() {
      var latitude = <?php echo $memory['latitude']; ?>;
      var logitude = <?php echo $memory['logitude']; ?>;
      console.log(latitude)
      var mapPosition = {lat: latitude, lng: logitude};
      var mapArea = document.getElementById('maps');
      var mapOptions = {
        center: mapPosition,
        zoom: 16,
      };
      var map = new google.maps.Map(mapArea, mapOptions);

      //解説2：変数 markerOptions
      var markerOptions = {
        map: map,
        position: mapPosition,
      };

      //解説1：マーカーを生成するMarkerクラス
      var marker = new google.maps.Marker(markerOptions);
    }
  </script>

<?php ?>

<header>
<h1 class="font-weight-normal"><?php 
$imgname = $memory['imgname'];
$stringc = strlen($imgname);
// print($stringc);
$stringcn = $stringc - 4;
// print($stringcn);
$store = substr_replace($imgname, "", $stringcn,4);
print($store); 
?></h1>    
</header>

<main>
<h2>Price : <?php print($memory['price']); ?> 円（一人当たり）</h2>
<pre>
<h2> 説明 :<br> <?php print($memory['description']); ?></h2>
<article>
<img src="image/<?php echo $memory['imgname'];?>" width="400" height="300" alt="image">
<?php print($memory['imgname']); ?>
<div id="maps"></div>
<a href="update.php?id=<?php print($memory['id']); ?>"> 編集する </a>
|
<a href="delete.php?id=<?php print($memory['id']); ?>"> 削除する </a>
|
<a href="index.php">戻る</a>
</article>
</pre>
</main>
</body>    
</html>