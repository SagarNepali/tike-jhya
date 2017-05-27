/* reply functions */
function screeningNReplySubmit(that) {
    var valid = true;
    var fieldsToCheck = $("#screening-reply-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "" || $(value).val() == " ") {
            valid = false;
        }
    });
    if (valid == false) {
        $('#screening-reply-form').find(".formSubmit").click();
        
        return false;
    } else {
        //var id = $("#screening-n-id").val();
        var p1 = $("#screening-reply-form").serializeArray(); 
        
        jsonData = JSON.stringify(changeObjectToFormData(p1));
       
        
        var post_data = {
            msg_type : "screening_n_reply_data",
            data : jsonData
        };
        
        console.log('reply post data: ', post_data);
		
        var request = $.ajax({
            url : "./screeningn/screeningNReplySubmit",
            method : "POST",
            data : post_data,
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
            var responseData = response['data'];
            $('.message-title').html("Screening reply submission");
            if (responseData.status == 1) {
                $('.message-body').html("<p>" + responseData.description + "</p><p><b>Screenng Reply ID Generated</b>: " + responseData.id + "</p>");
                $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
                    var url = responseData.redirectUrl;
                    $.get(url, function(data) {
                        $("#page-content").html(data);
                    });
                });
            } else {
                $('.message-body').html("<p><b>Error Number</b>: 0x" + responseData.status.toString(16) + "</p><p><b>Error Description</b>: " + responseData.description + "</p>");
            }
            $('#message-modal').modal();
            
        });
        request.fail(function() {
            $('.message-title').html("ERROR");
            $('.message-body').html("<p>Network Connection Error</p>");
        });
        
        
    }
}
