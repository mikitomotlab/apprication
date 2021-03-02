<!doctype html>
<html lang="ja">

<head>
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
</head>


<body>
<header>
<h1 class="font-weight-normal">お店一覧</h1>
</header>


<main>

<?php
$kw = $_POST['sword'];
$sadd = $_POST['saddress'];
require('dbconnect.php');
// while($sadd == ''){
//     $sadd = $_POST['saddress'];
//     usleep(100000);
// }


// $memories = $db->query('SELECT * FROM data ORDER BY id DESC'))
// $kresults = $db->query('SELECT pictured FROM data WHERE keyword LIKE CONCAT('%', {$kw}, '%')');
// $stmt = $db->prepare('SELECT * FROM data WHERE keyword LIKE CONCAT(%, ? ,%)');
$stmt = $db->prepare('SELECT * FROM data WHERE keyword LIKE ? AND address LIKE ?');
$stmt->bindValue(1, '%'.$kw.'%', PDO::PARAM_STR);
$stmt->bindValue(2, '%'.$sadd.'%', PDO::PARAM_STR);
$stmt->execute();
?>

<article>

<?php while ( $kresult = $stmt->fetch()): ?>
<p><a href="memo.php?id=<?php print($kresult['id']); ?>"> <?php print(mb_substr($kresult['imgname'], 0, 50)); ?></a></p>
<img src="image/<?php echo $kresult['imgname'];?>" width="400" height="300" alt="image">
<time><?php print($kresult['pictured']); ?></time>
<hr>
<?php endwhile; ?>

</article>
</main>



</body>
</html>