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
    let targetUrl = "https://restapi.tu.ac.th/api/v2/profile/Instructors/info/?Email=" + user;
    xhttp.open("GET", targetUrl);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Application-Key", "key");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        const myObj = JSON.parse(this.responseText);
        console.log(myObj);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("User").innerHTML =   'Email: ' + myObj.data[0].Email  + '<br>' +  myObj.data[0].First_Name_Th + ' ' + myObj.data[0].Last_Name_Th +'(' + myObj.data[0].First_Name_En +' ' + myObj.data[0].Last_Name_En+ ')' ;
            document.getElementById("bar").innerHTML =
            `<li class="menu__group"><a href  = ./main?username=${myObj.data.userName} class="menu__link r-link text-underlined">หน้าหลัก</a></li>\n`+
            `<li class="menu__group"><a href  = ./newpetition?username=${myObj.data.userName} class="menu__link r-link text-underlined">สร้างคำขอใหม่</a></li>\n`+
            `<li class="menu__group"><a href  = ./statusstu?username=${myObj.data.userName} class="menu__link r-link text-underlined">สถานะคำร้อง</a></li>\n`+
            `<li class="menu__group"><a href  = ./contactteach?username=${myObj.data.userName} class="menu__link r-link text-underlined">ขัอมูลอาจารย์</a></li>\n`;

        }
        if (this.readyState != 4 && this.status != 200) {
            alert("Error");
        }
    }
}
