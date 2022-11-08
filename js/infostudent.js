 function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let i = getParameterByName("id"); 


function loadInfo() {
    console.log("Loaded")
    // find student by id and show student detail
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const studentlist = JSON.parse(json);

        let table1 = document.getElementById("table1");
        let table2 = document.getElementById("table2");

                document.getElementById("fname").innerHTML = studentlist[i].studentFirstName;
                document.getElementById("lname").innerHTML = studentlist[i].studentLastName;
                document.getElementById("studentId").innerHTML = studentlist[i].studentId;
                document.getElementById("studentYear").innerHTML = studentlist[i].studentYear;
                document.getElementById("studyField").innerHTML = studentlist[i].studentField;
                document.getElementById("advisor").innerHTML = studentlist[i].advisor;
                document.getElementById("addressNumber").innerHTML = studentlist[i].addressNumber;
                document.getElementById("moo").innerHTML = studentlist[i].moo;
                document.getElementById("tumbol").innerHTML = studentlist[i].tumbol;
                document.getElementById("amphur").innerHTML = studentlist[i].amphur;
                document.getElementById("provice").innerHTML = studentlist[i].province;
                document.getElementById("postalCode").innerHTML = studentlist[i].postalCode;
                document.getElementById("mobilePhone").innerHTML = studentlist[i].mobliePhone;
                document.getElementById("phone").innerHTML = studentlist[i].phone;
                document.getElementById("cause").innerHTML = studentlist[i].cause;
                document.getElementById("files").innerHTML = `<a href= ./files/${studentlist[i].files}>${studentlist[i].files}</a><br>`
                let addsub = studentlist[i].addSubjectList.length;
                let dropsub = studentlist[i].dropSubjectList.length;
                for (var j = 0; j < addsub; j++) {
                    let tr = document.createElement('tr');
                    tr.id = `add${i}`;
                    tr.innerHTML = `<td align="center">${studentlist[i].addSubjectList[j].subjectCode}</td>\n` +
                        `<td align="center">${studentlist[i].addSubjectList[j].subjectName}</td>\n` +
                        `<td align="center">${studentlist[i].addSubjectList[j].subjectSection}</td>\n` +
                        `<td align="center">${studentlist[i].addSubjectList[j].subjectDate}</td>\n` +
                        `<td align="center">${studentlist[i].addSubjectList[j].subjectCredit}</td>\n` +
                        `<td align="center">${studentlist[i].addSubjectList[j].subjectTeacher}</td>\n`
                    table1.appendChild(tr);
                }
                for (var k = 0; k < dropsub; k++) {
                    let tr = document.createElement('tr');
                    tr.id = `add${i}`;
                    tr.innerHTML = `<td align="center">${studentlist[i].dropSubjectList[k].subjectCode}</td>\n` +
                        `<td align="center">${studentlist[i].dropSubjectList[k].subjectName}</td>\n` +
                        `<td align="center">${studentlist[i].dropSubjectList[k].subjectSection}</td>\n` +
                        `<td align="center">${studentlist[i].dropSubjectList[k].subjectDate}</td>\n` +
                        `<td align="center">${studentlist[i].dropSubjectList[k].subjectCredit}</td>\n` +
                        `<td align="center">${studentlist[i].dropSubjectList[k].subjectTeacher}</td>\n` 
                    table2.appendChild(tr);
                }

        console.log(studentlist);
    }

    xmhttp.open('GET', "/getJson");
    xmhttp.send();

}