function saveFile(myjson) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let msg = this.responseText;
        alert(msg)
    };
    xhttp.open("POST", "/updating");
    xhttp.send(myjson);
}