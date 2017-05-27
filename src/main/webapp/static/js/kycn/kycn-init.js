var kycnGlobalCount = 0;
var identificationCounter = 0;
var addressCounter = 0;
var relationCounter = 0;
var relatedPersonCounter = 0;
var relatedEntityCounter = 0;
var educationCounter = 0;
var involvementCounter =0;
var accountsCounter = 0;
var internalObservationCounter = 0;
var documentStatusCounter = 0;

function piClick(that) {
    var valid = true;
    var fieldsToCheck = $("#personal-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#personal-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = changeObjectToFormData($("#personal-info-form").serializeArray());

    addArrayToLocalStorage("kycn_post_data", post_data, "personal-info");
    kycnGlobalCount++;
    $("#identification-info-tab").click();
}

function idiClick(that) {
    var valid = true;
    var fieldsToCheck = $("#identification-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#identification-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#identification-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "identification-info");
    kycnGlobalCount++;
    $("#address-info-tab").click();
}

function adiClick(that) {
    var valid = true;
    var fieldsToCheck = $("#address-info-form").find(":required");
    // $.each(fieldsToCheck, function(index, value) {
    // if ($(value).val() == "")
    // valid = false;
    // })
    if (valid == false) {
        $("#address-info-form").find(".formSubmit").click();
        return false;
    }
    // var post_data =
    // changeObjectToFormData($("#address-info-form").serializeArray());
    var post_data = oneToMany($("#address-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "address-info");
    kycnGlobalCount++;
    $("#relation-info-tab").click();
}

function reiClick(that) {
    var valid = true;
    var fieldsToCheck = $("#relation-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#relation-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#relation-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "relation-info");
    kycnGlobalCount++;
    $("#related-person-info-tab").click();
}

function rePiClick(that) {
    var valid = true;
    var fieldsToCheck = $("#related-person-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#related-person-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#related-person-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "related-person-info");
    kycnGlobalCount++;
    $("#related-entity-info-tab").click();
}

function reEiClick(that) {
    var valid = true;
    var fieldsToCheck = $("#related-entity-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#related-entity-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#related-entity-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "related-entity-info");
    kycnGlobalCount++;
    $("#education-info-tab").click();
}

function ediClick(that) {
    var valid = true;
    var fieldsToCheck = $("#education-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#education-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#education-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "education-info");
    kycnGlobalCount++;
    $("#involvement-info-tab").click();
}

function inviClick(that) {
    var valid = true;
    var fieldsToCheck = $("#involvement-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#involvement-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#involvement-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "involvement-info");
    kycnGlobalCount++;
    $("#accounts-info-tab").click();
}

function aciClick(that) {
    var valid = true;
    var fieldsToCheck = $("financial-info").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    });
    if (valid == false) {
        $("#financial-info").find(".formSubmit").click();
        return false;
    }
        
    
    // getting matchboxes
    matchboxes = $("#individual-services-info").find("input[name='services-subscribed-indv[]']");
    var individual_services = [];
    
    $.each(matchboxes, function(index, matchbox){
       if(matchbox.checked){
           individual_services.push(matchbox.value)
       } 
    });
    
    matchboxes = $("#individual-services-info").find("input[name='cards-subscribed-indv[]']");
    var individual_cards = [];
    $.each(matchboxes, function(index, matchbox){
       if(matchbox.checked){
           individual_cards.push(matchbox.value)
       } 
    });
    
    var pan = $("#customer-pan").val();
    var currency = $("#customer-currency").val();
    
    var financial_data = {"customer_pan": pan, "customer_currency" : currency, 
            "individual_services_subscribed" : individual_services, "individual_cards_subscribed" : individual_cards};
    
    
    console.log("Financial_data: ", financial_data);
    
    addArrayToLocalStorage("kycn_post_data", financial_data, "financial-info");
        
    fieldsToCheck = $("#accounts-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#accounts-info-form").find(".formSubmit").click();
        return false;
    }
    
    var post_data = oneToMany($("#accounts-info-form").serializeArray());
    var accounts_services_subscribed = [];
    var accounts_cards_subscribed = [];
    post_data["accounts_services_subscribed"] = accounts_services_subscribed;
    post_data["accounts_cards_subscribed"] = accounts_cards_subscribed;
    
    addArrayToLocalStorage("kycn_post_data", post_data, "accounts-info");
    
    kycnGlobalCount++;
    $("#internal-observation-info-tab").click();
}

function inObClick(that) {
    var valid = true;
    var fieldsToCheck = $("#internal-observation-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#internal-observation-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = changeObjectToFormData($("#internal-observation-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "internal-observation-info");
    kycnGlobalCount++;
    $("#aml-info-tab").click();
}

function amlClick(that) {
    var valid = true;
    var fieldsToCheck = $("#aml-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#aml-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = changeObjectToFormData($("#aml-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "aml-info");
    kycnGlobalCount++;
    $("#document-status-info-tab").click();
}

function docStClick(that) {
    var valid = true;
    var fieldsToCheck = $("#document-status-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#document-status-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#document-status-info-form").serializeArray());
    addArrayToLocalStorage("kycn_post_data", post_data, "document-status-info");
    kycnGlobalCount++;
    $("#review-info-tab").click();
}

// function for final submission after review
function kycnSubmit() {
    post_data = JSON.parse(localStorage.getItem("kycn_post_data"));
    console.log(JSON.stringify(post_data));
    var request = $.ajax({
        url : "./api/rest/kycn/submit",
        method : "POST",
        data : {
            postData : (JSON.stringify(post_data))
        },
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    request.done(function(response) {
        console.log(response)
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
    request.fail(function(response) {
        console.log("error")
        bootbox.alert(response.errorMessage + " \n" + response.errorCode)
    });

}

function revClick() {    
    // var infoToRetrieve = [ "personal-info", "family-info", "child-info",
    // "address-info", "contact-info", "immediate-contact-info",
    // "identification-info", "education-info", "occupation-info",
    // "accounts-info", "engagements-info", "involvement-info",
    // "internal-observation-info", "other-collected-info", "small-vendor-info",
    // "comments-info" ]
    var infoToRetrieve = [ "personal-info", "identification-info", "address-info", 
        "relation-info", "related-person-info", "related-entity-info", 
        "education-info", "involvement-info", "financial-info", "accounts-info", 
        "internal-observation-info", "aml-info", "document-status-info"   ]
    txtToDisplay = "";
    post_data = JSON.parse(localStorage.getItem("kycn_post_data"));
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[0]], "Personal Info", "h3", "personal-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[1]], "Identification Info", "h3", "identification-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[2]], "Address Info", "h3", "address-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[3]], "Relation Info", "h3", "relation-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[4]], "Related Person Info", "h3", "related-person-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[5]], "Related Entity Info", "h3", "related-entity-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[6]], "Education Info", "h3", "education-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[7]], "Involvements Info", "h3", "involvement-info-tab");
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[8]], "Financial Info", "h3", "accounts-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[9]], "Accounts Info", "h3", "accounts-info-tab");
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[10]], "Internal Observation Info", "h3", "internal-observation-info-tab");
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[11]], "AML Info", "h3", "aml-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[12]], "Document Status Info", "h3", "document-status-info-tab");
    $("#kycn-review-wrap").html(txtToDisplay);
    // txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[13]],
    // "Enhanced Info", "h3", "other-collected-info-tab")
    // Prettify Bad Input
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsf Name", 'g'), "नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsm Name", 'g'), "बीचकाे&nbsp;नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsl Name", 'g'), "थर");
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class=""></label>', 'g'), '<label class="">N/A</label>');
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class="">-1</label>', 'g'), '<label class="">N/A</label>');
  
    
      $('<input />', { type : 'checkbox', id : 'confirm-checkbox', value :
      false }).appendTo($("#kycn-review-wrap")); $( '<label />', { 'for' :
      'confirm-checkbox', text : "Confirm the data being submitted is correct      and thoroughly reviewed." }).appendTo($("#kycn-review-wrap"));
      
      $(document).off('click', '#confirm-checkbox').on( 'click',
      '#confirm-checkbox', function() { if (this.checked) {
      $('#kycnSubmit').removeAttr('disabled');
      $('#kycnRefresh').removeAttr('disabled');
       } else { $('#kycnSubmit').attr('disabled', 'disabled');
      $('#kycnRefresh').attr('disabled','disabled'); } });
     
}

function ehiClick(event) {
    var poidata = {};
    var fields = [ "fn", "mn", "ln", "lsfn", "lsln", "sil1fn", "sil1mn", "sil1ln", "sil1lsfn", "sil1lsln", "sil2fn", "sil2mn", "sil2ln", "sil2lsfn", "sil2lsln", "sil3fn", "sil3mn", "sil3ln", "sil3lsfn", "sil3lsln", "sil4fn", "sil4mn", "sil4ln", "sil4lsfn", "sil4lsln", "filfn", "filmn", "filln", "fillsfn", "fillsln", "dil1fn", "dil1mn", "dil1ln", "dil1lsfn", "dil1lsln", "dil2fn", "dil2mn",
            "dil2ln", "dil2lsfn", "dil2lsln", "dil3fn", "dil3mn", "dil3ln", "dil3lsfn", "dil3lsln", "dil4fn", "dil4mn", "dil4ln", "dil4lsfn", "dil4lsln", "milfn", "milmn", "milln", "millsfn", "millsln", "sourceOfInfo", "typeOfInfo", "collectedBy", "DateOfInformation" ];
    temp = {}
    for (j = 1; j <= fields.length; j++) {
        var tempdata = $("#D0" + (120100 * 10 + j)).val();
        temp[fields[j - 1]] = tempdata;
    }
    poidata.push(temp);
    if (true) { // apply validation here
        post_data = {
            msg_type : 'enhanced-info',
            poidata : poidata
        };
        console.log(post_data);
        var request = $.ajax({
            url : host,
            method : "POST",
            data : post_data,
            dataType : "json"
        });
        request.done(function(response) {
            response = JSON.parse(response);
            console.log(response);
            $('#forms-container').load(response.redirect, function() {
            });
        });
        request.fail(function(jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
        });

    } else {
        console.log("incomplete data");
        showMessageBox("Incomplete Data", "Some required fields have been left empty. Please check your form");
    }
}

function initKYCN() {
    // Define localstorage for data to be sent
    var dataToBeSent = {};
    
    identificationCounter = 0;  //1;
    addressCounter = 0;//2;
    relationCounter = 0;
    relatedPersonCounter = 0;//1;    
    relatedEntityCounter = 0; // 1;
    educationCounter = 0;
    involvementCounter =0;
    accountsCounter = 0;
    internalObservationCounter = 0;
    documentStatusCounter = 0;
    
    
    localStorage.setItem("kycn_post_data", JSON.stringify(dataToBeSent));
    // manage jump to top on tab click
    $("#kycTabs").find("li>a").click(function() {
        $("body").animate({
            scrollTop : "100px"
        });
    });
    // Define click functions
    $(document).off('click', "#piNext").on('click', "#piNext", function() {
        piClick(this);
    });

    $(document).off('click', "#idiNext").on('click', "#idiNext", function() {
        idiClick(this);
    });

    $(document).off('click', "#adiNext").on('click', "#adiNext", function() {
        adiClick(this);
    });

    $(document).off('click', "#reiNext").on('click', "#reiNext", function() {
        reiClick(this);
    });
    
    $(document).off('click', "#rePiNext").on('click', "#rePiNext", function() {
        rePiClick(this);
    });
    
    $(document).off('click', "#reEiNext").on('click', "#reEiNext", function() {
        reEiClick(this);
    });

    $(document).off('click', "#ediNext").on('click', "#ediNext", function() {
        ediClick(this);
    });

    $(document).off('click', "#inviNext").on('click', "#inviNext", function() {
        inviClick(this);
    });

    $(document).off('click', "#aciNext").on('click', "#aciNext", function() {
        aciClick(this);
    });

    $(document).off('click', "#docStNext").on('click', "#docStNext", function() {
        docStClick(this);
    });

    $(document).off('click', "#amlNext").on('click', "#amlNext", function() {
        amlClick(this);
    });

    $(document).off('click', "#inObNext").on('click', "#inObNext", function() {
        inObClick(this);
    });

    $(document).off('click', "#review-info-tab").on('click', "#review-info-tab", function() {        
        revClick();
    });
    
    $(document).off('click', "#kyc-n-review-btn").on('click', "#kyc-n-review-btn", function() {        
        $("#review-info-tab").click();
    });
    
    
    $(document).off('click', "#kycnSubmit").on('click', "#kycnSubmit", function() {
        kycnSubmit(this);
    });
}

function unlockRequestsOfThisUserFromKycnTbls(){
//	var unlockRequest = $.ajax({
//        url: "./kycn/unlockRequestsOfThisUser",
//        method: "POST",
////        data: post_data,
//        dataType: "json"
//      });
//       
//unlockRequest.done(function( response ) {
//          
//      });
//       
//unlockRequest.fail(function( jqXHR, textStatus ) {
//        console.log( "Request failed: " + textStatus );
//      });

	$.post("./accountsn/unlockAccountsRequests");
	$.post("./kycn/unlockRequestsOfThisUser");
}