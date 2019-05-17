function appendInfoOnHtml() {
    $("#content").append(`<div id="first"><p>The data is from this <a href="http://it-recruitment.mintel.com/testing/test_data.json" target="_blank">JSON</a>.</p></div>`);
    $("#content").append(`<div id="second"><p>There are ${uniqueStatuses} unique statuses in this JSON.</p></div>`);
    $("#content").append(`<div id="third"><p>The users who made the most operation are:</p>${printUseAndOpe(topUsers)}</div>`);
    $("#content").append(`<div id="fourth"><p>There average time a piece stay in status 8951 is ${status8951AvgTime.toFixed(2)} seconds.</p></div>`);

    function printUseAndOpe(array) {
        let print = "";
        for (let i = 0; i < array.length; i++) {
            let use = array[i][0];
            let ope = array[i][1];
            print += `<span>#${i + 1} - User ${use} with ${ope} operations</span><br>`
        }
        return print;
    }
}

let uniqueStatuses;
let topUsers;
let status8951AvgTime;

$.ajax({
    url: "http://localhost:8080/it-recruitment.mintel.com/testing/test_data.json",
    method: "GET"
}).then(function (data) {
    uniqueStatuses = getUniqueStatus(data);
    topUsers = printTopUsers(data);
    status8951AvgTime = status8951Time(data);
    appendInfoOnHtml();
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

function printTopUsers(data) {
    let usersObj = {};
    let usersArr = [];

    // create an object of user-operation
    for (let i = 0; i < data.length; i++) {
        if (usersObj[data[i].user_id]) {
            usersObj[data[i].user_id] += 1;
        } else {
            usersObj[data[i].user_id] = 1;
        }
    }

    // create a sorted user-operation array from top to bottom
    for (var user in usersObj) {
        usersArr.push([user, usersObj[user]]);
    }
    usersArr.sort(function (a, b) {
        return b[1] - a[1];
    });

    // function to return the number of top users (5 for this example)
    function topUsers(array, length) {
        let topUsersArr = [];
        for (let i = 0; i < length; i++) {
            topUsersArr.push(array[i]);
        }
        return topUsersArr
    }
    return topUsers(usersArr, 5);
}

function status8951Time(data) {
    let count = 0;
    let timeSum = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].status === 8951 && typeof data[i].start_time === "number" && typeof data[i].end_time === "number") {
            count++;
            timeSum += data[i].end_time - data[i].start_time;
        }
    }
    let timeAvg = timeSum / count;

    return timeAvg;
}