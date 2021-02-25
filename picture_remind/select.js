  window.onload=function(){
    window.alert("ようこそ！");
    var forma = document.forms['form1'].elements['sword'];
    console.log(forma.textContent);
    // document.getElementById("btn").onclick = function(){
    select1 = document.getElementById("select").value;
    console.log(select1);

    let select = document.getElementById("select").value;
    console.log(select);
    if(select != ""){
      window.alert("ボタンをクリックしました！")
      console.log(select);
    }
  }
  // document.getElementById("btn").onclick = function(){
  // var select = getElementById("select");
  //   window.alert("ボタンをクリックしました！")
  //   console.log(select);
  // }
