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

var playerReady = false;
// プレーヤーの準備ができたとき
function onPlayerReady(event) {
  playerReady = true;
}


// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
  let XLSX     = require('xlsx');
  let workbook = XLSX.readFile('youtube_playlist.xlsx');

  let sheet_name_list = workbook.SheetNames;
  let Sheet1          = workbook.Sheets[sheet_name_list[0]];  // シート1をデータを取得します
  //let Sheet1_json     = XLSX.utils.sheet_to_json( Sheet1 );   // シート1のデータをJSONパースします

  // (例)シート1のセルA1の値をコンソールに出力します
  let Sheet1B1        = Sheet1['B1'].v;
  console.log( `シート1のセルB1の値：\n${Sheet1B1}` );
  // エクセルデータの末端の行数を取得する
  let endCol = Sheet1['!ref'].match(/\:[A-Z+]([0-9]+)/)[1];
  // 取得したいセルの範囲を指定し直す。下記の例ではA6からK列の末端行まで
  Sheet1['!ref'] = `B1:B${endCol}`;
  // JSONオブジェクトとして取得
  let Sheet2_json = XLSX.utils.sheet_to_json( Sheet1 );

  for( let cl of Sheet1_json){
    ytPlayer = new YT.Player(
       'sample', // 埋め込む場所の指定
        {
           width: 640, // プレーヤーの幅
          height: 390, // プレーヤーの高さ
          videoId: cl, // YouTubeのID
         // イベントの設定
          events: {
                'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
                'onStateChange': onPlayerStateChange // プレーヤーの状態が変更されたときに実行
           }
          //if(player.getPlayerState()==0){
            //break;
      //  };
    }
   );
}
}
