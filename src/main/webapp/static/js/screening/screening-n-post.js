var globalFireCount = 0;
function screeningNRequestSubmit() {
    var post_data = {
        "msg_type" : "screening_n_request",
        "data" : localStorage.getItem("screening_n_request_post_data")
    };
    $.ajax({
        url : "./screeningn/requestSubmit",
        method : "POST",
        data : post_data,
        async : false,
        global : false,
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        
    }).done(function(response) {        
        var responseData = response['data'];
        $('.message-title').html("Screening request submission");
        if (responseData.status == 1) {
            $('.message-body').html("<p>" + responseData.description + "</p><p><b>Screenng ID Generated</b>: " + responseData.id + "</p>");
            localStorage.removeItem("screening_n_request_post_data");
            $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(e) {                
                var url = responseData.redirectUrl;
                $('#reset-screening-n-request-form').click();
                /*
                $.get(url, function(data) {
                    $("#page-content").html(data);
                });
                */
            });
        }else if (responseData.status == 500) {
            $('.message-body').html("<p><b> Error code</b>: 0x"+responseData.status+"</p><p><b>Error description</b>:" + responseData.description + "</p>");
            localStorage.removeItem("screening_n_request_post_data");
            $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(e) {                
                var url = responseData.redirectUrl;
                $.get(url, function(data) {
                    window.html(data);
                });
            });
        } else {
            $('.message-body').html("<p><b>Error Number</b>: 0x" + responseData.status.toString(16) + "</p><p><b>Error Description</b>: " + responseData.description + "</p>");
            $('#message-modal').modal();
        }
        $('#message-modal').modal();
        $("body").animate({
            scrollTop : "100px"
        });
    }).fail(function() {
        $('.message-title').html("ERROR");
        $('.message-body').html("<p>Network Connection Error</p>");
    });
}