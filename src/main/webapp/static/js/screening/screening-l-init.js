/**
 * @Sagar
 */
function screeningLRequestInit(){
	$(".cbs-generated-primary").hide();
	$(".cbs-generated-related-person").hide();
	$(".cbs-generated-related-entity").hide();
	
	
	screeningLRequestGlobalCount = 0;
	screeningLRequestRelatedCount = 0;
	screeningLRequestMandateCount = 0;
	screeningLRequestSignatoryCount = 0;
	screeningLRelatedTabArray = [];
	screeningLRemovedTabArray = [];
	filesArray = [];
	screeningLRelatedTabsAdded = false;

	var dataToBeSent = {};
	localStorage.setItem("screening_l_request_post_data", JSON
			.stringify(dataToBeSent));

	$(document).off('click', "#reset-screening-l-request-form").on('click',
				"#reset-screening-l-request-form", function() {
					screeningLRequestGlobalCount = 0;
					screeningLRequestRelatedCount = 0;
					screeningLRequestMandateCount = 0;
					screeningLRequestSignatoryCount = 0;
					var url = "./screeningl/requestForm";
					$.get(url, function(data) {
						$("#page-content").html(data);
					});
					globalFireCount++;
	});

	$(document).off('click', '#screening-l-primary-proceed-btn').on('click',
			'#screening-l-primary-proceed-btn', function() {
				screeningLPrimaryProceedBtnClick(this);
	});


	$(document).off('click', '#screening-l-attachment-proceed-btn').on('click',
			'#screening-l-attachment-proceed-btn', function() {
				screeningLAttachmentProceedBtnClick(this);
			});

	$(document).off("click", '#screening-l-request-btn').on("click",
			'#screening-l-request-btn', function(event) {
				screeningLRequestSubmit();
			});
	
	$(document).off("click", "#screening-l-add-related").on("click",
			"#screening-l-add-related", function() {
				screeningLAddRelated(); // screening-n-related
			});
	
	$(document).off("click", "#screening-l-add-related-entity").on("click",
			"#screening-l-add-related-entity", function() {
				screeningLAddRelatedEntity(); // screening-n-related
			});

	$(document).off('click', '.related-natural-person-proceed-btn').on('click',
			'.related-natural-person-proceed-btn', function() {
			
			relatedNaturalPersonProceedBtnClick(this);
	});
	
	$(document).off('click', '.related-has-kycn').on('click','.related-has-kycn',function() {
		
		activateRelatedPersonProperties(this);
	});
	
	$(document).off('click', '.related-has-kycl').on('click','.related-has-kycl',function() {
		
		activateRelatedEntityProperties(this);
	});
	
	$(document).off('click', '.related-kycn-search-btn').on('click','.related-kycn-search-btn', function() {

		var thisId = $(this).attr('id');
		var length = 'related-kycn-search-btn'.length;
		var idNumX = thisId.substr(length);
		var relatedKycId = $('#related-kycn-id' + idNumX).val();
		console.log("relatedKycProvided:", relatedKycId)

		if (relatedKycId != "") {
			getRelatedKycnDataForScreening(idNumX, relatedKycId);
		}
	});
	
	$(document).off('click', '.related-kycl-search-btn').on('click','.related-kycl-search-btn', function() {

		var thisId = $(this).attr('id');
		var length = 'related-kycl-search-btn'.length;
		var idNumX = thisId.substr(length);
		var relatedKycId = $('#related-kycl-id' + idNumX).val();
		console.log("relatedKycProvided:", relatedKycId)

		if (relatedKycId != "") {
			getRelatedKyclDataForScreening(idNumX, relatedKycId);
		}
	});
	$(document).off('click', '.remove-related-entity').on('click','.remove-related-entity',
			function() {

				var thisId = $(this).attr('id');
				var length = 'remove-related-entity'.length;
				var idNumX = thisId.substr(length);

				$('removed-related-entity' + idNumX).prop('checked', true);
				$('#related-entity-tab-' + idNumX).css('background-color',
						'#DEA5A7');

				$("#accounts-l-sub-type" + idNumX).attr('disabled',
						'disabled');
				$("#related-is-existing-customer" + idNumX).attr(
						'disabled', 'disabled');
				$("#find-related-entity-match-btn" + idNumX).attr('disabled',
						'disabled');

				$("#related-entity-request-wrap" + idNumX).find("input").attr(
						'disabled', 'disabled');
				$("#related-entity-request-wrap" + idNumX).find("select")
						.attr('disabled', 'disabled');

				$("#screening-l-related-entity-proceed-btn" + idNumX)
						.removeAttr('disabled');

				// adding in reoved array and removing from global
				// related tab array
				if ($.inArray(idNumX, screeningLRelatedEntityTabArray) > -1) {
					screeningLRemovedEntityTabArray.push(idNumX);
					screeningLRemovedEntityTabArray.splice(idNumX, 1);
				}

		});
	
	$(document).off('click', '.remove-related-person').on('click','.remove-related-person',
			function() {

				var thisId = $(this).attr('id');
				var length = 'remove-related-person'.length;
				var idNumX = thisId.substr(length);

				$('#remove-related-person' + idNumX).prop('checked', true);
				$('#related-tab-' + idNumX).css('background-color',
						'#DEA5A7');

				$("#accounts-l-sub-type" + idNumX).attr('disabled',
						'disabled');
				$("#related-is-existing-customer" + idNumX).attr(
						'disabled', 'disabled');
				$("#find-related-person-match-btn" + idNumX).attr('disabled',
						'disabled');

				$("#related-person-request-wrap" + idNumX).find("input").attr(
						'disabled', 'disabled');
				$("#related-person-request-wrap" + idNumX).find("select")
						.attr('disabled', 'disabled');

				$("#related-natural-person-proceed-btn" + idNumX)
						.removeAttr('disabled');

				// adding in reoved array and removing from global
				// related tab array
				if ($.inArray(idNumX, screeningLRelatedTabArray) > -1) {
					screeningLRemovedTabArray.push(idNumX);
					screeningLRemovedTabArray.splice(idNumX, 1);
				}

		});

}

function activateRelatedPersonProperties(that){

	if (that.checked) {
		var thisId = $(that).attr('id');
		var length = 'related-has-kycn'.length;
		var idNumX = thisId.substr(length);
		$("#related-kycn-id-label" + idNumX).html(
							"KYC ID <span style='color: #FF0000;'>*</span>");

		$('#related-kycn-id' + idNumX).removeAttr("disabled");
		$('#related-kycn-search-btn' + idNumX).removeAttr("disabled");
		$("#related-kycn-id" + idNumX).attr("required", "required");

		$("#related-person-request-wrap" + idNumX).find("input").attr('disabled', 'disabled');
		$("#related-person-request-wrap" + idNumX).find("select").attr('disabled', 'disabled');

	} else {
		var thisId = $(that).attr('id');
		var length = 'related-has-kycn'.length;
		var idNumX = thisId.substr(length);
		$("#related-kycn-id-label" + idNumX).html("KYC ID");
		$('#related-kycn-id' + idNumX).attr("disabled", "disabled");
		$('#related-kycn-search-btn' + idNumX).attr("disabled",
							"disabled");
		$("#related-kycn-id" + idNumX).removeAttr("required");
		$("#related-person-request-wrap" + idNumX).find("input").removeAttr('disabled');
		$("#related-person-request-wrap" + idNumX).find("select").removeAttr('disabled');
	}

}

function activateRelatedEntityProperties(that){

	if (that.checked) {
		var thisId = $(that).attr('id');
		var length = 'related-has-kycl'.length;
		var idNumX = thisId.substr(length);
		$("#related-kycl-id-label" + idNumX).html(
							"KYC ID <span style='color: #FF0000;'>*</span>");

		$('#related-kycl-id' + idNumX).removeAttr("disabled");
		$('#related-kycl-search-btn' + idNumX).removeAttr("disabled");
		$("#related-kycl-id" + idNumX).attr("required", "required");

		$("#related-entity-request-wrap" + idNumX).find("input").attr('disabled', 'disabled');
		$("#related-entity-request-wrap" + idNumX).find("select").attr('disabled', 'disabled');

	} else {
		var thisId = $(that).attr('id');
		var length = 'related-has-kycl'.length;
		var idNumX = thisId.substr(length);
		$("#related-kycl-id-label" + idNumX).html("KYC ID");
		$('#related-kycl-id' + idNumX).attr("disabled", "disabled");
		$('#related-kycl-search-btn' + idNumX).attr("disabled",
							"disabled");
		$("#related-kycl-id" + idNumX).removeAttr("required");
		$("#related-entity-request-wrap" + idNumX).find("input").removeAttr('disabled');
		$("#related-entity-request-wrap" + idNumX).find("select").removeAttr('disabled');
	}

}


function screeningLPrimaryProceedBtnClick(that) {
	var data = [];
	var disabledControls = $('#screening-l-request-form').find(":disabled")
			.removeAttr('disabled');
	var screening_l_request_form_data = changeObjectToFormData($(
			'#screening-l-request-form').serializeArray());
	disabledControls.attr("disabled", "disabled");

	var purpose = $("#purpose-of-screening-l").val().toUpperCase();
	if (purpose.indexOf("REMITTANCE") < 0) {
		delete screening_l_request_form_data['sender_receiver'];
	}

	/*
	 * REPAIR CASE TO BE ADDED LATER var repairId =
	 * $("#repair-screening-n-request-id").val(); if (repairId < 0) { delete
	 * screening_n_request_form_data['repair_screening_n_request_id']; }
	 */
	// getting matchboxes
	matchboxes = $("#screening-l-match-info").find("input[type=radio]");
	var matchArray = [];
	$.each(matchboxes, function(index, val) {
		var $row = $(val).closest("tr");
		var name = $(val).attr("name");
		var id = $(val).attr("id");
		var firstName = $row.find(".first-name").text();
		var middleName = $row.find(".middle-name").text();
		var lastName = $row.find(".last-name").text();
		var lsfName = $row.find(".नाम").text();
		var lsmName = $row.find(".बीचको-नाम").text();
		var lslName = $row.find(".थर").text();
		var gender = $row.find(".gender").text();
		var nationality = $row.find(".nationality").text();
		var designation = $row.find(".designation").text();
		var officeName = $row.find(".office-name").text();
		var secondName = $row.find(".second-name").text();
		var thirdName = $row.find(".third-name").text();
		var fourthName = $row.find(".fourth-name").text();
		var originalScriptName = $row.find(".original-script-name").text();
		var dateOfBirth = $row.find(".date-of-birth").text();
		var identificationNumber = $row.find(".identification-number").text();
		var risk = ($row.find(".risk-value") == "undefined" ? "0" : $row.find(
				".risk-value").text());

		if ($(val).is(":checked")) {
			matchArray.push({
				type : name.toUpperCase(),
				id : id,
				first_name : firstName,
				middle_name : middleName,
				last_name : lastName,
				lsf_name : lsfName,
				lsm_name : lsmName,
				lsl_name : lslName,
				gender : gender,
				nationality : nationality,
				designation : designation,
				office_name : officeName,
				second_name : secondName,
				third_name : thirdName,
				fourth_name : fourthName,
				original_script_name : originalScriptName,
				identification_number : identificationNumber,
				date_of_birth : dateOfBirth,
				risk : risk
			});
		}
	});

	data.push({
		"screening_l_request_data" : screening_l_request_form_data,
		"screening_l_match_data" : matchArray
	});
	addArrayToLocalStorage("screening_l_request_post_data", data[0],"screening_l_request_primary");

	$('#screening-l-attachment-proceed-btn').removeAttr("disabled");

	screeningLAttachmentTabClick();

	$("body").animate({
		scrollTop : "100px"
	});
}

function screeningLAttachmentProceedBtnClick(that) {
	var valid = true;
	var fieldsToCheck = $('#screening-l-request-attachments-form').find(
			":required");
	$.each(fieldsToCheck, function(index, value) {
		if ($(value).val() == "")
			valid = false;
	});
	if (valid == false) {
		$('#screening-l-request-attachments-form').find(".formSubmit").click();
		return false;
	} else {
		var fileAttachments = oneToMany($(
				'#screening-l-request-attachments-form').serializeArray());
		addArrayToLocalStorage("screening_l_request_post_data",
				fileAttachments, "screening_l_request_attachments");
	}

//	var totalTabs = screeningNRelatedTabArray.length;
//	if (screeningNRelatedTabsAdded) {
//		$('#related-tab-1x').click();
//	} else {
		screeningLReviewTabClick();
//	}
//	$('#screening-add-related').removeClass('disabled');
	$("body").animate({
		scrollTop : "100px"
	});
}

function screeningLRequestFindMatch(that){
	
	var valid = true;
    
    var fieldsToCheck = $(that).closest("form").find(":required");
    
    $.each(fieldsToCheck, function(index, value){
        if($(value).val()=="" )
            valid=false;                                    
    });
    
    if(valid==false){
        $(that).closest('form').find(".formSubmit").click(); 
        return false;
    }
    else{
        $("#screening-add-attachments").removeAttr("disabled");
        $("#screening-l-primary-proceed-btn").removeAttr("disabled");
    }
	var formData = changeObjectToFormData($("#screening-l-request-form").serializeArray());
	 $.each(formData, function(index, value) {
        $('#' + index).val(value.trim());
    });
	// Selective fields for screening. Add here if a new field is added.
	var screeningFieldsName = ["name_of_institution", "ls_name","date_of_establishment",
	        "registration_no","type_of_industry","country_of_issue", "zone", 
	        "district", "mn_vdc","ward_no","pan_number", "find_match_index"];
	
	var data = filterData(formData, screeningFieldsName);
	
	data = JSON.stringify(data);
	data = {"msg_type":"screening-request-l" , "data":data}
	$.ajax({
		url: './screeningLFindMatchUsingFieldsMaker',
		type: 'POST',
		dataType: 'json',
		data: data,
		mimeType: "application/json"
	})
	.done(function(response) {
		populateMatchWrap(response);
		$("#screening-l-primary-proceed-btn").removeAttr('disabled');
	})
	.fail(function() {
		console.log("error");
	})

$("#screening-l-request-btn").removeAttr('disabled');
$("#screening-l-primary-proceed-btn").removeAttr('disabled');
	
}

function populateMatchWrap(data){
	var detailsVar = "screening-l-match-details";
	if(data[detailsVar] == null){
		  $('.message-title').html("No records found in KYC.");
          $('#message-modal').modal();    
          var url = "./screeningl/requestForm";
            $('#message-modal').on('hidden.bs.modal', function(){
                $.get(url, function(data) {             
                    $("#page-content").html(data);
                });            
            });
            return;
	}
	data = data[detailsVar]
	if(data.hasOwnProperty("Screening legal details")){
		var PD = JSON.parse(data["Screening legal details"])[0];
		console.log("Executing populate match wrap function...");
		console.log(data);
		

		// insert matched data into form above button
	    $("#name-of-institution").val(PD["name"]);
        $("#ls-name").val(PD["ls_name"]);
        $("#date-of-establishment").val(PD["date_of_establishment"]);
        $("#registration-number").val(PD["registration_no"]);
        $("#country-of-issue").val(PD["country"]);
        $("#zone").val(PD["zone"]);
        $("#district").val(PD["district"]);
        $("#mn-vdc").val(PD["mn_vdc"]);
        $("#customer-id").val(PD["cust_id"])
	}
	$("#screening-l-match-info")
		.html("<div class=\"col-md-12\" id=\"details-wrap\">\
    		<h4><b>Details:</b></h4>\
    		<div id=\"personal-wrap\" style=\"overflow-x:auto\"></div>\
			<h4><b>UN entity details</b></h4>\
	    	<div id=\"un-wrap\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
			<h4><b>OFAC match</b></h4>\
		    <div id=\"ofac-wrap\" style=\"overflow-x:auto\"></div>\
			<div class=\"clearfix\"></div><hr />\
			<h4><b>Accuity Details</b></h4>\
		    <div id=\"accuity-wrap\" style=\"overflow-x:auto\"></div>\
		    <div class=\"clearfix\"></div><hr />\
			<h4><b>Hot List Details</b></h4>\
		    <div id=\"Hot-list-wrap\" style=\"overflow-x:auto\"></div>\
		    <div class=\"clearfix\"></div><hr />\
    		<h4><b>Adverse Media</b></h4>\
    		<div id=\"adverse-media-wrap\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Domestic Risk</b></h4>\
    		<div id=\"domestic-risk-wrap\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>KYCL details</b></h4>\
    		<div id=\"KYCL-wrap\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Previous Screening</b></h4>\
    		<div id=\"previous-screening-wrap\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
		        <h4><b>Industry Risk</b></h4>\
		<div id=\"industry-risk-wrap\" style=\"overflow-x:auto\"></div>\
		<div class=\"clearfix\"></div><hr />")
	var un = "UN entity";
    var ps = "Previous screening";
    var kycl = "KYCL details";
    var domestic = "Domestic risk";
    var adverse = "Adverse media details";
    var hotlist = "Hot list"
    	var accuity = "Accuity details"
    	var country = "Country risk"
    	var industry = "Industry risk"
    	var ofac = "Ofac Entity"
    
    var prevScreeingDiv = "previous-screening-wrap";
    var domesticrisksdiv = "domestic-risk-wrap";
    var undiv = "un-wrap";
    var kycldiv = "KYCL-wrap";
    var adversediv = "adverse-media-wrap";
    var countryriskdiv  = "country-risk-wrap";
    var hotlistDiv = "Hot-list-wrap";
	var accuityDiv = "accuity-wrap" ;
	var industryDiv = "industry-risk-wrap";
	var ofacDiv = "ofac-wrap";
	
     var ps= JSON.parse(data[ps]);
    $.each(ps, function(index, item){
       if (item.hasOwnProperty("Similarity value")){
        delete item["Similarity value"]
       }
   });
    generateScreeningMatchTable({
        data: ps
    }, prevScreeingDiv ,'previous-screening-l'," ","<td><button id=\"prev-screening-l-match-detail-btn\"  class=\"btn btn-primary btn-xs \">Details...</button></td>", "<th>Action</th>");

    var domestic = JSON.parse(data[domestic]);
    $.each(domestic, function(index, item){
       if (item.hasOwnProperty("Similarity value")){
        delete item["Similarity value"]
       }
   });
    generateScreeningMatchTable({
        data: domestic
    }, domesticrisksdiv,'domestic');

    var adverse = JSON.parse(data[adverse]);
    $.each(adverse, function(index, item){
       if (item.hasOwnProperty("Similarity value")){
        delete item["Similarity value"]
       }
   });
    generateScreeningMatchTable({
        data: adverse
    }, adversediv,'adverse'," ","<td><button id=\"adverse-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

    var kycl= JSON.parse(data[kycl]);
    $.each(kycl, function(index, item){
       if (item.hasOwnProperty("Similarity value")){
        delete item["Similarity value"]
       }
   });
    generateScreeningMatchTable({
        data: kycl
    }, kycldiv,'kycl');

    
    var un  = JSON.parse(data[un]);
    $.each(un, function(index, item){
       if (item.hasOwnProperty("Similarity value")){
        delete item["Similarity value"]
       }
   });
    generateScreeningMatchTable({
        data: un
    }, undiv,'UN Entity','',"<td><button id='un-entity-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
    
    
//    var countryData= JSON.parse(data[country]);
//    $.each(countryData, function(index, item){
//       if (item.hasOwnProperty("Similarity value")){
//        delete item["Similarity value"]
//       }
//   });
//    generateScreeningMatchTable({
//        data:countryData
//    }, countryriskdiv,'Country');
    
    var accuityData = JSON.parse(data[accuity])
	$.each(accuityData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
    generateScreeningMatchTable({
		data : accuityData
	}, accuityDiv, 'Accuity','',"<td><button id='accuity-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
    
    
    var ofacData = JSON.parse(data[ofac])
	$.each(ofacData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
    generateScreeningMatchTable({
		data : ofacData
	}, ofacDiv, 'OFAC','',"<td><button id='ofac-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

	var industryData = JSON.parse(data[industry])
	$.each(industryData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningMatchTable({
		data : industryData
	}, industryDiv, 'Industry');
    
	var hotlistData = JSON.parse(data[hotlist])
	$.each(hotlistData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningMatchTable({
		data : hotlistData
	}, hotlistDiv, 'Hot list','',"<td><button id='hotlist-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
}


	
$(document).off('click', "#screeningLTabs li a").on('click',
			"#screeningLTabs li a", function() {
				$("body").animate({
					scrollTop : "100px"
				});
			});
	

	function screeningLAttachmentTabClick() {
		$('#screening-l-attachments-tab').click();
	}

	$(document).off('change', '#purpose-of-screening-l').on('change',
			'#purpose-of-screening-l', function() {
				var selection = $(this).val().toUpperCase();
				if (selection.indexOf("REMITTANCE") > -1) {
					activateSenderReceiverRemittanceWrap(); // method re-used;
															// screening-n-init.js
					deactivateAccountTypeWrap();
				} else if (selection.indexOf("OPEN NEW ACCOUNT") > -1) {
					deactivateSenderReceiverRemittanceWrap();
					activateAccountTypeWrap();
				} else {
					deactivateSenderReceiverRemittanceWrap();
					deactivateAccountTypeWrap();
				}
			});
function screeningLDynamicWrapChangesForKYCidAndCustIdChecked() {

	$(document).off("change", "#purpose-of-screening-l").on("change",
			"#purpose-of-screening-l", function() {
				var selectedItem = $("#purpose-of-screening-l").val();
				console.log("SELECTED ITEM : ", selectedItem)
				if (selectedItem.toUpperCase() == "OPEN NEW ACCOUNT") {
					activateAccountTypeWrap();
					deactivateSenderReceiverRemittanceWrap();
				} else if (selectedItem.toUpperCase().match("REMITTANCE")) {
					deactivateAccountTypeWrap();
					activateSenderReceiverRemittanceWrap();
				} else {
					deactivateAccountTypeWrap();
					deactivateSenderReceiverRemittanceWrap();
				}
			});

	checkOnlyByPurposeOFScreeningLValue();

}
function checkOnlyByPurposeOFScreeningLValue() {
	var selectedItem = $("#purpose-of-screening-l").val();
	console.log("SELECTED ITEM VALUE : ", selectedItem)
	if (selectedItem.toUpperCase() == "OPEN NEW ACCOUNT") {
		activateAccountTypeWrap();
		deactivateSenderReceiverRemittanceWrap();
	} else if (selectedItem.toUpperCase().match("REMITTANCE")) {
		deactivateAccountTypeWrap();
		activateSenderReceiverRemittanceWrap();
	} else {
		deactivateAccountTypeWrap();
		deactivateSenderReceiverRemittanceWrap();
	}
}

$(document).off('change', '#nature-of-account').on('change',
		'#nature-of-account', function() {
		populateSchemeDescAccToNatureOfAccount();
});
	
function populateSchemeDescAccToNatureOfAccount(){
var selectedItem = $("#nature-of-account").val();
var schemeSelectors = [];
if (selectedItem.toUpperCase() == "CURRENT ACCOUNT") {
	schemeSelectors = [ "nica-current-account-type" ];
} else if (selectedItem.toUpperCase() == "FIXED DEPOSIT") {
	schemeSelectors = [ "nica-fixed-deposit-type" ];
} else if (selectedItem.toUpperCase() == "CALL DEPOSIT") {
	schemeSelectors = [ "nica-call-deposit-type" ];
} else if (selectedItem.toUpperCase() == "MARGIN ACCOUNT") {
	schemeSelectors = [ "nica-margin-account-type" ];
} else if (selectedItem.toUpperCase() == "SAVING DEPOSIT") {
	schemeSelectors = [ "nica-saving-deposit-type" ];
}
getOptionValueForId(schemeSelectors);
}

//@@
	$(document).off('click', "#un-entity-match-detail-btn").on(
		'click',
		"#un-entity-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			var id = $row.find(".iD").text();  
			populateDetailsInBootBox(id,"UN ENTITY");
		})
		
function getRelatedKyclDataForScreening(idNumX, kyclId) {
	var result = "";
	var post_data = {
		"msg_type" : "kycl-id-detail",
		"data" : kyclId
	};
	$
			.ajax({
				url : './kycl/common/kyclGetDetailsForScreening',
				type : 'POST',
				dataType : 'json',
				data : post_data,
				async : false
			})
			.success(
					function(response) {
						response = response.data;
						if (response.result == false) {
							bootbox
									.alert("No data found for the KYC ID entered. Please try again.");
						} else {
							populateRelatedKyclDetailsForScreening(idNumX, JSON
									.parse(response.result_json_string));
						}

					}).fail(function() {
				console.log("error")
			});
}
	
