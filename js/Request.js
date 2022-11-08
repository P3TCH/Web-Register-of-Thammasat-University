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
          `<li class="menu__group"><a href  = ./contactteach?username=${myObj.data.userName} class="menu__link r-link text-underlined">ขัอมูลอาจารย์</a></li>\n`+
          `<li class="menu__group"><a href  = ./manual?username=${myObj.data.userName} class="menu__link r-link text-underlined">ตัวอย่างการกรอกคำร้อง</a></li>`;

          document.getElementById("num").innerHTML =
          `<h2>เลขทะเบียน<span></span></h2>
                                <input type="text" name="sid" id="sid" disabled="disabled" value="${user}" placeholder="${user}" maxlength="10" pattern="[0-9]+"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-exclamation-circle"></i>
                                <small id="sSid">error</small>`;
      }
      if (this.readyState != 4 && this.status != 200) {
          alert("Error");
      }
  }
}

function checkInputs() {
  var count = 0 ;
  var specialCount = 0 ;
  const dateValue = document.getElementById('date').value ;
  const nameValue = document.getElementById('name').value ;
  const nameLValue = document.getElementById('lName').value ;
  const sidValue = document.getElementById('sid').value ;
  const teacherValue = document.getElementById('teacher').value ;
  const houseValue = document.getElementById('house').value ;
  const mooValue = document.getElementById('moo').value ;
  const districtValue = document.getElementById('district').value ;
  const amperValue = document.getElementById('amper').value ;
  const provinceValue = document.getElementById('province').value ;
  const zipValue = document.getElementById('zip').value ;
  const phoneValue = document.getElementById('phone').value ;
  const phoneHValue = document.getElementById('phoneH').value ;
  const causeValue = document.getElementById('cause').value ;
  const subject = document.getElementById('subject').value ;

  if(dateValue == '') {
    setErrorFor(document.getElementById('date'), 'กรุณาระบุวันที่กรอกคำร้อง', 'sDate') ;
    count++ ;
  } else {
    setSuccessFor(document.getElementById('date')) ;
  }
  if(nameValue == '') {
    setErrorFor(document.getElementById('name'), 'กรุณากรอกชื่อ', 'sName') ;
    count++ ;
  } else {
    setSuccessFor(document.getElementById('name')) ;
  }
  if(nameLValue == '') {
    setErrorFor(document.getElementById('lName'), 'กรุณากรอกนามสกุล', 'sLName') ;
    count++ ;
  } else {
    setSuccessFor(document.getElementById('lName')) ;
  }
  if(sidValue == '') {
    setErrorFor(document.getElementById('sid'), 'กรุณากรอกเลขทะเบียน', 'sSid') ;
    count++ ;
  } else if(sidValue.toString().length != 10) {
    setErrorFor(document.getElementById('sid'), 'กรุณากรอกเลขทะเบียนให้ถูกต้อง 10 หลัก', 'sSid') ;
    specialCount++ ;
  } else {
    setSuccessFor(document.getElementById('sid')) ;
  }
  if(teacherValue == '') {
    count++ ;
    setErrorFor(document.getElementById('teacher'), 'กรุณากรอกชื่ออาจารย์ที่ปรึกษา', 'sTeacher') ;
  } else {
    setSuccessFor(document.getElementById('teacher')) ;
  }
  if(houseValue == '') {
    count++ ;
    setErrorFor(document.getElementById('house'), 'กรุณากรอกบ้านเลขที่', 'sHouse') ;
  } else {
    setSuccessFor(document.getElementById('house')) ;
  }
  if(mooValue == '') {
    count++ ;
    setErrorFor(document.getElementById('moo'), 'กรุณากรอกหมู่ที่', 'sMoo') ;
  } else {
    setSuccessFor(document.getElementById('moo')) ;
  }
  if(districtValue == '') {
    count++ ;
    setErrorFor(document.getElementById('district'), 'กรุณากรอกตำบล', 'sDistrict') ;
  } else {
    setSuccessFor(document.getElementById('district')) ;
  }
  if(amperValue == '') {
    count++ ;
    setErrorFor(document.getElementById('amper'), 'กรุณากรอกอำเภอ', 'sAmper') ;
  } else {
    setSuccessFor(document.getElementById('amper')) ;
  }
  if(provinceValue == '') {
    count++ ;
    setErrorFor(document.getElementById('province'), 'กรุณากรอกจังหวัด', 'sProvince') ;
  } else {
    setSuccessFor(document.getElementById('province')) ;
  }
  if(zipValue == '') {
    count++ ;
    setErrorFor(document.getElementById('zip'), 'กรุณากรอกรหัสไปรษณีย์', 'sZip') ;
  } else if(zipValue.toString().length != 5) {
    specialCount++ ;
    setErrorFor(document.getElementById('zip'), 'กรอกรหัสไปรษณีย์ให้ถูกต้อง 5 หลัก', 'sZip') ;
  } else {
    setSuccessFor(document.getElementById('zip')) ;
  }
  if(phoneValue == '') {
    count++ ;
    setErrorFor(document.getElementById('phone'), 'กรุณากรอกเบอร์โทรศัพท์มือถือ', 'sPhone') ;
  } else if(phoneValue.toString().length != 10) {
    specialCount++ ;
    setErrorFor(document.getElementById('phone'), 'กรอกเบอร์โทรศัพท์มือถือให้ถูกต้อง 10 หลัก', 'sPhone') ;
  } else if(phoneValue.toString()[0] != 0) {
    specialCount++ ;
    setErrorFor(document.getElementById('phone'), 'กรอกเบอร์โทรศัพท์มือถือให้ถูกต้อง ขึ้นต้นด้วยเลข 0', 'sPhone') ;
  } else {
    setSuccessFor(document.getElementById('phone')) ;
  }
  if(phoneHValue == '') {
    setSuccessFor(document.getElementById('phoneH')) ;
  } else if(phoneHValue.toString().length != 9) {
    specialCount++ ;
    setErrorFor(document.getElementById('phoneH'), 'กรอกเบอร์โทรศัพท์บ้านให้ถูกต้อง 9 หลัก', 'sPhoneH') ;
  } else if(phoneHValue.toString()[0] != 0) {
    specialCount++ ;
    setErrorFor(document.getElementById('phoneH'), 'กรอกเบอร์โทรศัพท์บ้านให้ถูกต้อง ขึ้นต้นด้วยเลข 0', 'sPhoneH') ;
  } else {
    setSuccessFor(document.getElementById('phoneH')) ;
  }
  if(causeValue == '') {
    count++ ;
    setErrorFor(document.getElementById('cause'), 'กรุณากรอกเหตุผลที่ขอเพิ่ม-ถอนรายวิชา', 'sCause') ;
  } else {
    setSuccessFor(document.getElementById('cause')) ;
  }

  if(count > 0) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน") ;
  } else if(specialCount > 0) {
    alert("กรุณากรอกข้อมูลให้ถูกต้อง") ;
  } else if(document.getElementById('cAdd').value + document.getElementById('cWithdraw').value <= 0) {
    alert("กรุณากรอกเพิ่มหรือถอนอย่างน้อย 1 รายวิชา") ;
  } else {
    let addArr = [] , withdrawArr = [] ;
    for(let x = 1; x <= document.getElementById('cAdd').value; x++) {
      addArr[x - 1] = {"subjectCode": document.getElementById('addSubjectID'+x).value,
                  "subjectName": document.getElementById('addSubjectName'+x).value,
                  "subjectSection": document.getElementById('addSectionNo'+x).value,
                  "subjectDate": document.getElementById('addTime'+x).value,
                  "subjectCredit": document.getElementById('addCredits'+x).value,
                  "subjectTeacher": document.getElementById('addTeacher'+x).value,
                  "subjectTeacherCheck": document.getElementById('addOk'+x).value,}
    }
    for(let x = 1; x <= document.getElementById('cWithdraw').value; x++) {
      withdrawArr[x - 1] = {"subjectCode": document.getElementById('withdrawSubjectID'+x).value,
                  "subjectName": document.getElementById('withdrawSubjectName'+x).value,
                  "subjectSection": document.getElementById('withdrawSectionNo'+x).value,
                  "subjectDate": document.getElementById('withdrawTime'+x).value,
                  "subjectCredit": document.getElementById('withdrawCredits'+x).value,
                  "subjectTeacher": document.getElementById('withdrawTeacher'+x).value,
                  "subjectTeacherCheck": document.getElementById('withdrawOk'+x).value,}
    }
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const jlist = JSON.parse(json);

        let moneydate = jlist.datemoney;

        var dateArray = moneydate.split("-", 3);
        console.log(dateArray);

        var date1 = new Date(moneydate);
        var date2 = new Date(dateValue);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let moneytopay = Difference_In_Days * 45;
        console.log(moneytopay);

        var data = {"user": user, "statusacc": "waitting" , "money" : moneytopay ,"date": document.getElementById('date').value, "studentFirstName": document.getElementById('name').value, "studentLastName": document.getElementById('lName').value, "studentId": document.getElementById('sid').value, "studentYear": document.getElementById('year').value,
        "studentField": document.getElementById('subject').value, "advisor": document.getElementById('teacher').value, "addressNumber": document.getElementById('house').value, "moo": document.getElementById('moo').value, "tumbol": document.getElementById('district').value, "amphur": document.getElementById('amper').value,
        "province": document.getElementById('province').value, "postalCode": document.getElementById('zip').value, "mobliePhone": document.getElementById('phone').value, "phone": document.getElementById('phoneH').value, "cause": document.getElementById('cause').value, "addSubjectList": addArr, "dropSubjectList": withdrawArr}

        var myJSON = JSON.stringify(data) ;
        saveFile(myJSON) ;
        console.log(myJSON) ;
    }
    xmhttp.open("GET", "/getMoney");
    xmhttp.send();
    window.location.assign('./main?username='+user );
  }
}

function setErrorFor(input, message, id) {
  const formControl = input.parentElement;
  const small = document.getElementById(id) ;
  small.innerText = message ;
  formControl.className = "form-control error" ;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success" ;
}

function chanceAddTable(option) {
  let x = document.getElementById('cAdd') ;
  let table = document.getElementById('tableAdd') ;
  if (option === 'add') {
    x.value++;
    table.hidden = false;
    let tr = document.createElement('tr');
    tr.id = `add${x.value}`;
    tr.innerHTML = `<th style="padding-top: 20px; padding-bottom: 20px;">${x.value}</th>\n` +
        `            <th><input type="text" id="addSubjectID${x.value}" style="width: 45px;"></th>\n` +
        `            <th><input type="text" id="addSubjectName${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="text" min="1" id="addSectionNo${x.value}" style="width: 45px;"></th>\n` +
        `            <th><input type="text" id="addTime${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="text" min="1" id="addCredits${x.value}" style="width: 30px;"></th>\n` +
        `            <th><input type="text" id="addTeacher${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="checkbox" id="addOk${x.value}" disabled></th>`
    table.appendChild(tr);
} else if (option === 'remove') {
    if (x.value == '0') {
        return;
    } else if(x.value == '1') {
        table.removeChild(document.getElementById(`add${x.value}`));
        table.hidden = true;
        x.value--;
    } else {
        table.removeChild(document.getElementById(`add${x.value}`));
        x.value--;
    }
  }
}

function chanceWithdrawTable(option) {
  let x = document.getElementById('cWithdraw') ;
  let table = document.getElementById('tableWithdraw') ;
  if (option === 'add') {
    x.value++;
    table.hidden = false;
    let tr = document.createElement('tr');
    tr.id = `withdraw${x.value}`;
    tr.innerHTML = `<th style="padding-top: 20px; padding-bottom: 20px;">${x.value}</th>\n` +
        `            <th><input type="text" id="withdrawSubjectID${x.value}" style="width: 45px;"></th>\n` +
        `            <th><input type="text" id="withdrawSubjectName${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="text" min="1" id="withdrawSectionNo${x.value}" style="width: 45px;"></th>\n` +
        `            <th><input type="text" id="withdrawTime${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="text" min="1" id="withdrawCredits${x.value}" style="width: 30px;"></th>\n` +
        `            <th><input type="text" id="withdrawTeacher${x.value}" style="width: 200px;"></th>\n` +
        `            <th><input type="checkbox" id="withdrawOk${x.value}" disabled></th>`
    table.appendChild(tr);
} else if (option === 'remove') {
    if (x.value == '0') {
        return;
    } else if(x.value == '1') {
        table.removeChild(document.getElementById(`withdraw${x.value}`));
        table.hidden = true;
         x.value--;
    } else {
        table.removeChild(document.getElementById(`withdraw${x.value}`));
        x.value--;
    }
  }
}

function saveFile(myjson) {
  const xhttp = new XMLHttpRequest() ;
  xhttp.onload = function() {
    let msg = this.responseText;
    alert("ส่งคำร้องสำเร็จแล้วจ้า")
  } ;
  xhttp.open("POST", "/saveStudent") ;
  xhttp.send(myjson) ;
}

function loaddate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  console.log(today);



}
