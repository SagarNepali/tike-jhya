/* response functions */
function screeningNResponseSubmit() {
    var valid = true;
    var fieldsToCheck = $("#screening-n-response-form").find(":required")
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    });
    if (valid == false) {
        $("#screening-n-response-form").find(".formSubmit").click();
        return false;
    } else {
        var id = $("#screening-n-id").val();
        var lastActionId = $("#last-action-id").val();
        var screeningNRequestStatus = $("#screening-n-request-status").val();
        var p1 = {"screening_n_id" : id, "last_action_id" : lastActionId, "screening_n_request_status" : screeningNRequestStatus };
        var p2Objects = $("#screening-n-response-form").serializeArray();
        var p2 = oneToMany(p2Objects);
        
        var post_data = {
            "msg_type" : "screening_n_response",
            "data" : JSON.stringify({"screening_n_info" : p1, "attachment_info" : p2})
                };
            
        console.log("Post data: ", post_data);
        
        var request = $.ajax({
            url : "./screeningn/responseSubmit",
            method : "POST",
            data : post_data,
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
            console.log("Response: ", response);
            
            var responseData = response['data'];
            
            
            $('.message-title').html("Screening response submission");
            if (responseData.status == 1) {
                $('.message-body').html("<p>" + responseData.description + "</p>");
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
    }
}

function accountsNResponseSubmit() {
    var valid = true;
    var fieldsToCheck = $("#accounts-n-response-form").find(":required")
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    });
    if (valid == false) {
        $("#accounts-n-response-form").find(".formSubmit").click();
        return false;
    } else {
        var id = $("#screening-n-id").val();
        var accountsNId = $("#accounts-n-request-id").val();
        var accountsNRequestStatus = $("#accounts-n-request-status").val();
        var requestToUnfreezeStatus ;
        if ($('#request-to-unfreeze-status').is(":checked"))
        {
          requestToUnfreezeStatus = true;
        }else{
            requestToUnfreezeStatus = false;
        }
        
        
        var lastAccountsActionId = $("#accounts-n-last-action-id").val();
        var completeDocuments = $("#complete-documents").val();
        var dueDateOfPendingDocuments = $("#due-date-of-pending-documents").val();
        var dueDateComments = $("#due-date-comments").val();
        
        var p1 = {  "screening_n_id" : id, 
                    "accounts_n_request_id" : accountsNId,
                    "accounts_n_last_action_id":lastAccountsActionId, 
                    "accounts_n_request_status" : accountsNRequestStatus ,
                    "request_to_unfreeze_status": requestToUnfreezeStatus,
                    "complete_documents" : completeDocuments,
                    "due_date_of_pending_documents" : dueDateOfPendingDocuments,
                    "due_date_comments" : dueDateComments
                    };
        

		var pendingDocsData = JSON.parse(localStorage.getItem('pending_document_list'));
		console.log(pendingDocsData);
        
        var p2Objects = $("#accounts-n-response-form").serializeArray();
        var p2 = oneToMany(p2Objects);
        
        var post_data = {
            "msg_type" : "screening_n_response",
            "data" : JSON.stringify({"accounts_n_info" : p1, "attachment_info" : p2})
                };
        
        console.log("Post data: ", post_data);
       
        var request = $.ajax({
            url : "./accountsn/responseSubmit",
            method : "POST",
            data : post_data,
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
            console.log("Response: ", response);
            
            var responseData = response['data'];
            
            
            $('.message-title').html("Screening response submission");
            if (responseData.status == 1) {
                $('.message-body').html("<p>" + responseData.description + "</p>");
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
        
     
    }
}


function unlockThisUsersAllAccountsRequests(){
	var unlockRequest = $.ajax({
        url: "./accountsn/unlockAccountsRequests",
        method: "POST",
        dataType: "json"
      });
       
unlockRequest.done(function( response ) {
          
      });
       
unlockRequest.fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus );
      });

}
