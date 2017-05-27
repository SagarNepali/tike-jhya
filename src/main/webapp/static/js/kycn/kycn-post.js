// Search Click
function searchClick() {
    searchBy = $("#searchBy").val();
    if (searchBy == "name") {
        var key = $("#key").val();
        post_data = {
            "msg_type" : "search_kyc",
            "key" : key
        }
    } else if (searchBy == "transaction") {
        var frequency = $("#frequency").val();
        var type = $("#type").val();
        post_data = {
            "msg_type" : "search_ttr",
            "frequency" : frequency,
            "type" : type
        }
    } else if (searchBy == "observation") {
        var frequency = $("#frequency").val();
        var type = $("#type").val();
        post_data = {
            "msg_type" : "search_str",
            "frequency" : frequency,
            "type" : type
        }
    }
    var request = $.ajax({
        url : host,
        method : "POST",
        data : post_data,
        dataType : "json"
    });
    request.done(function(response) {
        response = JSON.parse(response);
        console.log(response);
    });
    request.fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}