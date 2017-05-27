function kyclSubmit() {
    post_data = JSON.parse(localStorage.getItem("kycl_post_data"));
    console.log(JSON.stringify(post_data));
    var request = $.ajax({
        url : "./api/rest/kycl/submit",
        method : "POST",
        data : {
            postData : (JSON.stringify(post_data))
        },
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    request.done(function(response) {
        if(response.httpStatusCode===200){			    	
    		var dialog = bootbox.dialog({
    			size: "small",
    			title: 'Success',
    		    message: 'KYC successfully inserted',
    		    buttons: {
    		        confirm: {
    		            label: 'ok',
    		            className: 'btn-primary'
    		        }
    		    }
    		});
    		 $.get("./kyc/requestListForm", function(data) {
                 $("#page-content").html(data);
             })
    	}else{
    		var response = JSON.parse(response);
    		
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
    request.fail(function(response) {
        console.log("error")
        bootbox.alert(response.errorMessage + " \n" + response.errorCode)
    });

}

function kyclRefreshSubmit() {
    post_data = JSON.parse(localStorage.getItem("kycl_post_data"));
    //console.log(JSON.stringify(post_data));
    var request = $.ajax({
        url : "./api/rest/kycl/refreshSubmit",
        method : "POST",
        data : {
            postData : (JSON.stringify(post_data))
        },
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    request.done(function(response) {
        //console.log(response)
    	 if(response.httpStatusCode===200){			    	
     		var dialog = bootbox.dialog({
     			size: "small",
     			title: 'Success',
     		    message: 'KYC refresh successful',
     		    buttons: {
     		        confirm: {
     		            label: 'ok',
     		            className: 'btn-primary'
     		        }
     		    }
     		});
     		 $.get("./kyc/refreshListForm", function(data) {
                  $("#page-content").html(data);
              })
     	}else{
     		var response = JSON.parse(response);
     		
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
    request.fail(function(response) {
        console.log("error")
        bootbox.alert(response.errorMessage + " \n" + response.errorCode)
    });

}