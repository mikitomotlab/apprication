<!doctype html>
<html lang="ja">
<head>
<!-- Required meta tags -->
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

<main>
<?php
// try {
//     $db = new PDO('mysql:dbname=mydb;host=127.0.0.1;charset=utf8', 'root', '');
// } catch (PDOException $e) {
//     echo 'DB接続エラー： ' . $e->getMessage();
// }
require('dbconnect.php'); 

$memories = $db->query('SELECT * FROM data ORDER BY id DESC');
?>
<article>
<?php while ( $memory = $memories->fetch()): ?>
<p><a href="memo.php?id=<?php print($memory['id']); ?>"> <?php print(mb_substr($memory['imgname'], 0, 50)); ?></a></p>
<img src="image/<?php echo $memory['imgname'];?>" width="400" height="300" alt="image">
<time><?php print($memory['pictured']); ?></time>
<hr>
<?php endwhile; ?>

</article>
</main>
</body>
</html>
