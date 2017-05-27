var username;
var detailTable;
var userDetails;
$(document).ready(function() {
	
	
	// script for validation of update role form
	$(document).off('change','#user_role').on('change','#user_role', function(){
		if($(this).val()!="" && $("#role_reason").val()!="" && $("#role_confirm").is(':checked')){
			$("#btn-role-update").removeAttr("disabled");
		} else {
			$("#btn-role-update").attr("disabled","disabled");
		}
	});
	
	$(document).off('keyup','#role_reason').on('keyup','#role_reason', function(){
		if($(this).val()!="" && $("#user_role").val()!="" && $("#role_confirm").is(':checked')){
			$("#btn-role-update").removeAttr("disabled");
		} else {
			$("#btn-role-update").attr("disabled","disabled");
		}
	});
	
	$(document).off('change','#role_confirm').on('change','#role_confirm', function(){
		if($("#user_role").val()!="" && $("#role_reason").val()!="" && $(this).is(':checked')){
			$("#btn-role-update").removeAttr("disabled");
		} else {
			$("#btn-role-update").attr("disabled","disabled");
		}
	});
	// script end here for update role form
	
    $(document).off("click", ".change-password").on("click", ".change-password", function(evt) {
        evt.preventDefault();
        var url = $(this).attr("href");
        username = getURLParameter(url, "username");
        $("#passwordModal").modal("show");
        $("#password-message").html("Password empty!").css({"color":"red","float": "right"});
        $("#password-change-form")[0].reset();
    });
    
    
    //script for update of user role
    $(document).off("click", "#btn-role-update").on("click", "#btn-role-update", function(evt){
    	evt.preventDefault(); 
    	var role = $("#user_role option:selected").val();
    	var reason = $("#role_reason").val();
    	var json = {"username":username,"new_role":role,"reason":reason,"old_role":userDetails["user-role"]};
    	$.ajax({
    		url:"./admin/role/update",
    		method:"POST",
    		data:JSON.stringify(json),
    		beforeSend: function(xhr){
    			xhr.setRequestHeader("Accept","application/json");
    			xhr.setRequestHeader("Content-Type","application/json");
    		},
    	}).done(function(response){
    		$("#roleModal").modal("hide");
    		if (response.status == "success") {
    			detailTable.ajax.reload();
    			var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Success',
                    message : 'Successfully User Role Updated',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            } else {
                var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Error',
                    message : 'Please Contact To Administrator',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            }
    	}).fail(function(){
    		console.log("Server Network Error");
    	})
    })
    
    // script for update of user role ends
    
    
    $(document).off("click", ".change-role").on("click", ".change-role", function(evt) {
        evt.preventDefault();
        var url = $(this).attr("href");
        username = getURLParameter(url, "username");
        var $row = $(this).closest('tr');
		userDetails = detailTable.row( $row ).data();
        $("#roleModal").modal("show");
        $("#role-change-form")[0].reset();
    });
    
    
    $(document).off("change","#confirm").on("change","#confirm", function(){
    	if($("#confirm").is(':checked') && $("#password").val() != "" && $('#confirm-password').val() != "" && $("#confirm-password").val() == $('#password').val()){
			 $("#btn-password-update").removeAttr("disabled");

		 } else {
			 $("#btn-password-update").attr("disabled","disabled");
		 }
    });

    function getURLParameter(url, name) {
        return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [ , null ])[1];
    }

    $(document).off("click", ".update-profile").on("click", ".update-profile", function(evt) {
        evt.preventDefault();
        var url = $(this).attr("href");

        username = getURLParameter(url, "username");
        
        var $row = $(this).closest('tr');
		userDetails = detailTable.row( $row ).data();

        $.get(url, function(data) {
            $("#page-content").html(data);
        });

    });

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
       
    $("#btn-password-update").on("click", function(evt) {
        evt.preventDefault();

        if (!$("#confirm").is(':checked')) {
            alert("Confirm Update");
            return;
        }

        var password = $("#password").val();
        var json = {
            "username" : username,
            "password" : password
        };
        $.ajax({
            url : "./admin/user/passwordUpdateSubmit",
            method : "POST",
            data : JSON.stringify(json),
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
        }).done(function(response) {
            $("#passwordModal").modal("hide");
            $("#btn-password-update").attr("disabled","disabled");
            $("#password-message").html("Password empty!").css({"color":"red","float": "right"});
            if (response.status == "success") {
            	detailTable.ajax.reload();
                var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Success',
                    message : 'Successfully User Password Updated',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            } else {
                var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Error',
                    message : 'Please Contact To Administrator',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            }
        }).fail(function() {
            console.log("Server Network Error");
        });

    });

    $("#user-list").click();

    $(document).off("click", "#fetch-detail").on("click", "#fetch-detail", function() {
        $.ajax({
            url : "./user/detail",
            method : "POST",
            data : {
                username : username
            },
        }).done(function(data) {
        	var status;
        	status = data["user-status"]=="1" ? "Enabled" :"Disabled";
        	var role =data["user-role"].replace("ROLE_","").charAt(0) + data["user-role"].replace("ROLE_","").slice(1).toLowerCase();
        	$("#username").val(data["username"]);
        	
            $("#user-role option[value='"+role+"']").attr("selected","selected");
        	$("#first-name").val(data["first-name"]);
            $("#middle-name").val(data["middle-name"]);
            $("#last-name").val(data["last-name"]);
            $("#employee-id").val(data["employee-id"]);
            $("#email").val(data["email"]);
            $("#designation").val(data["designation"]);
            $("#user-status option[value='"+ status +"']").attr("selected","selected");
            $("#office-contact-no").val(data["office-contact-no"]);
            $("#mobile-contact-no").val(data["mobile-contact-no"]);
            $("#sol-id option").each(function(name, val){
        		if(data["sol-id"]==val.text.split("-")[0]){
        			$("#sol-id option[value='"+ val.text +"']").attr("selected","selected");
        			return false;
        		}
        	});
        }).fail(function() {
            console.log("Server Connection Error");
        });
    });

    $("#fetch-detail").click();

    $(document).off("click", "#update-profile-submit-btn").on('click', "#update-profile-submit-btn", function() {

        var json = changeObjectToFormData($("#update-profile-form").serializeArray());
        userDetails["designation"] = json["designation"];
        userDetails["office-contact-no"] = json["office-contact-no"];
        userDetails["mobile-contact-no"] = json["mobile-contact-no"];
        userDetails["user-status"] = json["user-status"];
        $.ajax({
            url : "./user/update",
            method : "POST",
            data : JSON.stringify(userDetails),
            beforeSend : function(xhr) {
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
            },
        }).done(function(response) {
        	$('#users-back')[0].click();
            if (response.status == "success") {
                var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Success',
                    message : 'Successfully User Profile Updated',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            } else {
                var dialog = bootbox.dialog({
                    size : "small",
                    title : 'Error',
                    message : 'Please Contact To Administrator',
                    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
                });
            }

        }).fail(function() {
            console.log("Server Connection Error");
        });

    });

    // This is for password change of user

    $('#password').on('keyup', function() {
        if ($(this).val() == "" && $('#confirm-password').val() == "") {
            $('#password-message').html("Password empty!").css('color', 'red');
            $('#btn-password-update').attr('disabled', 'disabled');
        } else if ($(this).val() == $('#confirm-password').val() && $(this).val() != "" && !$("#confirm").is(':checked')) {
            $('#password-message').html("Passwords match.").css('color', 'green');
            
        }else if ($(this).val() == $('#confirm-password').val() && $(this).val() != "" && $("#confirm").is(':checked')) {
        	 $('#password-message').html("Passwords match.").css('color', 'green');
        	$("#btn-password-update").removeAttr("disabled");
        }else {
            $('#password-message').html("Passwords do not match.").css('color', 'red');
            $('#btn-password-update').attr('disabled', 'disabled');
        }
    });
    $('#confirm-password').on('keyup', function() {
        if ($(this).val() == "" && $('#password').val() == "") {
            $('#password-message').html("Password empty!").css('color', 'red');
            $('#btn-password-update').attr('disabled', 'disabled');
        } else if ($(this).val() == $('#password').val() && !$("#confirm").is(':checked')) {
            $('#password-message').html("Passwords match.").css('color', 'green');

        } else if ($(this).val() == $('#password').val() && $("#confirm").is(':checked')) {
        	 $("#btn-password-update").removeAttr("disabled");
        	 $('#password-message').html("Passwords match.").css('color', 'green');
        } else {
            $('#password-message').html("Passwords do not match.").css('color', 'red');
            $('#btn-password-update').attr('disabled', 'disabled');
        }
    });

});