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
$price = $position[4];
$description = $position[5];
$address = $position[6];
$keyword = $position[7]; //空白で区切る

$statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword, imgname, price, description, address) VALUES (:latitude, :logitude, :time, :keyword, :imgname, :price, :description, :address)';
$state = $db->prepare($statesql);
$params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => $keyword, ':time' => $time, ':imgname' => $imgname, ':price' => $price, ':description' => $description, ':address' => $address);
$state ->execute($params);
echo 'メッセージが登録されました';
?>
