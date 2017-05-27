/**
 * 
 * @Sagar
 * 
 */
var screeningLRequestGlobalCount = 0;
var screeningLRequestRelatedCount = 0;
var screeningLRequestMandateCount = 0;
var screeningLRequestSignatoryCount = 0;
var screeningLRelatedTabArray = [];
var screeningLRemovedTabArray = [];
var screeningLRelatedTabModifiedArray = {};
var filesArray = [];
var screeningLRelatedTabsAdded = false;

// For Related Entities
var screeningLRequestRelatedEntityCount = 0;
var screeningLRelatedEntityTabArray = [];
var screeningLRemovedEntityTabArray = [];
var screeningLRelatedEntityTabModifiedArray = {};
var screeningLRelatedEntityTabsAdded = false;

function screeningLAddRelated() {
	screeningLRequestRelatedCount++;
	screeningLRelatedTabsAdded = true;
	var targetIdx = screeningLRequestRelatedCount + 'x';
	console.log("targetIdx", targetIdx)
	// screeningNRequestInit
	var relatedHtmlContent = $('#related-template').html();
	relatedHtmlContent = relatedHtmlContent.replace(new RegExp('0x"', 'g'),
			targetIdx + '"');

	$('#myTabContent').append(relatedHtmlContent);
	// bind events to new tab
	$('#related-date-of-birth' + targetIdx).daterangepicker(
			{
				singleDatePicker : true,
				showDropdowns : true,
				minDate : new Date(1900, 1, 1),
				maxDate : new Date()
			},
			function(start, end, label) {
				$('#related-date-of-birth' + targetIdx).val(
						start.format("YYYY-MM-DD"));
			});
	var tabContent = '<li role="presentation">' + '<a href="#related-content'
			+ targetIdx + '" id="related-tab-' + targetIdx
			+ '" role="tab" data-toggle="tab" aria-expanded="true">'
			+ 'Related ' + screeningLRequestRelatedCount + '</a></li>';
	$('#screeningLTabs').append(tabContent);
	screeningLRelatedTabModifiedArray[targetIdx] = true;

	// change name of tab to relevant
	$(document).off('change', '.accounts-l-sub-type-individual').on(
					'change',
					'.accounts-l-sub-type-individual',
					function() {
						var thisId = $(this).attr('id');
						var relatedString = "related-"
						var thisCustomerType = $(
								'#' + thisId + ' option:selected').text();
						var length = (relatedString + 'accounts-l-sub-type-individual').length;
						var thisTargetIdx = thisId.substr(length);
						$('#related-tab-' + thisTargetIdx).text(
								thisCustomerType);

					});

	$(document).off('change', '.track-changes' + targetIdx).on(
			'change',
			'.track-changes' + targetIdx,
			function() {
				$('#related-natural-person-proceed-btn' + targetIdx).attr(
						'disabled', 'disabled');
				$('#related-n-match-info' + targetIdx).html("");
				screeningLRelatedTabModifiedArray[targetIdx] = true;

			});

	$('#related-tab-' + targetIdx).click();
}

function screeningLAddRelatedEntity() {
	screeningLRequestRelatedEntityCount++;
	screeningLRelatedEntityTabsAdded = true;
	var targetEntityIdx = screeningLRequestRelatedEntityCount + 'x';
	console.log("targetEntityIdx", targetEntityIdx)
	// screeningNRequestInit
	var relatedHtmlContent = $('#related-l-template').html();
	relatedHtmlContent = relatedHtmlContent.replace(new RegExp('0x"', 'g'),
			targetEntityIdx + '"');

	$('#myTabContent').append(relatedHtmlContent);

	// bind events to new tab
	$('#related-date-of-birth' + targetEntityIdx).daterangepicker(
			{
				singleDatePicker : true,
				showDropdowns : true,
				minDate : new Date(1900, 1, 1),
				maxDate : new Date()
			},
			function(start, end, label) {
				$('#related-date-of-birth' + targetEntityIdx).val(
						start.format("YYYY-MM-DD"));
			});
	var tabContent = '<li role="presentation">'
			+ '<a href="#related-entity-content' + targetEntityIdx
			+ '" id="related-entity-tab-' + targetEntityIdx
			+ '" role="tab" data-toggle="tab" aria-expanded="true">'
			+ 'Related ' + screeningLRequestRelatedEntityCount + '</a></li>';
	$('#screeningLTabs').append(tabContent);

	screeningLRelatedEntityTabModifiedArray[targetEntityIdx] = true;

	// change name of tab to relevant
	$(document).off('change', '.accounts-l-sub-type-entity').on('change','.accounts-l-sub-type-entity',function() {
						var thisId = $(this).attr('id');
						var relatedString = "related-"
						var thisCustomerType = $(
								'#' + thisId + ' option:selected').text();
						var length = (relatedString + 'accounts-l-sub-type-entity').length;
						var thisTargetIdx = thisId.substr(length);
						$('#related-entity-tab-' + thisTargetIdx).text(
								thisCustomerType);
					});

	$(document).off('change', '.entity-track-changes' + targetEntityIdx).on(
			'change',
			'.entity-track-changes' + targetEntityIdx,
			function() {
				$('#screening-l-related-entity-proceed-btn' + targetEntityIdx).attr(
						'disabled', 'disabled');
				$('#related-entity-match-info' + targetEntityIdx).html("");
				screeningLRelatedEntityTabModifiedArray[targetEntityIdx] = true;

			});

	$('#related-entity-tab-' + targetEntityIdx).click();
}

$(document).off('click', '.find-related-person-match-btn').on(
		'click',
		'.find-related-person-match-btn',
		function() {
			var thisId = $(this).attr('id');
			var length = 'find-related-person-match-btn'.length;
			var idNumX = thisId.substr(length);

			$("#related-natural-person-proceed-btn" + idNumX).removeAttr(
					"disabled");
			screeningLRelatedTabModifiedArray[idNumX] = false;
			screeningNRequestRelatedFindMatch(this, idNumX);
		});

$(document).off('click', '.find-related-entity-match-btn').on(
		'click',
		'.find-related-entity-match-btn',
		function() {
			var thisId = $(this).attr('id');
			var length = 'find-related-entity-match-btn'.length;
			var idNumX = thisId.substr(length);

			$("#screening-l-related-entity-proceed-btn" + idNumX).removeAttr(
					"disabled");

			screeningLRequestRelatedEntityFindMatch(this, idNumX);
			// screeningNRequestRelatedFindMatch(this, idNumX);
		});

function screeningLRequestRelatedEntityFindMatch(that, idNumX) {
	var valid = true;
	var fieldsToCheck = $(that).closest("form").find(":required");
	$.each(fieldsToCheck, function(index, value) {
		if ($(value).val() == "")
			valid = false;
	})
	if (valid == false) {
		$(that).closest('form').find(".formSubmit").click();
		return false;
	}
	var disabledControls = $(that).closest("form").find(":disabled")
			.removeAttr('disabled');
	var data = changeObjectToFormData($(that).closest("form").serializeArray());
	disabledControls.attr('disabled', 'disabled');

	$('#screening-l-related-entity-proceed-btn' + idNumX)
			.removeAttr('disabled');
	screeningLRelatedEntityTabModifiedArray[idNumX] = false;
	var relatedString = "related-entity";
	var relatedLength = relatedString.length;
	$.each(data, function(key, value) {
		var keyLength = key.length;
		if (key.indexOf(relatedString) >= 0) {
			var normalizedKey = key.substr(relatedLength, keyLength
					- relatedLength);
			console.log("Normalized key: ", normalizedKey, "value: ", value)
			delete data[key];
			data[normalizedKey] = value;
		}
	});

	var screeningFieldsName = [ "name_of_institution", "ls_name",
			"date_of_establishment", "registration_no", "type_of_industry",
			"country_of_issue", "zone", "district", "mn_vdc", "ward_no",
			"pan_number", "find_match_index" ];

	data = filterData(data, screeningFieldsName);
	data = JSON.stringify(data);
	data = {
		"msg_type" : "screening_l_request",
		"data" : data
	}
	var request = $.ajax({
		url : './screeningLFindMatchUsingFieldsMaker',
		type : 'POST',
		dataType : 'json',
		data : data,
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		async : false
	});
	request.done(function(response) {
		screeningLRequestRelatedEntityPopulateMatchWrap(response, idNumX);
	});
	request.fail(function() {
		console.log("error")
	});
}

$(document).off('click', '.screening-l-related-entity-proceed-btn').on('click',
		'.screening-l-related-entity-proceed-btn', function() {

			relatedEntityProceedBtnClick(this);
		});

function relatedEntityProceedBtnClick(that) {

	var thisId = $(that).attr('id');
	var relatedString = "screening-l-related-entity-proceed-btn";
	var length = relatedString.length;
	var idNumX = thisId.substr(length);

	// pushing the tab id to array
	var relatedTab = idNumX;

	if (screeningLRelatedEntityTabArray.indexOf(relatedTab) < 0
			&& screeningLRemovedEntityTabArray.indexOf(relatedTab) < 0) {
		screeningLRelatedEntityTabArray.push(relatedTab);
	}

	var count = parseInt(idNumX.substr(0, idNumX.length - 1));

	var totalTabs = screeningLRelatedEntityTabArray.length;

	if (screeningLRequestRelatedEntityCount > count) {
		count = count + 1;
		console.log("going to click on tab: ", count);
		$('#related-tab-' + count + 'x').click();
	} else {
		screeningLReviewTabClick()
	}
	$("body").animate({
		scrollTop : "100px"
	});
}

function screeningLRequestRelatedEntityPopulateMatchWrap(data, idNumX) {
	var detailsVar = "screening-l-match-details";

	data = data[detailsVar]
	if (data.hasOwnProperty("Screening legal details")) {
		var PD = JSON.parse(data["Screening legal details"])[0];
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
	//$("#related_request_wrap" + idNumX).find("input").removeAttr('disabled');
	//$("#related_request_wrap" + idNumX).find("select").removeAttr('disabled');
	$("#related-entity-match-info" + idNumX)
		.html("<div class=\"col-md-12\" id=\"details-entity-wrap\">\
			<h4><b>Details:</b></h4>\
    		<div id=\"personal-wrap-entity"+ idNumX + "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Adverse Media</b></h4>\
    		<div id=\"adverse-media-wrap-entity" + idNumX + "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Domestic Risk</b></h4>\
    		<div id=\"domestic-risk-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>KYCL details</b></h4>\
    		<div id=\"KYCL-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Previous Screening</b></h4>\
    		<div id=\"previous-screening-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>UN entity details</b></h4>\
    		<div id=\"un-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
    		<div class=\"clearfix\"></div><hr />\
    		<h4><b>Country Risk</b></h4>\
		<div id=\"country-risk-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
		<div class=\"clearfix\"></div><hr />\
		<h4><b>Accuity Details</b></h4>\
		<div id=\"accuity-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
		<div class=\"clearfix\"></div><hr />\
		<h4><b>Industry Risk</b></h4>\
		<div id=\"industry-risk-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
		<div class=\"clearfix\"></div><hr />\
		<h4><b>OFAC match</b></h4>\
		<div id=\"ofac-wrap-entity"+ idNumX+ "\" style=\"overflow-x:auto\"></div>\
		<div class=\"clearfix\"></div><hr />\
		<h4><b>Hot List Details</b></h4>\
	    <div id=\"hot-list-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
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
	var hotlist = "Hot list"

	var prevScreeingDiv = "previous-screening-wrap-entity" + idNumX;
	var domesticrisksdiv = "domestic-risk-wrap-entity" + idNumX;
	var undiv = "un-wrap-entity" + idNumX;
	var kycldiv = "KYCL-wrap-entity" + idNumX;
	var adversediv = "adverse-media-wrap-entity" + idNumX;
	var accuityDiv = "accuity-wrap-entity" + idNumX;
	var hotlistDiv = "hot-list-wrap"+idNumX;
	var industryDiv = "industry-risk-wrap-entity" + idNumX;
	var ofacDiv = "ofac-wrap-entity" + idNumX;
	var countryDiv = "country-risk-wrap-entity" + idNumX;

	var accuityData = JSON.parse(data[accuity])
	$.each(accuityData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : accuityData
	}, accuityDiv, 'Accuity','',"<td><button id='accuity-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
	

	var ofacData = JSON.parse(data[ofac])
	$.each(ofacData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : ofacData
	}, ofacDiv, 'OFAC','',"<td><button id='ofac-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

	var industryData = JSON.parse(data[industry])
	$.each(industryData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : industryData
	}, industryDiv, 'Industry');

	var countryData = JSON.parse(data[country])
	$.each(countryData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : countryData
	}, countryDiv, 'Country');

	var psData = JSON.parse(data[ps])
	$.each(psData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : psData
	}, prevScreeingDiv ,'previous-screening-l'," ","<td><button id=\"prev-screening-l-match-detail-btn\"  class=\"btn btn-primary btn-xs \">Details...</button></td>", "<th>Action</th>");
	

	var domesticData = JSON.parse(data[domestic])
	$.each(domesticData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : domesticData
	}, domesticrisksdiv, 'domestic');

	var adverseData = JSON.parse(data[adverse])
	$.each(adverseData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : adverseData
	}, adversediv,'adverse'," ","<td><button id=\"adverse-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

	var kyclData = JSON.parse(data[kycl])
	$.each(kyclData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : kyclData
	}, kycldiv, 'KYCL');

	var unData = JSON.parse(data[un])
	$.each(unData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : unData
	}, undiv,'UN Entity','',"<td><button id='un-entity-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

	var hotlistData = JSON.parse(data[hotlist])
	$.each(hotlistData, function(index, item) {
		if (item.hasOwnProperty("Similarity value")) {
			delete item["Similarity value"]
		}
	});
	generateScreeningNRelatedMatchTable(idNumX, {
		data : hotlistData
	}, hotlistDiv, 'Hot list','',"<td><button id='hotlist-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

}

function relatedNaturalPersonProceedBtnClick(that) {

	var thisId = $(that).attr('id');
	var relatedString = "related-natural-person-proceed-btn";
	var length = relatedString.length;
	var idNumX = thisId.substr(length);

	// pushing the tab id to array
	var relatedTab = idNumX;
	
	if (screeningLRelatedTabArray.indexOf(relatedTab) < 0
			&& screeningLRemovedTabArray.indexOf(relatedTab) < 0) {
		screeningLRelatedTabArray.push(relatedTab);
	}

	var count = parseInt(idNumX.substr(0, idNumX.length - 1));

	var totalTabs = screeningLRelatedTabArray.length;

	if (screeningLRequestRelatedCount > count) {
		count = count + 1;
		console.log("going to click on tab: ", count);
		$('#related-tab-' + count + 'x').click();
	} else {
		screeningLReviewTabClick()
	}
	$("body").animate({
		scrollTop : "100px"
	});
}

function screeningLReviewTabClick() {

	collectRelatedEntityDataFromTabs();
	collectRelatedNaturalDataFromTabs();

	var localStorageVar = 'screening_l_request_post_data';
	txtToDisplay = "";

	screening_l_post_data = JSON.parse(localStorage.getItem(localStorageVar));

	$("#screening-l-request-review-wrap").html("<p>Nothing to review yet!</p>");
	if (!$.isEmptyObject(screening_l_post_data)) {
		txtToDisplay = screeningLReviewGenerateHtmlRev(screening_l_post_data);
		$("#screening-l-request-review-wrap").html(txtToDisplay);
		$('<input />', {
			type : 'checkbox',
			id : 'confirm-checkbox',
			value : false
		}).appendTo($("#screening-l-request-review-wrap"));
		$(
				'<label />',
				{
					'for' : 'confirm-checkbox',
					text : "Confirm the data being submitted is correct and thoroughly reviewed."
				}).appendTo($("#screening-l-request-review-wrap"));

		$(document).off('click', '#confirm-checkbox').on(
				'click',
				'#confirm-checkbox',
				function() {
					if (this.checked) {
						$('#screening-l-request-btn').removeAttr('disabled');

					} else {
						$('#screening-l-request-btn').attr('disabled',
								'disabled');
					}
				});
	}

	$('#screening-l-request-review-tab').click();
}

function screeningLReviewGenerateHtmlRev(screening_l_post_data) {
	var infoToRetrieve = [ 'screening_l_request_primary',
			'screening_l_request_related_person','screening_l_request_related_entity' ];
	console.log("Screening L post data: ", screening_l_post_data)
	txtToDisplay = "";

	matchIndex = screening_l_post_data[infoToRetrieve[0]]['screening_l_request_data']['find_match_index'];
	delete screening_l_post_data[infoToRetrieve[0]]['screening_l_request_data']['find_match_index'];
	txtToDisplay += addReviewFields(
			screening_l_post_data[infoToRetrieve[0]]['screening_l_request_data'],
			"Primary Customer", "h3", "screening-l-request-tab");
	if (screening_l_post_data[infoToRetrieve[0]]['screening_l_match_data'].length > 0) {
		txtToDisplay += addReviewFieldsArray(
				screening_l_post_data[infoToRetrieve[0]]['screening_l_match_data'],
				"Primary customer screening match", "h4",
				"screening-l-request-tab");
	}
	screening_l_post_data[infoToRetrieve[0]]['screening_l_request_data']['find_match_index'] = matchIndex;
	txtToDisplay += '<div class="clearfix"></div><hr />';
	relatedData = screening_l_post_data[infoToRetrieve[1]];
	if (relatedData != undefined) {	
		$.each(screeningLRelatedTabArray,function(index, value) {
			idNumX = value;
			if (relatedData[index] != undefined) {
				if (relatedData[index]['related_person_request_data'] != undefined) {	
					matchIndex = relatedData[index]['related_person_request_data']['find_match_index'];
					delete relatedData[index]['related_person_request_data']['find_match_index'];
					txtToDisplay += addReviewFields(relatedData[index]['related_person_request_data'],
											"Related Person - "+ relatedData[index]['related_person_request_data']['accounts_l_sub_type'],
											"h3", "related-tab-" + idNumX);
					relatedData[index]['related_person_request_data']['find_match_index'] = matchIndex;
					if (relatedData[index]['related_person_match_data'].length > 0) {
						txtToDisplay += addReviewFieldsArray(relatedData[index]['related_person_match_data'],
						relatedData[index]['related_person_request_data']['accounts_l_sub_type']+ " screening match","h4", "related-tab-" + idNumX);
					}
				}
			}
		});
	}//end of relatedPersonData
	relatedEntityData = screening_l_post_data[infoToRetrieve[2]];
	if (relatedEntityData != undefined) {
		$.each(screeningLRelatedEntityTabArray,function(index, value) {
			idNumX = value;
			if (relatedEntityData[index] != undefined) {
				if (relatedEntityData[index]['related_entity_request_data'] != undefined) {
						matchIndex = relatedEntityData[index]['related_entity_request_data']['find_match_index'];
						delete relatedEntityData[index]['related_entity_request_data']['find_match_index'];
						txtToDisplay += addReviewFields(relatedEntityData[index]['related_entity_request_data'],
											"Related Entity - "+ relatedEntityData[index]['related_entity_request_data']['accounts_l_sub_type'],
											"h3", "related-entity-tab-" + idNumX);
						relatedEntityData[index]['related_entity_request_data']['find_match_index'] = matchIndex;
						if (relatedEntityData[index]['related_entity_match_data'].length > 0) {
							txtToDisplay += addReviewFieldsArray(relatedEntityData[index]['related_entity_match_data'],
												relatedEntityData[index]['related_entity_request_data']['accounts_l_sub_type']+ " screening match","h4", "related-entity-tab-" + idNumX);
						}
				}

			}
		});
	}
	return txtToDisplay;
}

function collectRelatedNaturalDataFromTabs() {
	// collecting primary customer data

	var formName = "related-person-form";
	var matchName = "related-n-match-info";
	var related = [];

	// getting related tabs data
	$.each(screeningLRelatedTabArray, function(index, idNumX) {
	 if (!screeningLRelatedTabModifiedArray[idNumX]) {

		var data = [];
		console.log("Getting data for : ", idNumX)
		var disabledControls = $("#" + formName + idNumX).find(":disabled")
				.removeAttr('disabled');
		var related_person_request_form_data = changeObjectToFormData($(
				"#" + formName + idNumX).serializeArray());
		disabledControls.attr('disabled', 'disabled');

		// getting matchboxes
		matchboxes = $("#" + matchName + idNumX).find("input[type=radio]");
		var matchArray = [];
		$.each(matchboxes, function(index, val) {
			var $row = $(val).closest("tr");
			var name = $(val).attr("name");
			var id = $row.find(".iD").text();
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
			var identificationNumber = $row.find(".identification-number")
					.text();
			var risk = ($row.find(".risk-value") == "undefined" ? "0" : $row
					.find(".risk-value").text());

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
			"related_person_request_data" : related_person_request_form_data,
			"related_person_match_data" : matchArray
		});
		related.push(data[0]);
		}

	});
	addArrayToLocalStorage("screening_l_request_post_data", related,
			"screening_l_request_related_person");
}

function collectRelatedEntityDataFromTabs() {
	// collecting primary customer data

	var formName = "related-entity-form";
	var matchName = "related-entity-match-info";
	var related = [];

	// getting related tabs data
	$.each(screeningLRelatedEntityTabArray, function(index, idNumX) {
		if (!screeningLRelatedEntityTabModifiedArray[idNumX]) {
		var data = [];
		console.log("Getting data for : ", idNumX)
		var disabledControls = $("#" + formName + idNumX).find(":disabled")
				.removeAttr('disabled');
		var related_entity_request_form_data = changeObjectToFormData($(
				"#" + formName + idNumX).serializeArray());
		disabledControls.attr('disabled', 'disabled');

		// getting matchboxes
		matchboxes = $("#" + matchName + idNumX).find("input[type=radio]");
		var matchArray = [];
		$.each(matchboxes, function(index, val) {
			var $row = $(val).closest("tr");
			var name = $(val).attr("name");
			console.log("688. Name of match entity: ",name)
			var id = $row.find(".iD").text();
			var firstName = $row.find(".first-name").text();
			var middleName = $row.find(".middle-name").text();
			var fullName = $row.find(".full-name").text();
			var nameOfInstitution = $row.find(".name-of-insitution").text();
			var publishedDate = $row.find(".published-date").text();
			var sourceOfMedia = $row.find(".source-of-media").text();
			var location = $row.find(".location").text();
			var unListType = $row.find(".un-list-type").text();
			var originalScriptName = $row.find(".original-script-name").text();
			var country = $row.find(".country").text();

			var numericCode = $row.find(".numeric-code").text();
			var countryOfIssue = $row.find(".country-of-issue").text();
			var listCode = $row.find(".list-code").text();
			var originalSource = $row.find(".original-source").text();

			var placeOfBirth = $row.find(".place-of-birth").text();
			var address = $row.find(".address").text();
			var sdnType = $row.find(".sdn-type").text();
			var risk = ($row.find(".risk-value") == "undefined" ? "0" : $row
					.find(".risk-value").text());

			if ($(val).is(":checked")) {
				matchArray.push({
					type : name.toUpperCase(),
					id : id,
					first_name : firstName,
					middle_name : middleName,
					full_name:fullName,
					name_of_institution : nameOfInstitution,
					published_date : publishedDate,
					source_of_media : sourceOfMedia,
					location : location,
					un_list_type : unListType,
					original_script_name : originalScriptName,
					country : country,
					numeric_code : numericCode,
					country_of_issue : countryOfIssue,
					list_code : listCode,
					original_source : originalSource,
					place_of_birth : placeOfBirth,
					address : address,
					sdn_type : sdnType
				});
			}

		});
		data.push({
			"related_entity_request_data" : related_entity_request_form_data,
			"related_entity_match_data" : matchArray
		});
		related.push(data[0]);
		 }

	});
	addArrayToLocalStorage("screening_l_request_post_data", related,
			"screening_l_request_related_entity");
}

$(document).off('click',".related-person-has-cust-id").on('click',".related-person-has-cust-id",function(){
	var thisId = $(this).attr('id');
	var length = 'related-person-has-cust-id'.length;
	var idNumX = thisId.substr(length);
	$(".cbs-generated-related-person").show();
	if(this.checked){
		
		$('#related-person-cust-id' + idNumX).removeAttr("disabled");
		$('#related-person-cust-id-search-btn' + idNumX).removeAttr("disabled");
		$("#related-person-cust-id" + idNumX).attr("required", "required");
		//$("#related-person-request-wrap" + idNumX).find("input").attr('disabled', 'disabled');
		//$("#related-person-request-wrap" + idNumX).find("select").attr('disabled', 'disabled');
	}else{
		$("#related-person-cust-id-label" + idNumX).html("CUST ID");
		$('#related-person-cust-id' + idNumX).attr("disabled", "disabled");
		$('#related-person-cust-id-search-btn' + idNumX).attr("disabled",
							"disabled");
		$("#related-person-cust-id" + idNumX).removeAttr("required");
//		$("#related-person-request-wrap" + idNumX).find("input").removeAttr('disabled');
//		$("#related-person-request-wrap" + idNumX).find("select").removeAttr('disabled');
		
		$(".cbs-generated-related-person").hide();
	}
})
	
	$(document).off('click', '.related-person-cust-id-search-btn').on('click','.related-person-cust-id-search-btn', function() {

		var thisId = $(this).attr('id');
		var length = 'related-person-cust-id-search-btn'.length;
		var idNumX = thisId.substr(length);
		var relatedCustId = $('#related-person-cust-id' + idNumX).val();
		console.log("relatedKycProvided:", relatedCustId)

		if (relatedCustId != "") {
			
            var post_data = {
                    "request" : "cbs_data",
                    "cust_id" : relatedCustId,
                    "scope" : "all"
                };
            
            $.ajax({
                url : './api/rest/cbs/custInfo',
                type : 'POST',
                dataType : 'json',
                data : post_data,
                async : false
            }).success(function(response) {
            	
                cmgData = response['data']['CMG'];
                if (cmgData != undefined) {
                    //populateCustIdDetailsforScreening(cmgData);
                	console.log(cmgData)
                    populateRelatedPersonDetails(idNumX,cmgData);
                }else{
                	bootbox.alert("Information not found in CBS of following cust_id")
                }
            }).fail(function() {
            	bootbox.alert("Couldnot connect to CBS");
            });
		}
});
	



function populateRelatedPersonDetails(idNumX, data) {
    var relatedMappingInfo = {
    	"related-cbs-cust-name":"CUST_NAME",
        "related-cbs-date-of-birth" : "DATE_OF_BIRTH",
        "related-cbs-nat-id-card-num" : "NAT_ID_CARD_NUM",
        "related-cbs-cust-perm-cntry-code" : "CUST_PERM_CNTRY_CODE",
        //"related-cbs-cust-perm-addr" : "नाम",CUST_PERM_ADDR1'CUST_PERM_ADDR1'
        "related-cbs-district" : "बीचको नाम",        
        "related-cbs-cust-perm-city-code" : "CUST_PERM_CITY_CODE",
        
    };
    $.each(relatedMappingInfo, function(index, value) {
        content = data[0][value];
        if (content != "" && content != undefined) {
            //console.log("Setting value of #" + index + idNumX + " to " + content);
            $("#" + index + idNumX).val(content);
        }
    });
}

$(document).off('click',".related-entity-has-cust-id").on('click',".related-entity-has-cust-id",function(){
	var thisId = $(this).attr('id');
	var length = 'related-entity-has-cust-id'.length;
	var idNumX = thisId.substr(length);
	$(".cbs-generated-related-entity").show();
	if(this.checked){

		$('#related-entity-cust-id' + idNumX).removeAttr("disabled");
		$('#related-entity-cust-id-search-btn' + idNumX).removeAttr("disabled");
		$("#related-entity-cust-id" + idNumX).attr("required", "required");
		//$("#related-entity-request-wrap" + idNumX).find("input").attr('disabled', 'disabled');
		//$("#related-entity-request-wrap" + idNumX).find("select").attr('disabled', 'disabled');
	}else{
		$("#related-entity-cust-id-label" + idNumX).html("CUST ID");
		$('#related-entity-cust-id' + idNumX).attr("disabled", "disabled");
		$('#related-entity-cust-id-search-btn' + idNumX).attr("disabled",
							"disabled");
		$("#related-entity-cust-id" + idNumX).removeAttr("required");
		$(".cbs-generated-related-entity").hide();
	}
})
	
	$(document).off('click', '.related-entity-cust-id-search-btn').on('click','.related-entity-cust-id-search-btn', function() {

		var thisId = $(this).attr('id');
		var length = 'related-entity-cust-id-search-btn'.length;
		var idNumX = thisId.substr(length);
		var relatedEntityCustId = $('#related-entity-cust-id' + idNumX).val();
		console.log("relatedKycProvided:", relatedEntityCustId)

		if (relatedEntityCustId != "") {
			
            var post_data = {
                    "request" : "cbs_data",
                    "cust_id" : relatedEntityCustId,
                    "scope" : "all"
                };

            $.ajax({
                url : './api/rest/cbs/custInfo',
                type : 'POST',
                dataType : 'json',
                data : post_data,
                async : false
            }).success(function(response) {
                cmgData = response['data']['CMG'];
                if (cmgData != undefined) {
                	console.log(cmgData)
                    populateRelatedEntityDetails(idNumX,cmgData);
                }else{
                	bootbox.alert("Information not found in CBS of following cust_id")
                }
            }).fail(function() {
            	bootbox.alert("Couldnot connect to CBS");
            });
		}
});
	



function populateRelatedEntityDetails(idNumX, data) {
    var relatedEntityMappingInfo = {
    	"related-entity-cbs-cust-name":"CUST_NAME",
        "related-entity-cbs-date-of-birth" : "DATE_OF_BIRTH",
        "related-entity-cbs-nat-id-card-num" : "NAT_ID_CARD_NUM",
        "related-entity-cbs-cust-perm-cntry-code" : "CUST_PERM_CNTRY_CODE",
        //"related-cbs-cust-perm-addr" : "नाम",CUST_PERM_ADDR1'CUST_PERM_ADDR1'
        "related-entity-cbs-district" : "बीचको नाम",        
        "related-entity-cbs-cust-perm-city-code" : "CUST_PERM_CITY_CODE",
        
    };
    $.each(relatedEntityMappingInfo, function(index, value) {
        content = data[0][value];
        if (content != "" && content != undefined) {
            //console.log("Setting value of #" + index + idNumX + " to " + content);
            $("#" + index + idNumX).val(content);
        }
    });
}


function populateRelatedKyclDetailsForScreening(idNumX, data) {
	
    var relatedMappingInfo = {
    	"related-salutation":"Salutation",
        "related-name-of-institution" : "Name of institution",
        "related-ls-name" : "Local script name",
        "related-zone" : "State",
        "related-pan-number" : "Pan number",
        "related-date-of-establishment" : "Date of establishment",        
        "related-email-id":"Email ID",
        "related-country-of-issue":"Country",
        "related-type-of-industry":"types_of_industry",
        "related-registration-number":"Registration number",
        "related-zone":"Zone",
        "related-district":"District",
        "related-mn-vdc":"MN/VDC",
        "related-contact-no":"Phone number",
        "related-ward-no":"Ward no."
    };
    $.each(relatedMappingInfo, function(index, value) {
        content = data[0][value];
        if (content != "" && content != undefined) {
            //console.log("Setting value of #" + index + idNumX + " to " + content);
            $("#" + index + idNumX).val(content);
        }
    });
}
