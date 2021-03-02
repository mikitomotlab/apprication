<!doctype html>
<html lang="ja">
<head>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<!-- <script src="http://maps.google.com/maps/api/js&sensor=false" type="text/javascript"></script> -->
<!-- <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCpDX4w3G3zatKKXzl-pqeppNgl7TCfOQ0" async></script> -->
<!-- <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCs_DClOnoW5XWPya5HLPTh1yHexpAab64" async></script> -->
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<style>
    #maps{
        height: 400px;
    }
</style>

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="style.css">

<title>all data</title>
<!-- <script src="select.js" defer></script> -->
</head>


<body>
<header>
<h1 class="font-weight-normal">お店一覧</h1>
</header>
<p>keywordを入力してください!</p>
<form name='form1' method="post" action="select.php">
  <input type="text" id="select" name="sword" size="20"  />
  <input type="submit" id="btn" name="submit" value="送信"/>
</form>
<div id="maps"></div>

<main>

<!-- <div id="maps"></div> -->

<?php
require('dbconnect.php'); 
$memories = $db->query('SELECT * FROM data ORDER BY id DESC');
?>

<article>
<?php while ( $memory = $memories->fetch()): ?>
<p><a href="memo.php?id=<?php print($memory['id']); ?>"> <?php print(mb_substr($memory['imgname'], 0, 50)); ?></a></p>
<img src="image/<?php echo $memory['imgname'];?>" width="400" height="300" alt="image">
<time><?php print($memory['pictured']); ?></time>
<hr>

<?php
require('dbconnect.php'); 
// 移動前のページから'id'を受け取る
$id = $memory['id'];
$lat = $memory['latitude'];
$log = $memory['logitude'];
$latitude = array('$id' => '$lat');
$logitude = array('$id' => '$log');
// $memories = $db->prepare('SELECT * FROM data WHERE id=?');
// memosで宣言したコマンドに$idを与えて実行する
// $memories->execute(array($id));
// $memosで実行して受け取る値を$memoへ格納する
// $memory = $memories->fetch();
?>
<?php endwhile; ?>

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
      console.log("check1")

      //解説2：変数 markerOptions
      var markerOptions = {
        map: map,
        position: mapPosition,
      };

      //解説1：マーカーを生成するMarkerクラス
      var marker = new google.maps.Marker(markerOptions);
    }
  </script>
<!-- <div id="maps"></div> -->
</article>
</main>


</body>
</html>
