var ExifMaster;

var filename;

// キャンバス
var src_canvas, dst_canvas;
var src_ctx, dst_ctx;

// イメージ
var image;

window.onload = function(){

  src_canvas = document.getElementById("SrcCanvas");
  src_ctx = src_canvas.getContext("2d");

  dst_canvas = document.getElementById("DstCanvas");
  dst_ctx = dst_canvas.getContext("2d");

  image = document.getElementById("img_source");

  src_canvas.width  = image.width;
  src_canvas.height = image.height;
  src_ctx.drawImage(image,0,0);

  document.getElementById("btn_start").style.backgroundColor ="#ccc";
  document.getElementById("btn_start").disabled = true;
  document.getElementById("btn").onclick = function(){
    window.alert('ボタンがクリックされました！');
  };
}

function onDragOver(event){
  event.preventDefault();
}

function onDrop(event){
  onAddFile(event);
  event.preventDefault();
}

function run() {

  if(!ExifMaster) return false;

  try{
    ExifMaster.SaveToFile(filename, !document.form1.chk_orientation.checked);
  }catch(e){
    alert(e);
  }

  return false;
}

function latipos(lati){

  lati = lati.replace('北緯','');
  lati = lati.replace('度',' ');
  lati = lati.replace('分',' ');
  lati = lati.replace('秒',' ');
  var latia = lati.split(' ');
  console.log(latia);
  console.log(latia[1]);
  latia[1] = latia[1] / 60;
  latia[2] = latia[2] /3600;
  latic = Number(latia[0]);
  latid = Number(latia[1]);
  latib = Number(latia[2]);
  var latitude = latic + latid + latib;
  console.log(latic);
  console.log(latid);
  console.log(latib);
  console.log(latitude);
  return latitude;
}


function logipos(logi){
  logi = logi.replace('東経','');
  logi = logi.replace('度',' ');
  logi = logi.replace('分',' ');
  logi = logi.replace('秒',' ');
  var logia = logi.split(' ');
  console.log(logia);
  console.log(logia[1]);
  logia[1] = logia[1] / 60;
  logia[2] = logia[2] /3600;
  logic = Number(logia[0]);
  logid = Number(logia[1]);
  logib = Number(logia[2]);
  var logitude = logic + logid + logib;
  console.log(logic);
  console.log(logid);
  console.log(logib);
  console.log(logitude);
  return logitude;
}

function geom(lati, logi){
    var currentLocation = new google.maps.LatLng(lati, logi);
    var geocoder = new google.maps.Geocoder();
    var results = geocoder.geocode({'latLng': currentLocation}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i in results) {
          document.getElementById("address").innerHTML += (results[i].formatted_address + "<br>");
        }
        console.log(results[0].formatted_address);
        document.getElementById("address2").innerHTML += (results[0].formatted_address);
        return results[0].formatted_address;
      }
      else {
        window.alert("google.maps.GeocoderStatus is not OK. due to " + status);
      }
    });
    console.log(results);
    return results;
}


function onAddFile(event) {
  var files;
  var reader = new FileReader();

  if(event.target.files){
    files = event.target.files;
  }else{
    files = event.dataTransfer.files;
  }

  // ***********************
  //  ArrayBuffer
  //  ※ファイルの読み込み
  // ***********************
  reader.onload = function (event) {

    try{

      ExifMaster = new TExifMaster(new Uint8Array(reader.result));

      // プロパティ確認用
      console.log(ExifMaster.Analyst);

      var html = "<p>"+ filename +" ("   + ExifMaster.Analyst.Width +
                 "x" + ExifMaster.Analyst.Height +")</p>";

      if(ExifMaster.Analyst.IFD.main.length == 0){
        html += '<p style="color:red;font-weight:bold;">このファイルには「Exif情報」はありません。</p>';

        document.getElementById("btn_start").style.backgroundColor  ="#ccc";
        document.getElementById("btn_start").disabled = true;
      }else{

        // -----------------
        //  メイン
        // -----------------
        html += "<h3>メイン</h3>";
        html += "<p></p>";
        html += "<table>";
        for(var i=0;i<ExifMaster.Analyst.IFD.main.length;i++){
          html += "<tr>";
            html += "<th>" + ExifMaster.Analyst.IFD.main[i].key  + "</th>";
            html += "<td>" + ExifMaster.Analyst.IFD.main[i].data + "</td>";
          html += "</tr>";
        }
        html += "</table>";
        html += "<p></p>";

        // -----------------
        //  GPS
        // -----------------
        html += "<h3>GPS</h3>";
        if(ExifMaster.Analyst.IFD.gps.length != 0){

          if(ExifMaster.Analyst.DMS){
           // Googleマップ用のURLの生成
           var dms = ExifMaster.Analyst.DMS.replace('"','%22');
           console.log(dms);
           dms = dms.replace('"','%22');
           dms = dms.replace('°','%C2%B0');
           dms = dms.replace('°','%C2%B0');
           console.log(dms);
           html +='<p><a href="https://www.google.co.jp/maps/place/' + dms  + '">Googleマップでこの座標の位置を確認する。</a></p>';
          }else{
            html += "<p></p>";
          }

          html += "<table>";
          for(var i=0;i<ExifMaster.Analyst.IFD.gps.length;i++){
            html += "<tr>";
              html += "<th>" + ExifMaster.Analyst.IFD.gps[i].key  + "</th>";
              html += "<td>" + ExifMaster.Analyst.IFD.gps[i].data + "</td>";
            html += "</tr>";
          }
          html += "</table>";
          html += "<p>※UTC(協定世界時)に+9時間すると日本標準時となります。</p>";
        }else{
          html += "<p>GPS情報はありません。</p>";
        }
        console.log("check");

        // -----------------
        //  カメラ
        // -----------------
        html += "<h3>カメラ</h3>";
        if(ExifMaster.Analyst.IFD.camera.length != 0){
          html += "<p></p>";
          html += "<table>";
          for(var i=0;i<ExifMaster.Analyst.IFD.camera.length;i++){
            html += "<tr>";
              html += "<th>" + ExifMaster.Analyst.IFD.camera[i].key  + "</th>";
              html += "<td>" + ExifMaster.Analyst.IFD.camera[i].data + "</td>";
            html += "</tr>";
          }
          html += "</table>";
        }else{
          html += "<p>カメラ情報はありません。</p>";
        }

        document.getElementById("btn_start").style.backgroundColor  = "#ff6347";
        document.getElementById("btn_start").disabled = false;
      }
    }catch(e){
      alert(e);
      document.getElementById("btn_start").style.backgroundColor ="#ccc";
      document.getElementById("btn_start").disabled = true;
      document.getElementById("result").innerHTML = "";

      image.onload =function(e){
        src_canvas.width  = image.width;
        src_canvas.height = image.height;
        src_ctx.drawImage(image,0,0);
      }
      image.src = "dropbox.png";
      return;
    }

    // ***********************
    //  Base64
    //  ※リサイズ/回転/反転
    // ***********************
    var base64 = new FileReader();
    base64.onload = function (event) {
      image.onload = function (){

        // 回転/反転なし
        var Orientation = ExifMaster.Analyst.Orientation;
        if (!Orientation){
          Orientation = 1;
        }

        // -----------------
        //  リサイズ
        // -----------------
        var size = 280;
        if(image.width > image.height){
          // 幅を基準にアスペクト比を調整する
          var aspect_ratio = image.width / size;
          var another = Math.round(image.height / aspect_ratio);

          src_canvas.width  = size;
          src_canvas.height = another;
        }else{
          // 高さを基準にアスペクト比を調整する
          var aspect_ratio = image.height / size;
          var another = Math.round(image.width / aspect_ratio);

          src_canvas.width  = another;
          src_canvas.height = size;
        }
        src_ctx.drawImage(image,0,0,src_canvas.width,src_canvas.height);

        // -----------------
        //  生データの取得
        // -----------------
        var src, dst;
        switch (Orientation){
          // サイズ変更なし
          case 2:;case 3:;case 4:
            dst_canvas.width  = src_canvas.width;
            dst_canvas.height = src_canvas.height;
            break;

          // サイズ変更あり
          case 5:;case 6:;case 7:;case 8:
            dst_canvas.width  = src_canvas.height;
            dst_canvas.height = src_canvas.width;
        }
        src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
        dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);

        // -----------------
        //  エフェクト
        // -----------------
        switch (Orientation){
          // [状態]左右反転
          case 2: EffectMirror(src, dst);break;
          // [状態]180度回転
          case 3: EffectTrun(src, dst, 3);break;
          // [状態]上下反転
          case 4: EffectFlip(src, dst);break;

          // [状態]右90度回転 + 左右反転
          case 5:
                  // 左90度
                  EffectTrun(src, dst ,1);
                  src_canvas.width  = dst_canvas.width;
                  src_canvas.height = dst_canvas.height;
                  src_ctx.putImageData(dst,0,0);

                  // 左右反転
                  src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
                  dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);
                  EffectMirror(src, dst);
                  break;

          // [状態]左90度回転
          case 6: EffectTrun(src, dst ,2);break;

          // [状態]左90度回転 + 左右反転
          case 7:
                  // 右90度
                  EffectTrun(src, dst ,2);
                  src_canvas.width  = dst_canvas.width;
                  src_canvas.height = dst_canvas.height;
                  src_ctx.putImageData(dst,0,0);

                  // 左右反転
                  src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
                  dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);
                  EffectMirror(src, dst);
                  break;

          // [状態]右90度回転
          case 8: EffectTrun(src, dst ,1);break;
        }

        if(Orientation != 1){
          src_canvas.width  = dst_canvas.width;
          src_canvas.height = dst_canvas.height;
          src_ctx.putImageData(dst,0,0);
        }
      }
      image.src = base64.result;
    }

    console.log('send data');
    // alert("send data");
    base64.readAsDataURL(new Blob([reader.result],{type:"image/jpeg"}));
    document.getElementById("result").innerHTML = html;

    console.log('send data');
    // alert("send data");

        //結果を送信する
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          result.textContent = xhr.responseText;
        } else {
          result.textContent = 'サーバーエラーが発生しました。';
        }
      } else {
        result.textContent = '通信中...';
      }
    };
    var lati = ExifMaster.Analyst.IFD.gps[0].data; 
    var logi = ExifMaster.Analyst.IFD.gps[1].data;
    console.log(lati);
    console.log(logi);
    // var latia = lati.split()
    // var logia = lati.split()

    var latitude = latipos(lati);
    var logitude = logipos(logi);

    var results = geom(latitude,logitude);
    // var results = document.getElementById("address").textContent;
    console.log(results);

    //latiとlogiをまとめて送信
    console.log(ExifMaster.Analyst.IFD.main[6].data);
    time = ExifMaster.Analyst.IFD.main[6].data;
    console.log(filename);
    //条件によって処理を待機させる 
    var ti = setInterval(function(){
      keyword = document.getElementById("keyword").value;
      homepage = document.getElementById("homepage").value;
      price = document.getElementById("price").value;
      description = document.getElementById("description").value;
      address = document.getElementById("address2");
      address = address.textContent
      console.log(description);
      if(keyword != "" && price != ""){
        if(description != "" && address != ""){
          clearInterval(ti);
          console.log(keyword);
          console.log(price);
          console.log(description);
          console.log(address);
          var pos = latitude + ',' + logitude + ',' + filename + ',' + time + ',' + homepage + ',' + price + ',' + description + ',' + address + ',' + keyword;
          xhr.open('POST', 'http://localhost/picture_remind/aprication_v3.php', true);
          xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          xhr.send('pos=' + encodeURIComponent(pos));
        }
          // clearInterval(ti);
          // console.log(keyword);
          // console.log(price);
          // var pos = lati + ',' + logi + ',' + filename + ',' + time + ',' + price + ',' + keyword;
          // xhr.open('POST', 'http://localhost/picture_remind/aprication_v3.php', true);
          // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          // xhr.send('pos=' + encodeURIComponent(pos));
      }
    }, 500);
  };

  if (files[0]){
    filename = files[0].name;
    reader.readAsArrayBuffer(files[0]);
    document.getElementById("inputfile").value = "";
  }
}