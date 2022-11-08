function onload(){
    loadDoc();
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

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let user = getParameterByName('username');


function loadDoc() {
    const xhttp = new XMLHttpRequest();
    let targetUrl = "https://restapi.tu.ac.th/api/v2/profile/std/info/?id=" + user;
    xhttp.open("GET", targetUrl);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Application-Key", "key");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        const myObj = JSON.parse(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("User").innerHTML =   'เลขทะเบียนนักศึกษา: ' +myObj.data.userName  + '<br>' +  myObj.data.displayname_th + '(' + myObj.data.displayname_en + ')' ;
            document.getElementById("bar").innerHTML =
            `<li class="menu__group"><a href  = ./main?username=${myObj.data.userName} class="menu__link r-link text-underlined">หน้าหลัก</a></li>\n`+
            `<li class="menu__group"><a href  = ./newpetition?username=${myObj.data.userName} class="menu__link r-link text-underlined">สร้างคำขอใหม่</a></li>\n`+
            `<li class="menu__group"><a href  = ./statusstu?username=${myObj.data.userName} class="menu__link r-link text-underlined">สถานะคำร้อง</a></li>\n`+
            `<li class="menu__group"><a href  = ./contactteach?username=${myObj.data.userName} class="menu__link r-link text-underlined">ขัอมูลอาจารย์</a></li>\n` +
            `<li class="menu__group"><a href  = ./manual?username=${myObj.data.userName} class="menu__link r-link text-underlined">ตัวอย่างการกรอกคำร้อง</a></li>`;

            document.getElementById("stat").innerHTML = `<a href="./statusstu?username=${myObj.data.userName}" ><button onclick="">สถานะคำร้อง</button></a>\n`;
            document.getElementById("new").innerHTML = `<a href="./newpetition?username=${myObj.data.userName}" ><button onclick="">สร้างคำร้องใหม่</button></a>\n`;
        }
        if (this.readyState != 4 && this.status != 200) {
            alert("Error");
        }

    }
}
