<!doctype html>
<html lang="ja">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="style.css">
<title>all data</title>
</head>


<body>
<header>
<h1 class="font-weight-normal">お店一覧</h1>
</header>

<p>keywordを入力してください!</p>
<form>
  <input type="text" id="select" name="select" size="20"  />
  <input type="submit" id="btn" name="submit" value="送信" onclick="select();"/>
</form>
<div id="maps"></div>

<main>

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

</article>
</main>


<script>
  function select(){
    var select = getElementById("select");
    console.log(select);
    <?php
      $doc = new DomDocument;
      $kw = $doc->getElementById('select');
      print($kw->nodeValue);
      $kresult = $db->query('SELECT pictured FROM data WHERE keyword LIKE CONCAT('%', {kw}, '%')');
      print $kresult;
      ?>
  }
</script>

</body>
</html>