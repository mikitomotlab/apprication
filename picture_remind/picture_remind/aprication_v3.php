<?php require('dbconnect.php'); 

$pos = $_POST['pos'];
print 'aaa';
print $pos;
$position = explode(",", $pos);
$latitude = $position[0];
$logitude = $position[1];
$keyword = $position[2];
$time = $position[3];

$statesql = 'INSERT INTO data (latitude, logitude, pictured, keyword) VALUES (:latitude, :logitude, :time, :keyword)';
$state = $db->prepare($statesql);
$params = array(':latitude' => $latitude, ':logitude' => $logitude, ':keyword' => $keyword, ':time' => $time);
$state ->execute($params);
echo 'メッセージが登録されました';
?>
