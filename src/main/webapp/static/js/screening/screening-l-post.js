/**
 * @Sagar
 * 
 */

function screeningLRequestSubmit() {
	
	post_data = JSON.parse(localStorage.getItem("screening_l_request_post_data"));
    var request = $.ajax({
        url : "./api/rest/screeningl/submit",
        method : "POST",
        data : { postData :(JSON.stringify(post_data))},
    });
    request.done(function(response) {
    	console.log(response)
    	if(response.httpStatusCode===200){
//    		bootbox.alert("KYC saved successfully")
    		bootboxSuccessDialog("Screening legal request submit successful");
    		$.get("./screeningl/requestForm",function(data){
    			$("#page-content").html(data);
    		})
    	}else{
    		
    		console.log(response)
    		var res = JSON.parse(response);
    		bootboxErrorDialog(response);
    	}
    });
    request.fail(function(response){
    	console.log("error")
    	bootbox.alert("Could not connect to server")
    });
	
}

function screeningLReplySubmit(that,redirectUrl){
	var valid = true;
    var fieldsToCheck = $("#screening-l-reply-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "" || $(value).val() == " ") {
            valid = false;
        }
    });
    if (valid == false) {
        $('#screening-l-reply-form').find(".formSubmit").click();
        
        return false;
    } else {
        //var id = $("#screening-n-id").val();
        var p1 = $("#screening-l-reply-form").serializeArray(); 
        
        jsonData = changeObjectToFormData(p1);
       
        var post_data = {
            reply : jsonData
        };
        
        console.log('Screening L Reply post data: ', post_data);
		
        var request = $.ajax({
            url : "./api/rest/screeningl/replySubmit",
            method : "POST",
            data : { postData :(JSON.stringify(post_data))},
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
        	console.log(response)
        	if(response.httpStatusCode===200){
//        		bootbox.alert("KYC saved successfully")
        		bootboxSuccessDialog("Screening legal reply submit successful");
        		$.get(redirectUrl,function(data){
        			$("#page-content").html(data);
        		})
        	}else{
        		bootboxErrorDialog(response);
        	}
        });
        request.fail(function(response){
        	console.log("error")
        	console.log(response)
        	bootbox.alert("Couldnot connect to server")
        });
        
        
    }
}


function screeningLResponseSubmit() {
    var valid = true;
    var fieldsToCheck = $("#screening-l-response-form").find(":required")
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    });
    if (valid == false) {
        $("#screening-l-response-form").find(".formSubmit").click();
        return false;
    } else {
        var id = $("#screening-l-id").val();
        var lastActionId = $("#last-action-id").val();
        var screeningNRequestStatus = $("#screening-l-request-status").val();
        var p1 = {"screening_l_id" : id, "last_action_id" : lastActionId, "screening_l_request_status" : screeningNRequestStatus };
        var p2Objects = $("#screening-l-response-form").serializeArray();
        var p2 = oneToMany(p2Objects);
        
        var post_data = {"screening_l_info" : p1, "attachment_info" : p2};
            
        console.log('Screening L response post data: ', post_data);
        
        var request = $.ajax({
            url : "./api/rest/screeningl/responseSubmit",
            method : "POST",
            data : { postData : JSON.stringify(post_data)},
            dataType : "json",
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        request.done(function(response) {
        	console.log(response)
        	if(response.httpStatusCode===200){
//        		bootbox.alert("KYC saved successfully")
        		bootboxSuccessDialog("Screening legal response submit successful");
        		$.get("./screeningl/replyListForm",function(data){
        			$("#page-content").html(data);
        		})
        	}else{
        		
        		console.log(response)
        		var res = JSON.parse(response);
        		
        		bootboxErrorDialog(response);
        	}
        });
        request.fail(function(response){
        	console.log("error")
        	bootbox.alert("Couldnot connect to server")
        });  
    }
}

function bootboxErrorDialog(response){
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

function bootboxSuccessDialog(message){
	var dialog = bootbox.dialog({
		size: "small",
		title: 'Success',
	    message: message,
	    buttons: {
	        confirm: {
	            label: 'OK',
	            className: 'btn-primary'
	        }
	    }
	});
}