$.ajax({
    url: "http://localhost:8080/it-recruitment.mintel.com/testing/test_data.json",
    method: "GET"
}).then(function (data) {
    console.log(data);
});