// IFrame Player API の読み込み
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
   // 動画再生
 event.target.playVideo();
}

// プレーヤーの状態が変更されたとき
function onPlayerStateChange(event) {
   // 現在のプレーヤーの状態を取得
   var ytStatus = event.data;
  // 再生終了したとき
 if (ytStatus == YT.PlayerState.ENDED) {
     console.log('再生終了');
      // 動画再生
     event.target.playVideo();
   }
   // 再生中のとき
   if (ytStatus == YT.PlayerState.PLAYING) {
       console.log('再生中');
   }
   // 停止中のとき
   if (ytStatus == YT.PlayerState.PAUSED) {
        console.log('停止中');
   }
   // バッファリング中のとき
  if (ytStatus == YT.PlayerState.BUFFERING) {
     console.log('バッファリング中');
  }
   // 頭出し済みのとき
 if (ytStatus == YT.PlayerState.CUED) {
      console.log('頭出し済み');
 }
}

// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
  var sheet=SpreadsheetApp.getActiveSheet();
  var musicNames=sheet.getRange("B2:B10").getValues();
  var firstValue={};
  for (var i=0;i<count;i++)
    ytPlayer = new YT.Player(
       'sample', // 埋め込む場所の指定
        {
           width: 640, // プレーヤーの幅
          height: 390, // プレーヤーの高さ
            videoId: musicNames[i], // YouTubeのID
         // イベントの設定
          events: {
                'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
                'onStateChange': onPlayerStateChange // プレーヤーの状態が変更されたときに実行
           }
       }
   );
}

var playerReady = false;
// プレーヤーの準備ができたとき
function onPlayerReady(event) {
  playerReady = true;
}


function myFirstNameLastNameFunction() {
  var sheet=SpreadsheetApp.getActiveSheet();
  var firstName=sheet.getRange("A2:A10").getValues();
  var lastName=sheet.getRange("B2:B10").getValues();
  var firstValue={};
  var lastValue={};
  var count=firstName.length;
  var name="";
  for(var i=0;i<count;i++)
  {
    firstValue[i]=firstName[i];
    lastValue[i]=lastName[i];
    name=firstValue[i]+lastValue[i];
    sheet.getRange(i+2,3).setValue(name);
  }
}
