
$(document).ready(function(){ 

	
    // for ajax page requests
    $(document).off("click", ".content-links").on("click", ".content-links", function(event){
                event.preventDefault();
                var url = $(this).attr('href');
                $.get(url, function(data) {             
                    $("#page-content").html(data).find("#branch-info").validate({
                    	 rules:{
                 			branch_code:{
                 				required: true,
                 				remote:{
                 					url: "./bfi/branch/code-validate",
                 					type:'GET'
                 			      }
                 			},
                 			fiu_reference_number:{
                 				required: true,
                 				remote:{
                 					url: "./bfi/branch/reference-validate",
                 					type:'GET'
                 			      }
                 			}
                 			   },
                 			   messages:{
                 				   branch_code:{
                 						required:"Branch Code Required",
                 						remote:"Branch Code Already Exists"
                 					},
                 					fiu_reference_number:{
                         				required: "Fiu Reference Number Required",
                         				remote:"Fiu Referenece Number Already Exists"
                         			}
                 			   }
                    });
                });
            });
    
    $.ajaxSetup({
        async: false
    });
    
function getURLParameter(url, name) {
		
		return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [ , null ])[1];
	}
  
    $(document).off("click", ".branch-info-update").on("click", ".branch-info-update", function(event){
        event.preventDefault();        
        var url = $(this).attr('href');

        $.get(url, function(data) {             
            $("#page-content").html(data);
        });
        	var id = getURLParameter(url, 'id');
        	
			resetAll();

			$.ajax({
				url:"./bfi/branch/getInfo",
				method:"POST",
				async: false,
				data:{
					id:id
				}, 	
			}).done(function(data){
				$("#branch-name").val(data["branch_info"]["branch_name"]);
				$("#fiu-reference-number").val(data["branch_info"]["fiu_reference_number"]);
				$("#branch-code").val(data["branch_info"]["branch_code"]);
				$("#local-currency option[value='"+data['branch_info']['local_currency']+"']").attr("selected","selected");
				$("#branchNotes").val(data["branch_info"]["notes"]);
				$("#bf-id").val(data["branch_info"]["bfId"]);
				$("#branch-id").val(data["branch_info"]["id"]);
				var listAddress = data["list_address"];
				var listContact = data["list_contact"];
				var listEmail = data["list_email"];
				fillAddress(listAddress);
				fillContact(listContact);
				fillEmail(listEmail);
				$(".x_content").show();
				response = data;
			}).fail(function(){
				console.log("Server Connection Failed");
			});	
		
    });
    
    
});