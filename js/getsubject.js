

function loadDoc() {
    console.log("Loaded")

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        datajson = JSON.parse(this.responseText);
        console.log(datajson);

        let datalength = datajson.length;
        console.log(datalength);
        let table = document.getElementById("table");

        for (let i = 0; i < datalength; i++) {
            let addsub = datajson[i].addSubjectList.length;
            let dropsub = datajson[i].dropSubjectList.length;
            for (let k = 0; k < addsub; k++) {
                let tr = document.createElement('tr');
                tr.id = `add${i}`;
                tr.innerHTML = `<td>${datajson[i].studentFirstName} - ${datajson[i].studentLastName}</td>\n` +
                    `<td>${datajson[i].addSubjectList[k].subjectCode}</td>\n` +
                    `<td>${datajson[i].addSubjectList[k].subjectSection}</td>\n` +
                    `<td><a href="./accword?studentId=${datajson[i].studentId}&?id=${i}">ดูรายละเอียด</a></td>`
                table.appendChild(tr);
            } for (let j = 0; j < dropsub; j++) {
                let tr = document.createElement('tr');
                tr.id = `add${i}`;
                tr.innerHTML = `<td>${datajson[i].studentFirstName} - ${datajson[i].studentLastName}</td>\n` +
                    `<td>${datajson[i].dropSubjectList[j].subjectCode}</td>\n` +
                    `<td>${datajson[i].dropSubjectList[j].subjectSection}</td>\n` +
                    `<td><a href="./accword?studentId=${datajson[i].studentId}">ดูรายละเอียด</a></td>`
                table.appendChild(tr);
            }

        }
    }
    xhr.open("GET", "/getJson");
    xhr.send();
}