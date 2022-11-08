var datajson;

function loadDoc() {
    console.log("Loaded")

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        datajson = JSON.parse(this.responseText);
        console.log(datajson);

        let datalength = datajson.length;
        console.log(datalength);
        let table = document.getElementById("table");
        const ap = "Approve";
        const ua = "Unapprove";

        let setstatus;
        let setstyle;

        for (let i = datalength-1; i >= 0; i--) {
            if (datajson[i].statusacc == "waitting") {
                let addtable = document.createElement('addtable');
                addtable.id = `add${i}`;
                addtable.innerHTML = `<table class="tablelist"  style="margin-top: 20px;">\n` +
                    `            <tr><th>จาก : ${datajson[i].studentId}</th>\n` +
                    `            <th>วันที่ยื่นคำร้อง</th>\n` +
                    `            <th>ค่าปรับที่ต้องจ่าย</th>\n` +
                    `            <th><button class="butacc" id="ap" onclick="addStatusAp(${i})" >อนุมัติ</button></th></tr>\n` +
                    `            <tr><th><a href="./info?studentId=${datajson[i].studentId}?id=${i}">ดูรายละเอียด</a></li></th>\n` +
                    `            <th> ${datajson[i].date} </th>\n` +
                    `            <th style="color: red;">${datajson[i].money}.- บาท</th>\n` +
                    `            <th><button class="butnon" id = "ua" onclick="addStatusUa(${i})">ไม่อนุมัติ</button></th></tr>\n`
                table.appendChild(addtable);
            }
            else {
                if (datajson[i].statusacc == "agree") {
                    setstatus = '[ อนุมัติ ]';
                    setstyle = 'color: green;';
                }
                else if (datajson[i].statusacc == "disagree") {
                    setstatus = '[ ไม่อนุมัติ ]';
                    setstyle = 'color: red;';
                }
                let addtable = document.createElement('addtable');
                addtable.id = `add${i}`;
                addtable.innerHTML = `<table class="tablelist"  style="margin-top: 20px;">\n` +
                    `            <tr><th>จาก : ${datajson[i].studentId}</th>\n` +
                    `            <th>วันที่ยื่นคำร้อง</th>\n` +
                    `            <th>ค่าปรับที่ต้องจ่าย</th>\n` +
                    `            <th></th></tr>\n` +
                    `            <tr><th><a href="./info?studentId=${datajson[i].studentId}?id=${i}">ดูรายละเอียด</a></li></th>\n` +
                    `            <th> ${datajson[i].date} </th>\n` +
                    `            <th style="color: red;">${datajson[i].money}.- บาท</th>\n` +
                    `            <th><span style="${setstyle} font-size: 30px;">${setstatus}</span></th></tr>\n`
                table.appendChild(addtable);
            }

        }
        //set number of data
        let num = document.getElementById("num");
        let setnum = document.createElement('addnum');
        setnum.innerHTML = `จำนวณคำร้อง : ${datalength}\n`
        num.appendChild(setnum);
    }
    xhr.open("GET", "/getJson");
    xhr.send();
}

function addStatusAp(id) {
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const studentlist = JSON.parse(json);
        let datalength = datajson.length;
 
        studentlist[id].statusacc = "agree";
        
        var myJSON = JSON.stringify(studentlist);
        saveFile(myJSON)
        console.log(myJSON)
        window.location.reload();
    }

    xmhttp.open("GET", "/getJson");
    xmhttp.send();
}

function addStatusUa(id) {
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const studentlist = JSON.parse(json);
        let datalength = datajson.length;

        studentlist[id].statusacc = "disagree";

        var myJSON = JSON.stringify(studentlist);
        saveFile(myJSON)
        console.log(myJSON)
        window.location.reload();
    }
    xmhttp.open("GET", "/getJson");
    xmhttp.send();

}

function saveFile(myjson) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let msg = this.responseText;
        alert(msg)
    };
    xhttp.open("POST", "/updating");
    xhttp.send(myjson);
}
