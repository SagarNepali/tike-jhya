function screeningNPrimaryProceedBtnClick(that) {
	// addArrayToLocalStorage("screening_n_request_post_data",
	// screening_n_request_match_data, "screening-n-match-data");
	var data = [];

	var disabledControls = $('#screening-n-request-form').find(":disabled")
			.removeAttr('disabled');
	var screening_n_request_form_data = changeObjectToFormData($(
			'#screening-n-request-form').serializeArray());
	disabledControls.attr("disabled", "disabled");

	var purpose = $("#purpose-of-screening-n").val().toUpperCase();
	if (purpose.indexOf("REMITTANCE") < 0) {
		delete screening_n_request_form_data['sender_receiver'];
	}

	var repairId = $("#repair-screening-n-request-id").val();
	if (repairId < 0) {
		delete screening_n_request_form_data['repair_screening_n_request_id'];
	}

	// getting matchboxes
	matchboxes = $("#screening-n-match-info").find("input[type=radio]");
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

		// for accuity
		var accuityName = $row.find(".name").text();
		var listId = $row.find(".list-id").text();
		var listCode = $row.find(".list-code").text();
		var originalSource = $row.find(".orginal-source").text();
		var placeOfBirth = $row.find(".place-of-birth").text();

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
				risk : risk,
				name : accuityName,
				original_source : originalSource,
				place_of_birth : placeOfBirth
			});
		}
	});

	data.push({
		"screening_n_request_data" : screening_n_request_form_data,
		"screening_n_match_data" : matchArray
	});
	addArrayToLocalStorage("screening_n_request_post_data", data[0],
			"screening_n_request_primary");

	$('#screening-n-attachment-proceed-btn').removeAttr("disabled");

	screeningNAttachmentTabClick();

	$("body").animate({
		scrollTop : "100px"
	});
}

function screeningNAttachmentProceedBtnClick(that) {
	var valid = true;
	var fieldsToCheck = $('#screening-n-request-attachments-form').find(
			":required");
	$.each(fieldsToCheck, function(index, value) {
		// console.log("Val of value: ", $(value).val())
		if ($(value).val() == "")
			valid = false;
	});
	if (valid == false) {
		$('#screening-n-request-attachments-form').find(".formSubmit").click();
		// $(that).closest('form').submit();
		return false;
	} else {
		var fileAttachments = oneToMany($(
				'#screening-n-request-attachments-form').serializeArray());
		addArrayToLocalStorage("screening_n_request_post_data",
				fileAttachments, "screening_n_request_attachments");
	}

	var totalTabs = screeningNRelatedTabArray.length;
	if (screeningNRelatedTabsAdded) {
		$('#related-tab-1x').click();
	} else {
		screeningNReviewTabClick();
		// screeningNAttachmenTabClick();
	}
	$('#screening-add-related').removeClass('disabled');
	$("body").animate({
		scrollTop : "100px"
	});
}

function collectScreeningNDataFromTabs() {
	// collecting primary customer data

	var formName = "related-n-form";
	var matchName = "related-n-match-info";
	var related = [];
	// getting related tabs data
	$.each(screeningNRelatedTabArray, function(index, idNumX) {
		if (!screeningNRelatedTabModifiedArray[idNumX]) {
			var data = [];
			console.log("Getting data for : ", idNumX)
			var disabledControls = $("#" + formName + idNumX).find(":disabled")
					.removeAttr('disabled');
			var related_n_request_form_data = changeObjectToFormData($(
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
				var originalScriptName = $row.find(".original-script-name")
						.text();
				var dateOfBirth = $row.find(".date-of-birth").text();
				var identificationNumber = $row.find(".identification-number")
						.text();

				var risk = ($row.find(".risk-value") == "undefined" ? "0"
						: $row.find(".risk-value").text());

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
				"related_n_request_data" : related_n_request_form_data,
				"related_n_match_data" : matchArray
			});

			related.push(data[0]);
		}

	});
	addArrayToLocalStorage("screening_n_request_post_data", related,
			"screening_n_request_related");
}

function screeningNReviewGenerateHtmlRev(screening_post_data) {
	var infoToRetrieve = [ 'screening_n_request_primary',
			'screening_n_request_related' ];
	console.log(screening_post_data)
	txtToDisplay = "";
	matchIndex = screening_post_data[infoToRetrieve[0]]['screening_n_request_data']['find_match_index'];
	delete screening_post_data[infoToRetrieve[0]]['screening_n_request_data']['find_match_index'];
	txtToDisplay += addReviewFields(
			screening_post_data[infoToRetrieve[0]]['screening_n_request_data'],
			"Primary Customer", "h3", "screening-request-tab");
	if (screening_post_data[infoToRetrieve[0]]['screening_n_match_data'].length > 0) {
		txtToDisplay += addReviewFieldsArray(
				screening_post_data[infoToRetrieve[0]]['screening_n_match_data'],
				"Primary customer screening match", "h4",
				"screening-request-tab");
	}
	screening_post_data[infoToRetrieve[0]]['screening_n_request_data']['find_match_index'] = matchIndex;
	txtToDisplay += '<div class="clearfix"></div><hr />';
	relatedData = screening_post_data[infoToRetrieve[1]];
	if (relatedData != undefined) {
		$
				.each(
						screeningNRelatedTabArray,
						function(index, value) {
							idNumX = value;
							if (relatedData[index] != undefined) {
								if (relatedData[index]['related_n_request_data'] != undefined) {
									matchIndex = relatedData[index]['related_n_request_data']['find_match_index'];
									delete relatedData[index]['related_n_request_data']['find_match_index'];
									txtToDisplay += addReviewFields(
											relatedData[index]['related_n_request_data'],
											relatedData[index]['related_n_request_data']['accounts_n_sub_type'],
											"h3", "related-tab-" + idNumX);
									relatedData[index]['related_n_request_data']['find_match_index'] = matchIndex;
									if (relatedData[index]['related_n_match_data'].length > 0) {
										txtToDisplay += addReviewFieldsArray(
												relatedData[index]['related_n_match_data'],
												relatedData[index]['related_n_request_data']['accounts_n_sub_type']
														+ " screening match",
												"h4", "related-tab-" + idNumX);
									}
								}
							}
						});
	}
	return txtToDisplay;
}

function screeningNAttachmentTabClick() {
	$('#screening-attachments-tab').click();
}

function screeningNReviewTabClick() {
	collectScreeningNDataFromTabs();
	var localStorageVar = 'screening_n_request_post_data';
	txtToDisplay = "";

	screening_post_data = JSON.parse(localStorage.getItem(localStorageVar));

	$("#screening-n-request-review-wrap").html("<p>Nothing to review yet!</p>");
	if (!$.isEmptyObject(screening_post_data)) {
		txtToDisplay = screeningNReviewGenerateHtmlRev(screening_post_data);
		$("#screening-n-request-review-wrap").html(txtToDisplay);
		$('<input />', {
			type : 'checkbox',
			id : 'confirm-checkbox',
			value : false
		}).appendTo($("#screening-n-request-review-wrap"));
		$(
				'<label />',
				{
					'for' : 'confirm-checkbox',
					text : "Confirm the data being submitted is correct and thoroughly reviewed."
				}).appendTo($("#screening-n-request-review-wrap"));

		$(document).off('click', '#confirm-checkbox').on(
				'click',
				'#confirm-checkbox',
				function() {
					if (this.checked) {
						$('#screening-n-request-btn').removeAttr('disabled');

					} else {
						$('#screening-n-request-btn').attr('disabled',
								'disabled');
					}
				});
	}

	$('#screening-n-request-review-tab').click();

	/*
	 * 
	 * var p1 =
	 * changeObjectToFormData($("#screening-n-request-form").serializeArray());
	 * $.each(p1, function(index, val) { $('#' + index).val(val.trim()); }); //
	 * var p2Objects = $("#screening-n-photo-form").serializeArray(); // var p2 =
	 * oneToMany(p2Objects); var p3Objects =
	 * $("#screening-n-request-attachments-form").serializeArray(); // delete
	 * p3Objects[0]; var p3 = oneToMany(p3Objects); // for match items var
	 * matchchecboxes =
	 * $("#screening-n-match-info").find("input[type=checkbox]"); var matchArray =
	 * []; $.each(matchchecboxes, function(index, val) { var name =
	 * $(val).attr("name"); var id = $(val).attr("id"); var risk =
	 * ($(val).attr("riskvalue") == "undefined" ? "0" :
	 * $(val).attr("riskvalue")); if ($(val).is(":checked")) { matchArray.push({
	 * name : name, id : id, risk : risk, match : true }); } else {
	 * matchArray.push({ name : name, id : id, risk : risk, match : false }); }
	 * }); // var post_data = {"screening-n-info":p1, "photo-info": p2, //
	 * "attachment-info":p3, "match-info":matchArray} var post_data = {
	 * "screening-n-info" : p1, "attachment-info" : p3, "match-info" :
	 * matchArray } // localStorage.setItem("screening_n_request_post_data",
	 * JSON.stringify(post_data)); $("#screening-review-tab").click(); // add
	 * checks to checkboxes before copying var TDs =
	 * $("#details-wrap").find("td"); $.each(TDs, function(index, value) { if
	 * ($(value).find("input").attr("type") == "checkbox") { if
	 * ($(value).find("input").is(":checked")) {
	 * $(value).find("input").attr("checked", "checked"); } } }) var
	 * infoToRetrieve = [ "screening-n-info", "attachment-info", "match-info" ]
	 * txtToDisplay = ""; txtToDisplay +=
	 * addReviewFields(post_data[infoToRetrieve[0]], "Screening Natural Person",
	 * "h3", "screening-request-tab") txtToDisplay += "<div class='clearfix'></div><div
	 * class='col-md-6'><h3>Match Information</h3></div><div
	 * class='col-md-6 pull-right text-right'><div class='btn btn-primary
	 * edit-buttons' data-edit='screening-request-tab'
	 * onclick='editButtonsClick(this)'>Edit</div></div><div
	 * class='clearfix'></div><div id='review-details-wrap' class='col-xs-12
	 * hover-group'>"; txtToDisplay += $("#details-wrap").html(); txtToDisplay += "</div>";
	 * 
	 * $("#screening-n-request-review-wrap").html(txtToDisplay);
	 * 
	 * var TDs = $("#review-details-wrap").find("td"); $.each(TDs,
	 * function(index, value) { if ($(value).find("input").attr("type") ==
	 * "checkbox") { if ($(value).find("input").is(":checked")) {
	 * $(value).find("input").attr("disabled", "disabled"); } else {
	 * $(value).closest("tr").remove(); } } })
	 */
}

function getRelatedKycnDataForScreening(idNumX, kycnId) {
	var result = "";
	var post_data = {
		"msg_type" : "kycn-id-detail",
		"data" : kycnId
	};
	$
			.ajax({
				url : './kycn/common/kycnGetDetailsForScreening',
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
							populateRelatedKycnDetailsForScreening(idNumX, JSON
									.parse(response.result_json_string));
						}

					}).fail(function() {
				console.log("error")
			});
}
function screeningNRequestInit(selectors) {
	screeningNRequestGlobalCount = 0;
	screeningNRequestRelatedCount = 0;
	screeningNRequestMandateCount = 0;
	screeningNRequestSignatoryCount = 0;
	screeningNRelatedTabArray = [];
	screeningNRemovedTabArray = [];
	filesArray = [];
	screeningNRelatedTabsAdded = false;

	var dataToBeSent = {};
	localStorage.setItem("screening_n_request_post_data", JSON
			.stringify(dataToBeSent));

	$(document).off('click', '#screening-review-search-btn').on('click',
			'#screening-review-search-btn', function() {
				screeningReviewSearchJsonArray();
			});

	
	$(document).off("click", ".view-screening-n-reply-detail-btn").on("click",
			".view-screening-n-reply-detail-btn", function() {
				displayScreeningNReplyDetail(this);
			});

	$(document).off("click", "#screening-add-related").on("click",
			"#screening-add-related", function() {
				screeningNAddRelated(); // screening-n-related
			});

	$(document).off("click", "#screening-n-review-btn").on("click",
			"#screening-n-review-btn", function() {
				console.log("Registering for review button!");
				screeningNReviewTabClick();
			});

	// event binding for kyc of related
	$(document).off('click', '.related-has-kyc').on(
			'click',
			'.related-has-kyc',
			function() {
				if (this.checked) {
					var thisId = $(this).attr('id');
					var length = 'related-has-kyc'.length;
					var idNumX = thisId.substr(length);
					$("#related-kyc-id-label" + idNumX).html(
							"KYC ID <span style='color: #FF0000;'>*</span>");

					$('#related-kyc-id' + idNumX).removeAttr("disabled");
					$('#related-kyc-search-btn' + idNumX)
							.removeAttr("disabled");
					$("#related-kyc-id" + idNumX).attr("required", "required");

					$("#related-request-wrap" + idNumX).find("input").attr(
							'disabled', 'disabled');
					$("#related-request-wrap" + idNumX).find("select").attr(
							'disabled', 'disabled');

				} else {
					var thisId = $(this).attr('id');
					var length = 'related-has_kyc'.length;
					var idNumX = thisId.substr(length);
					$("#related-kyc-id-label" + idNumX).html("KYC ID");

					$('#related-kyc-id' + idNumX).attr("disabled", "disabled");
					$('#related-kyc-search-btn' + idNumX).attr("disabled",
							"disabled");
					$("#related-kyc-id" + idNumX).removeAttr("required");

					$("#related-request-wrap" + idNumX).find("input")
							.removeAttr('disabled');
					$("#related-request-wrap" + idNumX).find("select")
							.removeAttr('disabled');
				}
			});

	$(document).off('click', '.related-kyc-search-btn').on('click',
			'.related-kyc-search-btn', function() {

				var thisId = $(this).attr('id');
				var length = 'related-kyc-search-btn'.length;
				var idNumX = thisId.substr(length);

				var relatedKycId = $('#related-kyc-id' + idNumX).val();

				console.log("relatedKycProvided:", relatedKycId)

				if (relatedKycId != "") {
					getRelatedKycnDataForScreening(idNumX, relatedKycId);
				}
			});

	$(document).off('click', '.find-related-n-match-btn').on('click',
			'.find-related-n-match-btn', function() {

				var thisId = $(this).attr('id');
				var length = 'find-related-n-match-btn'.length;
				var idNumX = thisId.substr(length);

				
				screeningNRequestRelatedFindMatch(this, idNumX);
			});

	// event binding for removing related
	$(document).off('click', '.remove-related')
			.on(
					'click',
					'.remove-related',
					function() {

						var thisId = $(this).attr('id');
						var length = 'remove-related'.length;
						var idNumX = thisId.substr(length);

						$('removed-related' + idNumX).prop('checked', true);
						$('#related-tab-' + idNumX).css('background-color',
								'#DEA5A7');

						$("#accounts-n-sub-type" + idNumX).attr('disabled',
								'disabled');
						$("#related-is-existing-customer" + idNumX).attr(
								'disabled', 'disabled');
						$("#find-related-n-match" + idNumX).attr('disabled',
								'disabled');

						$("#related-request-wrap" + idNumX).find("input").attr(
								'disabled', 'disabled');
						$("#related-request-wrap" + idNumX).find("select")
								.attr('disabled', 'disabled');

						$("#screening-n-related-proceed-btn" + idNumX)
								.removeAttr('disabled');

						// adding in reoved array and removing from global
						// related tab array
						if ($.inArray(idNumX, screeningNRelatedTabArray) > -1) {
							screeningNRemovedTabArray.push(idNumX);
							screeningNRelatedTabArray.splice(idNumX, 1);
						}

					});

	$(document).off('click', '#screening-n-primary-proceed-btn').on('click',
			'#screening-n-primary-proceed-btn', function() {
				screeningNPrimaryProceedBtnClick(this);
			});

	$(document).off('click', '#screening-n-attachment-proceed-btn').on('click',
			'#screening-n-attachment-proceed-btn', function() {
				screeningNAttachmentProceedBtnClick(this);
			});

	$(document).off('click', '.screening-n-related-proceed-btn').on('click',
			'.screening-n-related-proceed-btn', function() {
				screeningNRelatedProceedBtnClick(this); // related
			});

	$(document).off("click", '#screening-n-request-btn').on("click",
			'#screening-n-request-btn', function(event) {
				screeningNRequestSubmit();
			});

	$(document).off('click', "#reset-screening-n-request-form").on('click',
			"#reset-screening-n-request-form", function() {
				screeningNRequestGlobalCount = 0;
				screeningNRequestRelatedCount = 0;
				screeningNRequestMandateCount = 0;
				screeningNRequestSignatoryCount = 0;
				var url = "./screeningn/requestForm";
				$.get(url, function(data) {
					$("#page-content").html(data);
				});
				globalFireCount++;
			});
	
	$(document).off('click', "#reset-screening-swift-request-form").on('click',
            "#reset-screening-swift-request-form", function() {
                screeningNRequestGlobalCount = 0;
                screeningNRequestRelatedCount = 0;
                screeningNRequestMandateCount = 0;
                screeningNRequestSignatoryCount = 0;
                var url = "./screening/swiftForm";
                $.get(url, function(data) {
                    $("#page-content").html(data);
                });
                globalFireCount++;
            });

	/*
	 * $("#screeningnTabs").find("li>a").click(function() { $("body").animate({
	 * scrollTop : "100px" }); });
	 */

	$(document).off('click', "#screeningnTabs li a").on('click',
			"#screeningnTabs li a", function() {
				$("body").animate({
					scrollTop : "100px"
				});
			});

	$(document).off('change', '#purpose-of-screening-n').on('change',
			'#purpose-of-screening-n', function() {
				var selection = $(this).val().toUpperCase();
				if (selection.indexOf("REMITTANCE") > -1) {

					activateSenderReceiverRemittanceWrap();
					deactivateAccountTypeWrap();

				} else if (selection.indexOf("OPEN NEW ACCOUNT") > -1) {
					deactivateSenderReceiverRemittanceWrap();
					activateAccountTypeWrap();

				} else {
					deactivateSenderReceiverRemittanceWrap();
					deactivateAccountTypeWrap();
				}
			});

	$(document).off('change', '#nature-of-account').on('change',
			'#nature-of-account', function() {
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
			});
}
// end of screeningNRequestInit()

function unlockThisUsersAllScreeningRequests() {
	var post_data="";
	var unlockRequest = $.ajax({
		url : "./screeningn/unlockScreeningRequests",
		method : "POST",
		data : post_data,
		dataType : "json"
	});

	unlockRequest.done(function(response) {

	});

	unlockRequest.fail(function(jqXHR, textStatus) {
		console.log("Request failed: " + textStatus);
	});

}

function activateAccountTypeWrap() {
	$('#account-type-wrap').show();
	$('#nature-of-account').removeAttr('disabled');
	$('#scheme-desc').removeAttr('disabled');
	$('#deposit-amount').removeAttr('disabled');
	$("#nature-of-account").prop('required', true);
	$("#scheme-desc").prop('required', true);
}
function deactivateAccountTypeWrap() {
	$('#account-type-wrap').hide();
	$('#nature-of-account').attr('disabled', true);
	$('#scheme-desc').attr('disabled', true);
	$('#deposit-amount').attr('disabled', true);
	$("#nature-of-account").prop('required', false);
	$("#scheme-desc").prop('required', false);
}
function activateSenderReceiverRemittanceWrap() {
	$("#sender-receiver-wrap").show();
	$("#sender-receiver-wrap").removeAttr('disabled');
	$("input[name='sender_receiver']").attr('required', true);
}
function deactivateSenderReceiverRemittanceWrap() {
	$("#sender-receiver-wrap").hide();
	$("#sender-receiver-wrap").attr('disabled', true);
	$("input[name='sender_receiver']").attr('required', false);
}

function dynamicWrapChangesForKYCidAndCustIdChecked() {

	$(document).off("change", "#purpose-of-screening-n").on("change",
			"#purpose-of-screening-n", function() {
				var selectedItem = $("#purpose-of-screening-n").val();
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

	checkOnlyByPurposeOFScreeningValue();

}
function checkOnlyByPurposeOFScreeningValue() {
	var selectedItem = $("#purpose-of-screening-n").val();
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

function populateSchemeDescription() {
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

$(document).off('click', "#un-match-detail-btn").on(
		'click',
		"#un-match-detail-btn",
		function(e) {
			// displayScreeningNMatchDetails(this)
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='UN'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "UN Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#ofac-match-detail-btn").on(
		'click',
		"#ofac-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='ofac'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "OFAC Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#adverse-match-detail-btn").on(
		'click',
		"#adverse-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='adverse'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Adverse media Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#kycn-match-detail-btn").on(
		'click',
		"#kycn-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='kycn'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "KYCN Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#prev-screening-match-detail-btn").on(
		'click',
		"#prev-screening-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='ps'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Previous Screening Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#prev-screening-l-match-detail-btn").on(
		'click',
		"#prev-screening-l-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='previous-screening-l'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Previous Screening  Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#investigation-match-detail-btn").on(
		'click',
		"#investigation-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='investigation'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Investigation match Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
	$(document).off('click', "#accuity-match-detail-btn").on(
		'click',
		"#accuity-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./screeningn/getMatchDetails?id=" + id
					+ "&name='accuity'";
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Accuity match Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
		
		$(document).off('click', "#pep-match-detail-btn").on(
		'click',
		"#pep-match-detail-btn",
		function(e) {
			e.preventDefault();
			var $row = $(this).closest("tr");
			$.each($row, function(i, v) {
				var value = v;
				var row = $(value).closest("tr");
				console.log(row)
				id = row.find(".iD").text();
			})
			var url = "./getPepDetails?id=" + id
			$.get(url, function(data) {
				// $("#page-content").html(data);

				bootbox.dialog({
					 
					size: "large",
					message : data,
					title : "Pep Details",
					buttons : {
						success : {
							label : "OK!",
							className : "btn-primary",
						},
					}
				});
			})
		})
