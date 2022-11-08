function setmoney(){
    let datemoney = document.getElementById('datez').value;
    let data = {"datemoney" : datemoney};

    if (datemoney == ''){
        alert('กรุณาเลือกวันที่');
    }else{
        var dateJson = JSON.stringify(data) ;
        saveFile(dateJson);
        console.log(dateJson) ;
        window.location.reload();
    }

    var date1 = new Date("2021-11-26");
    var date2 = new Date(datemoney);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
}



function saveFile(dateJson) {
    const xhttp = new XMLHttpRequest() ;
    xhttp.onload = function() {
      let msg = this.responseText;
      alert(msg)
    } ;
    xhttp.open("POST", "/upMoneyDate") ;
    xhttp.send(dateJson) ;
  }