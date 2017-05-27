var kyclGlobalCount = 0;
var kyclAddressCounter = 0;
var registrationCounter = 0;
var registrationAddressCounter = 0;
var auditCounter = 0;
var businessCounter = 0;
var landlordCounter = 0;
var relatedPersonLegalCounter = 0;
var relatedEntityLegalCounter = 0;
var complianceCounter = 0;
var accountsLegalCounter = 0;
var documentStatusLegalCounter = 0;


function initKYCL() {
    // Define localstorage for data to be sent
    var dataToBeSent = {};
    
     kyclGlobalCount = 0;
     kyclAddressCounter = 0;
     registrationCounter = 0;
     registrationAddressCounter = 0;
     auditCounter = 0;
     businessCounter = 0;
     landlordCounter = 0;
     relatedPersonLegalCounter = 0;
     relatedEntityLegalCounter = 0;
     complianceCounter = 0;
     accountsLegalCounter = 0;
     documentStatusLegalCounter = 0;
    
    
    localStorage.setItem("kycl_post_data", JSON.stringify(dataToBeSent));
    // manage jump to top on tab click
    $("#kyclTabs").find("li>a").click(function() {
        $("body").animate({
            scrollTop : "100px"
        });
    });
    // Define click functions
    $(document).off('click', "#kyclNext").on('click', "#kyclNext", function() {
    	kyclClick(this);
    });

    $(document).off('click', "#addressNext").on('click', "#addressNext", function() {
        addressLegalClick(this)
    });

    $(document).off('click', "#regdNext").on('click', "#regdNext", function() {
    	registrationClick(this);
    });

    $(document).off('click', "#regdAddNext").on('click', "#regdAddNext", function() {
        registrationAddressClick(this);
    });
    
    $(document).off('click', "#auditNext").on('click', "#auditNext", function() {
    	auditClick(this);
    });
    
    $(document).off('click', "#businessNext").on('click', "#businessNext", function() {
    	businessClick(this);
    });

    $(document).off('click', "#landlordNext").on('click', "#landlordNext", function() {
    	landlordClick(this);
    });

    $(document).off('click', "#relatedPersonNext").on('click', "#relatedPersonNext", function() {
    	relatedPersonLegalClick(this);
    });

    $(document).off('click', "#relatedEntityNext").on('click', "#relatedEntityNext", function() {
    	relatedEntityLegalClick(this);
    });
    
    $(document).off('click', "#complianceNext").on('click', "#complianceNext", function() {
    	complianceClick(this);
    });
    
    $(document).off('click', "#accLegalNext").on('click', "#accLegalNext", function() {
    	accountLegalClick(this);
    });

    $(document).off('click', "#docStLegalNext").on('click', "#docStLegalNext", function() {
        documentStatusLegalClick(this);
    });

    $(document).off('click', "#review-info-tab").on('click', "#review-info-tab", function() {        
        kyclRevClick();
    });
    
    $(document).off('click', "#kyc-l-review-btn").on('click', "#kyc-l-review-btn", function() {        
        $("#review-info-tab").click();
    });
    
    
    $(document).off('click', "#kyclSubmit").on('click', "#kyclSubmit", function() {
        kyclSubmit(this);
    });
}


function kyclClick(that) {
    var valid = true;
    var fieldsToCheck = $("#kycl-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#kycl-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = changeObjectToFormData($("#kycl-info-form").serializeArray());

    addArrayToLocalStorage("kycl_post_data", post_data, "kycl-info");
    kyclGlobalCount++;
    $("#address-info-tab").click();
}

function addressLegalClick(that) {
    var valid = true;
    var fieldsToCheck = $("#address-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#address-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#address-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "address-info");
    kyclAddressCounter++;
    kyclGlobalCount++;
    $("#registration-info-tab").click();
}

function registrationClick(that) {
    var valid = true;
    var fieldsToCheck = $("#registration-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#registration-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#registration-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "registration-info");
    registrationCounter++;
    kyclGlobalCount++;
    $("#registration-address-info-tab").click();
}

function registrationAddressClick(that) {
    var valid = true;
    var fieldsToCheck = $("#registration-address-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#registration-address-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#registration-address-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "registration-address-info");
    registrationAddressCounter++;
    kyclGlobalCount++;
    $("#audit-info-tab").click();
}

function auditClick(that) {
    var valid = true;
    var fieldsToCheck = $("#audit-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#audit-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#audit-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "audit-info");
    auditCounter++;
    kyclGlobalCount++;
    $("#business-info-tab").click();
}

function businessClick(that) {
    var valid = true;
    var fieldsToCheck = $("#business-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#business-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#business-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "business-info");
    businessCounter++;
    kyclGlobalCount++;
    $("#landlord-info-tab").click();
}

function landlordClick(that) {
    var valid = true;
    var fieldsToCheck = $("#landlord-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#landlord-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = oneToMany($("#landlord-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "landlord-info");
    landlordCounter++;
    kyclGlobalCount++;
    $("#related-person-info-tab").click();
}


function relatedPersonLegalClick(that) {
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
    addArrayToLocalStorage("kycl_post_data", post_data, "related-person-info");
    relatedPersonLegalCounter++;
    kyclGlobalCount++;
    $("#related-entity-info-tab").click();
}

function relatedEntityLegalClick(that) {
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
    addArrayToLocalStorage("kycl_post_data", post_data, "related-entity-info");
    relatedEntityLegalCounter++;
    kyclGlobalCount++;
    $("#compliance-info-tab").click();
}

function complianceClick(that) {
    var valid = true;
    var fieldsToCheck = $("#compliance-info-form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "")
            valid = false;
    })
    if (valid == false) {
        $("#compliance-info-form").find(".formSubmit").click();
        return false;
    }
    var post_data = changeObjectToFormData($("#compliance-info-form").serializeArray());
    addArrayToLocalStorage("kycl_post_data", post_data, "compliance-info");
    complianceCounter++;
    kyclGlobalCount++;
    $("#accounts-info-tab").click();
}

function accountLegalClick(that) {
    var valid = true;
    var fieldsToCheck = $("#financial-info").find(":required");
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
    
    addArrayToLocalStorage("kycl_post_data", financial_data, "financial-info");
        
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
    
    addArrayToLocalStorage("kycl_post_data", post_data, "accounts-info");
    
    accountsLegalCounter++;
    kyclGlobalCount++;
    $("#document-status-info-tab").click();
}

function documentStatusLegalClick(that) {
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
    addArrayToLocalStorage("kycl_post_data", post_data, "document-status-info");
    documentStatusLegalCounter++;
    kyclGlobalCount++;
    $("#review-info-tab").click();
}



function kyclRevClick() {    
    var infoToRetrieve = [ "kycl-info", "address-info", "registration-info", 
        "registration-address-info","audit-info","business-info", "landlord-info", 
        "related-person-info", "related-entity-info", 
        "compliance-info", "financial-info", "accounts-info", 
        "document-status-info"]
    txtToDisplay = "";
    post_data = JSON.parse(localStorage.getItem("kycl_post_data"));
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[0]], "Kycl Info", "h3", "kycl-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[1]], "Address Info", "h3", "address-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[2]], "Registration Info", "h3", "registration-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[3]], "Registration Address Info", "h3", "registration-address-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[4]], "Audit Info", "h3", "audit-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[5]], "Business Info", "h3", "business-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[6]], "Landlord Info", "h3", "landlord-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[7]], "Related Person Info", "h3", "related-person-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[8]], "Related Entity Info", "h3", "related-entity-info-tab");
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[9]], "Compliance Info", "h3", "compliance-info-tab");
    txtToDisplay += addReviewFields(post_data[infoToRetrieve[10]], "Financial Info", "h3", "accounts-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[11]], "Accounts Info", "h3", "accounts-info-tab");
    txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[12]], "Document Status Info", "h3", "document-status-info-tab");
    $("#kycl-review-wrap").html(txtToDisplay);
    // txtToDisplay += addReviewFieldsArray(post_data[infoToRetrieve[13]],
    // "Enhanced Info", "h3", "other-collected-info-tab")
    // Prettify Bad Input
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsf Name", 'g'), "नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsm Name", 'g'), "बीचकाे&nbsp;नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsl Name", 'g'), "थर");
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class=""></label>', 'g'), '<label class="">N/A</label>');
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class="">-1</label>', 'g'), '<label class="">N/A</label>');
  
    
      $('<input />', { type : 'checkbox', id : 'confirm-checkbox', value :
      false }).appendTo($("#kycl-review-wrap")); $( '<label />', { 'for' :
      'confirm-checkbox', text : "Confirm the data being submitted is correct and thoroughly reviewed." }).appendTo($("#kycl-review-wrap"));
      
      $(document).off('click', '#confirm-checkbox').on( 'click',
      '#confirm-checkbox', function() { if (this.checked) {
      $('#kyclSubmit').removeAttr('disabled');
      $('#kyclRefreshSubmit').removeAttr('disabled');
       } else { $('#kyclSubmit').attr('disabled', 'disabled');
      $('#kyclRefreshSubmit').attr('disabled','disabled'); } });
     
}

$(document).off('click', "#kyclRefreshSubmit").on('click', "#kyclRefreshSubmit", function() {
    kyclRefreshSubmit(this);
});

function unlockRequestsOfThisUserFromKyclTbls(){
//	var unlockRequest = $.ajax({
//        url: "./kycl/unlockRequestsOfThisUser",
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

	$.post("./accountsl/unlockRequestsOfThisUser");
	$.post("./kycl/unlockRequestsOfThisUser");
	$.post("./screeningl/unlockRequestsOfThisUser");
	
	
}
