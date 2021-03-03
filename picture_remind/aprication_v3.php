<?php require('dbconnect.php'); 

$pos = $_POST['pos'];
print 'aaa';
print $pos;
$position = explode(",", $pos);
print(count($position));
$latitude = $position[0];
$logitude = $position[1];
$imgname = $position[2];
$time = $position[3];
$homepage = $position[4];
$price = $position[5];
$description = $position[6];
$address = $position[7];
$keyword = $position[8]; //空白で区切る

$statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword, imgname, price, description, address, homepage) VALUES (:latitude, :logitude, :time, :keyword, :imgname, :price, :description, :address, :homepage)';
$state = $db->prepare($statesql);
$params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => $keyword, ':time' => $time, ':imgname' => $imgname, ':price' => $price, ':description' => $description, ':address' => $address, ':homepage' => $homepage);
$state ->execute($params);
echo 'メッセージが登録されました';
?>
