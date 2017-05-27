var bfiGlobalCount = 0;
function putReviewData(data){
}
function bfiClick(that){
	var valid = true;
	var fieldsToCheck = $(that).closest("form").find(":required");	
    $.each(fieldsToCheck,function(index,value){
    	if($(value).val()==""){
    		valid = false;
    	}
    });    
    if(valid == false){
    	$(that).closest('form').find(".formSubmit").click();
    	return false;
    }
    var bfi_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    addArrayToLocalStorage("bfi_post_data", bfi_post_data,"bfi-info");
    bfiGlobalCount++;
    $("#bfi-address-tab").click();
}

function bfiAddClick(that){	
	var valid = true;
	var fieldsToCheck = $(that).closest("form").find(":required");	
    $.each(fieldsToCheck,function(index,value){
    	if($(value).val()==""){
    		valid = false;
    	}
    });    
    if(valid == false){
    	$(that).closest('form').find(".formSubmit").click();
    	return false;
    }
    var bfi_post_data = oneToMany($(that).closest("form").serializeArray());
    addArrayToLocalStorage("bfi_post_data", bfi_post_data,"bfi-address-info");
    bfiGlobalCount++;
    $("#bfi-contact-tab").click();
}

function bfiConClick(that){	
	var valid = true;
	var fieldsToCheck = $(that).closest("form").find(":required");	
    $.each(fieldsToCheck,function(index,value){
    	if($(value).val()==""){
    		valid = false;
    	}
    });    
    if(valid == false){
    	$(that).closest('form').find(".formSubmit").click();
    	return false;
    }
    var bfi_post_data = oneToMany($(that).closest("form").serializeArray());
    console.log("Contact data after serialization:")
    console.log($(that).closest("form").serializeArray());
    console.log("Contact data after one to many transforation:")
    console.log(bfi_post_data);
    addArrayToLocalStorage("bfi_post_data", bfi_post_data,"bfi-contact-info");
    bfiGlobalCount++;
    $("#bfi-email-tab").click();    
}

function bfiEmailClick(that){	
	var valid = true;
	var fieldsToCheck = $(that).closest("form").find(":required");	
    $.each(fieldsToCheck,function(index,value){
    	if($(value).val()==""){
    		valid = false;
    	}
    });    
    if(valid == false){
    	$(that).closest('form').find(".formSubmit").click();
    	return false;
    }
    var bfi_post_data_objects = $(that).closest("form").serializeArray();    
    // delete bfi_post_data_objects[""];
    var bfi_post_data = oneToMany(bfi_post_data_objects);
    
    addArrayToLocalStorage("bfi_post_data", bfi_post_data, "bfi-email-info");
    bfiGlobalCount++;
    $("#bfi-review-tab").click();
}


function bfiRevClick(){
    var infoToRetrieve = ["bfi-info", "bfi-address-info", "bfi-contact-info","bfi-email-info"]
    var txtToDisplay = "";    
    var bfi_post_data = JSON.parse(localStorage.getItem("bfi_post_data"));
    console.log("bfi_post_data:", localStorage.getItem("bfi_post_data"));
    txtToDisplay+= addReviewFields(bfi_post_data[infoToRetrieve[0]], "BFI Info", "h3", "bfi-info-tab")
    console.log("Extracting BFI info from index 0: ")
    console.log(bfi_post_data[infoToRetrieve[0]]);
    txtToDisplay+= addReviewFieldsArray(bfi_post_data[infoToRetrieve[1]], "BFI Address Info", "h3", "bfi-address-tab")
    console.log("Extracting BFI address info from index 1: ")
    console.log(bfi_post_data[infoToRetrieve[1]]);
    txtToDisplay+= addReviewFieldsArray(bfi_post_data[infoToRetrieve[2]], "BFI Contact Info", "h3", "bfi-contact-tab")
    console.log("Extracting BFI contact info from index 2: ")
    console.log(bfi_post_data[infoToRetrieve[2]]);
    txtToDisplay+= addReviewFieldsArray(bfi_post_data[infoToRetrieve[3]], "BFI Email Info", "h3", "bfi-email-tab")
    console.log("Extracting BFI email info from index 3: ")
    console.log(bfi_post_data[infoToRetrieve[3]]);
    $("#bfi-review-wrap").html(txtToDisplay);
    if(bfiGlobalCount>=4){
    	$("#bfiRevSubmit").removeAttr('disabled');
    }
}

//function for final submission after review
function bfiRevSubmit(){
	// var bfi_post_data = JSON.parse(localStorage.getItem("bfi_post_data"));
	var bfi_post_data = localStorage.getItem("bfi_post_data");	
	$("#json-data").val(bfi_post_data);
	$("#bfi-update-form-array").submit();     
    $('.message-title').html("BFI Information Update");
    $('#message-modal').modal();            
    var url = "./bfi/bank/updateForm";
    $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(){
    	$.get(url, function(data) {             
            $("#page-content").html(data);
        });            
    });
}

function initBfiConf(){
	bfiGlobalCount = 0;
	var dataToBeSent = {};
	localStorage.setItem("bfi_post_data" ,JSON.stringify(dataToBeSent));
	// manage jump to top on tab click
	$("#bfiTabs").find("li>a").click(function(){
		$("body").animate({
			scrollTop: "100px"
		})
	});

	// Define click functions
	$("#bfiNext").click(function(){
        bfiClick(this)
    })
    $("#bfiAddNext").click(function(){
        bfiAddClick(this)
    })
    $("#bfiConNext").click(function(){
        bfiConClick(this)
    })
    $("#bfiEmailNext").click(function(){
        bfiEmailClick(this)
    })
    $("#bfi-review-tab").click(function(){    	
        bfiRevClick();
    })
    $("#bfiRevSubmit").click(function(){    	
        bfiRevSubmit(this);
    })
}
