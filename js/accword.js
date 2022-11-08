function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let i = getParameterByName("id");

function loadDoc() {
    // find student by id and show student detail
    const xmhttp = new XMLHttpRequest();
    xmhttp.onload = function () {
        const json = this.responseText;
        const students = JSON.parse(json);
        file = students[i].files.trim();
        document.getElementById("download").innerHTML = `<a href="./files/${file}"}>ดาวน์โหลดเอกสาร</a>`


    }

    xmhttp.open('GET', '/getJson');
    xmhttp.send();
}