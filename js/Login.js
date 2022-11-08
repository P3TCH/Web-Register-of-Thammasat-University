

var check = 0;

function Logteacher() {
    
    // search student by name and year param and set hyperlink to info of student
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        let json = this.responseText;
        const data = JSON.parse(json);
        let username = document.getElementById("Username").value;
        let password = document.getElementById("Password").value;
        let link = " ";
        console.log(data);
        console.log(username);
        console.log(password);
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == username && data[i].password == password){
               if(data[i].status == "teacher"){
                 window.open("./mainteacher?username=" + data[i].name , '_self' );
                 count = 0 ;
                 break;
            }
           }else{
               count++;
           }
        }
        if(count > 0){
            check = 0;

        }


    }
    xmhttp.open('GET', "/getData");
    xmhttp.send();
}

function Login() {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    //Logteacher();
    LogStudent();
}
function LogStudent() {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    const data = { email: username, password: password };
    fetch('http://localhost:81/login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
    });
    
};
