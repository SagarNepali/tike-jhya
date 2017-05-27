function initAccounts() {
    $(document).off('click', '#accounts-n-reply-btn').on('click', '#accounts-n-reply-btn', function() {
        accountNReplySubmit(this);
    });
    /*
    $(document).off('click', '#accounts-l-reply-btn').on('click', '#accounts-l-reply-btn', function() {
        accountsLReplySubmit(this);
    });
    */
   
    $(document).off("click", '#get-cbs-name-for-custid').on("click", '#get-cbs-name-for-custid', function(event) {
        getCbsNameForCustId();
    });
    
    $("#accounts-l-response-btn").click(function(event) {
        accountsLResponseSubmit(this); // screening-n-response
    });

}



function getCbsNameForCustId(){
    
    var cust_id = $('#generated-customer-id').val();
    var post_data = {
            "request" : "cbs_data",
            "cust_id" : cust_id,
            "scope" : "all"
    };
    
    $.ajax({
        url : './api/rest/cbs/custInfo',
        type : 'POST',
        dataType : 'json',
        data : post_data,
        async : false
    }).success(function(response) {
        cmgData = response['data']['CMG'][0];
        if(cmgData != undefined){
            $('#cust-name').val(cmgData['CUST_NAME']);    
        }                                                    
    }).fail(function() {
        console.log("error")
    });    
    
}

function accountNReplySubmit(that) {    
    var valid = true;
    var fieldsToCheck = $("#accounts-reply-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    }); 
    if (valid == false) {
        $("#accounts-reply-form").find(".formSubmit").click();
        return false;
    } else {
        var disabledControls = $('#accounts-reply-form').find(":disabled").removeAttr('disabled');
        var p1 = $("#accounts-reply-form").serializeArray();
        disabledControls.attr("disabled", "disabled");
        jsonData = JSON.stringify(changeObjectToFormData(p1));                
        
        var post_data = {
            msg_type : "accounts_n_reply_data",
            data : jsonData
        };

        var request = $.ajax({
            url : './accountsn/replySubmit',
            type : 'POST',
            dataType : 'json',
            data : post_data,
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            async : false
        });
        request.done(function(response) {
            var responseData = response['data'];
            $('.message-title').html("Account reply submission");
            if (responseData.status == 1) {
                $('.message-body').html("<p>" + responseData.description + "</p><p><b>Accounts Reply ID Generated</b>: " + responseData.id + "</p>");
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

function accountsLReplySubmit(that,redirectUrl) {  
    var valid = true;
    var fieldsToCheck = $("#accounts-l-reply-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    }); 
    if (valid == false) {
        $("#accounts-l-reply-form").find(".formSubmit").click();
        return false;
    } else {
        var disabledControls = $('#accounts-l-reply-form').find(":disabled").removeAttr('disabled');
        var p1 = $("#accounts-l-reply-form").serializeArray();
        disabledControls.attr("disabled", "disabled");
        jsonData = changeObjectToFormData(p1);                
        
        
        var post_data = {
        		account_legal_reply : jsonData
            };
            
        console.log(post_data)

        var request = $.ajax({
            url : './api/rest/accountsl/replySubmit',
            type : 'POST',
            dataType : 'json',
            data : { postData :(JSON.stringify(post_data))},
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        });
        request.done(function(response) {
        	console.log(response)
        	if(response.httpStatusCode===200){
//        		bootbox.alert("KYC saved successfully")
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Success',
        		    message: 'Accounts Legal Reply submitted successfully',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        		$.get(redirectUrl,function(data){
        			$("#page-content").html(data);
        		})
        	}else{
        		var res = JSON.parse(response);
        		
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Error',
        		    message: 'Error Code : 0x'+response.httpStatusCode+response.errorLevelCode+response.errorCode+'<p> Please Contact to Administrator',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        	}
        });
        request.fail(function(response){
        	console.log("error")
        	bootbox.alert(response.errorMessage +" \n" + response.errorCode)
        });
    	
    }
}


function accountsLResponseSubmit() {
    var valid = true;
    var fieldsToCheck = $("#accounts-l-response-form").find(":required")
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    });
    if (valid == false) {
        $("#accounts-l-response-form").find(".formSubmit").click();
        return false;
    } else {
        var id = $("#screening-l-id").val();
        var accountsLId = $("#accounts-l-request-id").val();
        var accountsLRequestStatus = $("#accounts-l-request-status").val();
        var requestToUnfreezeStatus ;
        if ($('#request-to-unfreeze-status').is(":checked"))
        {
          requestToUnfreezeStatus = true;
        }else{
            requestToUnfreezeStatus = false;
        }
        
        var completeDocuments;
        if ($('#complete-documents').is(":checked"))
        {
        	completeDocuments = true;
        }else{
        	completeDocuments = false;
        }
        
        var lastAccountsActionId = $("#accounts-l-last-action-id").val();
      //  var completeDocuments = $("#complete-documents").val();
        var dueDateOfPendingDocuments = $("#due-date-of-pending-documents").val();
        var dueDateComments = $("#due-date-comments").val();
        
        var p1 = {  "screening_l_id" : id, 
                    "accounts_l_request_id" : accountsLId,
                    "accounts_l_last_action_id":lastAccountsActionId, 
                    "accounts_l_request_status" : accountsLRequestStatus ,
                    "request_to_unfreeze_status": requestToUnfreezeStatus,
                    "complete_documents" : completeDocuments,
                    "due_date_of_pending_documents" : dueDateOfPendingDocuments,
                    "due_date_comments" : dueDateComments
                    };
        

		var pendingDocsData = JSON.parse(localStorage.getItem('pending_document_list'));
		console.log(pendingDocsData);
        
        var p2Objects = $("#accounts-l-response-form").serializeArray();
        var p2 = oneToMany(p2Objects);
        
        var post_data = {
            
            "accounts_l_info" : p1, "attachment_info" : p2
        };
        
        console.log("Post data: ", post_data);
       
        var request = $.ajax({
            url : "./api/rest/accountsl/responseSubmit",
            method : "POST",
            data : { postData :(JSON.stringify(post_data))},
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
        	console.log(response)
        	if(response.httpStatusCode===200){
//        		bootbox.alert("KYC saved successfully")
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Success',
        		    message: 'Accounts Legal Response submitted successfully',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        		$.get("./screeningl/accountsReplyListForm",function(data){
        			$("#page-content").html(data);
        		})
        	}else{
        		var res = JSON.parse(response);
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Error',
        		    message: 'Error Code : 0x'+response.httpStatusCode+response.errorLevelCode+response.errorCode+'<p> Please Contact to Administrator',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        		
        	}
        });
        request.fail(function(response){
        	console.log("error")
        	bootbox.alert(response.errorMessage +" \n" + response.errorCode)
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
