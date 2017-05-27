$(document).ready(function(){       
    
//	$(document).off("click","#reset-user-add-form" ).on("click","#reset-user-add-form", function(evt){
//		evt.preventDefault();
//		$("#email-error").hide();
//		$("#employee-id-error").hide();
//		$("#username-error").hide();
//		$('#password-message').html("No password provided.").css('color', 'red');
//		$("#add-user-form-submit-btn").attr("disabled","disabled");
//		$("#add-user-form")[0].reset();
//	});
//	
//	$(document).off("focusout","#username").on("focusout","#username", function(){
//		var username = $("#username").val();
//		if(username==""){
//			$("#username-error").show();
//			$("#username-error").html("User Name Required");
//			return;
//		}
//		$.ajax({
//			url:"./admin/user/validate-username",
//			method:"POST",
//			data:{
//				username:username.trim()
//			},
//		}).done(function(response){
//			if(response){
//				$("#username-error").show();
//				$("#username-error").html("User Name Already Exists");
//			} else{
//				$("#username-error").hide();
//			}
//		}).fail(function(){
//			console.log("Network Server Error");
//		});
//	});
//	
//	$(document).off("focusout","#email").on("focusout","#email", function(){
//		var email = $("#email").val();
//		if(email==""){
//			$("#email-error").show();
//			$("#email-error").html("Email Required");
//			return;
//		}
//		$.ajax({
//			url:"./admin/user/validate-email",
//			method:"POST",
//			data:{
//				email:email.trim()
//			},
//		}).done(function(response){
//			if(response){
//				$("#email-error").show();
//				$("#email-error").html("Email Already Exists");
//			} else{
//				$("#email-error").hide();
//			}
//		}).fail(function(){
//			console.log("Network Server Error");
//		});
//	});
//	
//	$(document).off("focusout","#employee-id").on("focusout","#employee-id", function(){
//		var id = $("#employee-id").val();
//		if(id==""){
//			$("#employee-id-error").show();
//			$("#employee-id-error").html("Employee Id Required");
//			return;
//		}
//		$.ajax({
//			url:"./admin/user/validate-employee-id",
//			method:"POST",
//			data:{
//				id:id.trim()
//			},
//		}).done(function(response){
//			if(response){
//				$("#employee-id-error").show();
//				$("#employee-id-error").html("Employee Id Already Exists");
//			} else{
//				$("#employee-id-error").hide();
//			}
//		}).fail(function(){
//			
//			console.log("Network Server Error");
//		});
//	});
//	
//	
//	
//	
//	
//	
//	$(document).off("click", "#add-user-form-submit-btn").on("click", "#add-user-form-submit-btn", function(event){
//		event.preventDefault();
//		var fieldsToCheck = $("#add-user-form").find(":required")
//        var valid = true;
//        $.each(fieldsToCheck, function(index, value){
//            if($(value).val()=="")
//                valid=false;
//        })
//        if(valid==false){
//            $("#add-user-form").find(".formSubmit").click();
//            return false;
//        }
//        else{
//            var p1 = changeObjectToFormData($("#add-user-form").serializeArray()); 
//            $.ajax({
//            	url:"./admin/user/addSubmit",
//            	method:"POST",
//            	data:JSON.stringify(p1),
//            	beforeSend: function(xhr){
//            		xhr.setRequestHeader("Accept","application/json");
//            		xhr.setRequestHeader("Content-Type","application/json");
//            	},
//            }).done(function(response){
//            	 if (response.status == "success") {
//                     $("#add-user-form")[0].reset();
//                     $("#password-message").html("No password provided").css("color","red");
//            		 var dialog = bootbox.dialog({
//                         size : "small",
//                         title : 'Success',
//                         message : 'Successfully User Added',
//                         buttons: {
//             		        confirm: {
//             		            label: 'ok',
//             		            className: 'btn-primary'
//             		        }
//             		    }
//                     });
//                 } else {
//                     var dialog = bootbox.dialog({
//                         size : "small",
//                         title : 'Error',
//                         message : 'Please Contact To Administrator',
//                         buttons: {
//             		        confirm: {
//             		            label: 'ok',
//             		            className: 'btn-primary'
//             		        }
//             		    }
//                     });
//                 }
//            }).fail(function(){
//            	
//            });
//            
//        }//end of else
//    });   
//    
//    
//    $(document).off("click", "#password-change-form-submit-btn").on("click", "#password-change-form-submit-btn", function(event){
//        var fieldsToCheck = $("#password-change-form").find(":required")
//        var valid = true;
//        $.each(fieldsToCheck, function(index, value){
//            if($(value).val()=="")
//                valid=false;
//        })
//        if(valid==false){
//            alert("Please fill all the required fields.")
//            return false;
//        }
//        else{
//            var p1 = changeObjectToFormData($("#password-change-form").serializeArray());
//            var post_data = {"password-change-info":p1}
//            $("#json-data").val(JSON.stringify(post_data));            
//            $("#password-change-form-array").submit();
//            $('.message-title').html("Password change request");            
//            $('#message-modal').modal();
//            
//            var url = "./admin/userPasswordChangeForm";
//            $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(){
//            	$.get(url, function(data) {             
//                    $("#page-content").html(data);
//                });            
//            });
//        }//end of else
//    });
   
    
    var active = "<span class='label label-success'>Activated</span>"
    var deactivated = "<span class='label label-danger'>Deactivated</span>"
        	
        
            	detailTable = $('#userListTable').DataTable({
            		"processing": true,
    				"ajax": {
    				    "url": "./user/all/detail",
    				    "type": "POST",
    				    "dataSrc": function (json) {
    				    	return json;
    				        }
    				  },

                    "columns" : [ {
                        "data" : "username"
                    }, {
                        "data" : "first-name"
                    }, {
                        "data" : "middle-name"
                    }, {
                        "data" : "last-name"
                    }, {
                    	"data" : "address" 
                    },{
                    	"data" : "designation" 
                    },{
                    	"data" : "cotact-no" 
                    },{
                    	"data" : "emergency-contact-no" 
                    },  {
                        "data" : "email-id"
                    },{
                        "data" : function(data, type, row, meta) {
                            return data["status"] == "1" ? active : deactivated;
                        },
                        "orderable" : true
                    }, {
                        "data" : function(data, type, row, meta) {
                            return '<a class="change-role center btn btn-default" href="./user/role?username=' + data["username"] + '"><i class="fa fa-users fa-fw"></i></a>';
                        },
                        "orderable" : false, "width": "10%"
                        
                    }, {
                        "data" : function(data, type, row, meta) {
                            return '<a class="change-password center btn btn-default" href="./user/password?username=' + data["username"] + '"><i class="fa fa-key fa-fw"></i></a>';
                        },
                        "orderable" : false, "width": "10%"
                        
                    }, {
                        "data" : function(data, type, row, meta) {
                            return '<a class="update-profile center btn btn-default" href="./user/profile?username=' + data["username"] + '"><i class="fa fa-user fa-fw"></i></a>';
                        },
                        "orderable" : false , "width": "10%"                 
                    } ]
                });
});	
