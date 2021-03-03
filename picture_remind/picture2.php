<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>picuture</title>
  <style></style>
  <link  rel="stylesheet" type="text/css" href="style.css">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="http://maps.google.com/maps/api/js&sensor=false" type="text/javascript"></script>
  <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCpDX4w3G3zatKKXzl-pqeppNgl7TCfOQ0" async></script>


  <script src="main8.js" defer></script>
  <!-- <script src="hello_ajax.js" defer></script> -->
  <!-- <script src="try.js" defer></script> -->
  <script src="EXIF.js" ></script>
  <script src="effect.js"></script>
</head>
<!-- <body> -->
<!-- <div align="left"> -->

<!--
<hr width="500">
<a href="index.html">トップ</a>
    <a href="about.html">プロフィール</a>
    <a href="link.html">リンク集</a><br>
<hr width="500"><br><br>



<section>
  <img id="myImageA" />
  <img src="image1.jpg" id="img1" />
<pre>Make and model: <span id="makeAndModel"></span></pre>
<br/>
-->
<h1>写真を登録する</h1>

<p>keywordを入力してください!</p>
<form>
  <input type="text" id="keyword" name="keyword" size="500" />
  <!-- <input type="submit" id="btn" name="submit" value="送信" /> -->
</form>

<p>ホームページURLを入力してください!</p>
<form>
  <input type="text" id="homepage" name="homepage" size="500" />
  <!-- <input type="submit" id="btn" name="submit" value="送信" /> -->
</form>

<p>1人分の費用は？(数字だけ)</p>
<form>
  <input type="text" id="price" name="price" size="20" />
</form>

<p>お店や料理の説明</p>
<!-- <form>
  <input type="text" id="description" name="description" size="500" />
</form> -->
<textarea name="description" id="description" cols="60" rows="8">
</textarea>

<p>画像を選択してください!</p>
<body ondrop="onDrop(event);" ondragover="onDragOver(event);">
<div style="margin-left:5px;">
<!-- <h1>Exifの確認と削除</h1> -->
  <form name="form1">
    <p><input type="file" id="inputfile" onchange="onAddFile(event);" accept="image/jpeg"></p>
    <canvas id="SrcCanvas" onclick='document.getElementById("inputfile").click();'></canvas>
    <canvas id="DstCanvas" style="display:none;"></canvas>
    <img id="img_source" style="display:none;" src="dropbox.png">
    <p><input type="checkbox" id="chk_orientation" checked="checked"><label for="chk_orientation">Exifに画像方向の情報が存在するときは「画像方向」を残す。</label></p>
    <input type="submit" id="btn_start" onclick="return run();" value="削 除" style="background-color:#ccc;" disabled="disabled">
  </form>
  <div id="result"></div>
  <div id="address"></div>
  <div id="address2"></div>
</div>

<!-- <div id="latitude"></div> -->
<!-- <div id="logitude"></div> -->

<!-- <h1>写真を登録する</h1> -->
<!-- <form>
  <input type="text" id="keyword" name="keyword" size="20" />
  <input type="submit" id="btn" name="submit" value="送信" />
</form>
</body> -->
<!-- </section> -->


<hr width="500">
  <br>
  <br>




<!-- </div> -->



<!-- </body> -->
</html>
