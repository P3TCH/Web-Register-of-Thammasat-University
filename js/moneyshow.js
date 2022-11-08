function onload(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    console.log(today);

    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const jlist = JSON.parse(json);
    
        let moneydate = jlist.datemoney;

        var dateArray = moneydate.split("-", 3);
        console.log(dateArray);

        var date1 = new Date(moneydate);
        var date2 = new Date(today);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days);

        let deaddate = document.getElementById('date');
        let addtable = document.createElement('addtable');
                addtable.innerHTML = `<h4>*** วันเลยกำหนด ${dateArray[2]} / ${dateArray[1]} / ${dateArray[0]} ***</h2>` +
                `<h4>เลยกำหนดมาแล้ว <span style="color : red;">${Difference_In_Days}</span> วัน</h2>`
                deaddate.appendChild(addtable);
    }
    xmhttp.open("GET", "/getMoney");
    xmhttp.send();
    
}