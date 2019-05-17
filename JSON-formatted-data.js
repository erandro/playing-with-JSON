function appendInfoOnHtml() {
    $("#content").append(`<div id="first"><p>The data is from this <a href="http://it-recruitment.mintel.com/testing/test_data.json" target="_blank">JSON</a>.</p></div>`)
    $("#content").append(`<div id="second"><p>There are ${uniqueStatuses} unique statuses in this JSON.</p></div>`)
}

let uniqueStatuses;

$.ajax({
    url: "http://localhost:8080/it-recruitment.mintel.com/testing/test_data.json",
    method: "GET"
}).then(function (data) {
    uniqueStatuses = getUniqueStatus(data);
    appendInfoOnHtml()
});

function getUniqueStatus(data) {
    let statusObj = {}
    let uniqueStatusObj = {}
    for (let i = 0; i < data.length; i++) {
        if (statusObj[data[i].status]) {
            delete uniqueStatusObj[data[i].status];
        } else {
            statusObj[data[i].status] = data[i].status;
            uniqueStatusObj[data[i].status] = data[i].status;
        }
    }
    return Object.keys(uniqueStatusObj).length;
}

