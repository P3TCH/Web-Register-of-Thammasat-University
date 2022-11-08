var datajson;



function loadStatus(){
    console.log("Loaded")

    const xhr = new XMLHttpRequest();
    xhr.onload = function(){

        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        
        let user = getParameterByName('username');
        console.log(user);
        datajson = JSON.parse(this.responseText);
        console.log(datajson);
        
        let datalength = datajson.length;
        console.log(datalength);

        let userlength = 0;

        let table = document.getElementById("table");

        //statusacc

        let setstatus;
        let setstyle;

        for(let i = datalength-1 ; i >= 0  ; i--){
            if(datajson[i].user == user){
                if(datajson[i].statusacc == "waitting"){
                    setstatus = 'กำลังตรวจสอบ !';
                    setstyle = 'color: gray;';
                }
                else if(datajson[i].statusacc == "agree"){
                    setstatus = 'อนุมัติ ✓';
                    setstyle = 'color: green;';
                }
                else if(datajson[i].statusacc == "disagree"){
                    setstatus = 'ไม่อนุมัติ';
                    setstyle = 'color: red;';
                }
                let addtable = document.createElement('addtable');
                    addtable.id = `add${i}`;
                    addtable.innerHTML = `<table class="tablelist"  style="margin-top: 20px;">\n` +
                    `            <tr><th>คำร้องที่ : ${i+1}</th>\n` +
                    `            <th>คำร้องถูกส่งแล้ว</th>\n` +
                    `            <th>ค่าปรับที่ต้องจ่าย</th>\n` +
                    `            <tr><th><a href="./studentinfo?username=${user}&?id=${i}")">ดูรายละเอียด</a></li></th>\n` +
                    `            <th>สถานะ : <span style="${setstyle}">${setstatus}</span></th>\n` +
                    `            <th style="color: red;">${datajson[i].money}.- บาท</th>\n`
                    table.appendChild(addtable);
                    userlength++;
            }
        }
        
        //set number of data
        let num = document.getElementById("num");
        let setnum = document.createElement('addnum');
        setnum.innerHTML = `จำนวณคำร้อง : ${userlength}\n`
        num.appendChild(setnum);

    }
    xhr.open("GET" , "/getJson");
    xhr.send();
}