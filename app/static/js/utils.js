// Given a path and dict of fields to send as a form, make a POST request
// to that location, calling the callback on the response
function ajaxPost(path, data, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            if (xmlhttp.status > 299) {
                console.log(xmlhttp.status);
                console.log(xmlhttp);
            }
            callback(xmlhttp.responseText);
        }
    };
    let formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {           
            formData.append(key, data[key]);
        }
    }
    xmlhttp.open("POST", path, true);
    xmlhttp.send(formData);
}
