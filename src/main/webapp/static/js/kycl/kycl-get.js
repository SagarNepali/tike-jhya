function loadCbsDetailsForKycl(cust_id) {
	if (cust_id == null) {
		var url = "./accounts/kycReviewListForm";
		$.get(url, function(data) {
			$("#page-content").html(data);
		});
		return false;
	} else {
		// cust_id = cust_id.replace(/\s+$/, '');

		var post_data = {
			"request" : "cbs_data",
			"cust_id" : cust_id,
			"scope" : "all"
		};
		var cbsDataRequest = $.ajax({
			url : "./api/rest/cbs/custInfo",
			method : "POST",
			data : post_data,
			dataType : "json",
			async : false
		});
		cbsDataRequest.done(function(response) {
			console.log(response)
			if (response.data.CMG.length > 0) {
				updateKyclCbsFields(response.data);
			} else {
				bootbox.alert("No data found in CBS");
			}
		});
		cbsDataRequest.fail(function() {
			bootbox.alert("Couldnot connect to CBS");
		})

	}
}
function updateKyclCbsFields(data) {
    cmgData = data.CMG;
    var cmgMappingInfo = {
            "cbs-primary-sol-id":"PRIMARY_SOL_ID",
            "cbs-entity-cre-flg":"ENTITY_CRE_FLG",
            "cbs-cust-id":"CUST_ID",
            "cbs-cust-title-code":"CUST_TITLE_CODE",
            "cbs-cust-name":"CUST_NAME",
            "cbs-cust-first-name":"CUST_FIRST_NAME",
            "cbs-cust-middle-name":"CUST_MIDDLE_NAME",
            "cbs-cust-last-name":"CUST_LAST_NAME",
            "cbs-nat-lang-title-code":"NAT_LANG_TITLE_CODE",
            "cbs-native-lang-name":"NATIVE_LANG_NAME",
            "cbs-cust-short-name":"CUST_SHORT_NAME",
            "cbs-cust-sex":"CUST_SEX",
            "cbs-date-of-birth":"DATE_OF_BIRTH",
            "cbs-cust-minor-flg":"CUST_MINOR_FLG",
            "cbs-cust-marital-status":"CUST_MARITAL_STATUS",
            
            "cbs-cust-type-code":"CUST_TYPE_CODE",
            "cbs-cust-grp":"CUST_GRP",
            "cbs-cust-const":"CUST_CONST",
            "cbs-cust-commu-code":"CUST_COMMU_CODE",
            "cbs-cust-caste-code":"CUST_CASTE_CODE",
            "cbs-cust-emp-id":"CUST_EMP_ID",
            "cbs-cust-stat-code":"CUST_STAT_CODE",
            "cbs-cust-nre-flg":"CUST_NRE_FLG",
            "cbs-cust-card-hold-flg":"CUST_CARD_HOLD_FLG",
            "cbs-cust-opn-date":"CUST_OPN_DATE",
            "cbs-rcre-user-id":"RCRE_USER_ID",
            
            "cbs-nat-id-card-num1x":"NAT_ID_CARD_NUM",
            "cbs-psprt-num1x":"PSPRT_NUM",
            
            "cbs-cust-perm-cntry-code1x":"CUST_PERM_CNTRY_CODE",        
            "cbs-cust-perm-state-code1x":"CUST_PERM_STATE_CODE",        
            "cbs-cust-perm-city-code1x":"CUST_PERM_CITY_CODE",
            "cbs-cust-perm-pin-code1x":"CUST_PERM_PIN_CODE",
            "cbs-cust-perm-phone-num1x":"CUST_PERM_PHONE_NUM",
            "cbs-cust-perm-telex-num1x":"CUST_PERM_TELEX_NUM",
            "cbs-cust-perm-email-id1x":"CUST_PERM_EMAIL_ID",
            
            "cbs-cust-perm-cntry-code2x":"CUST_COMU_CNTRY_CODE",
            "cbs-cust-perm-state-code2X":"CUST_COMU_STATE_CODE",
            "cbs-cust-perm-city-code2x":"CUST_COMU_CITY_CODE",
            "cbs-cust-perm-pin-code2x":"CUST_COMU_PIN_CODE",
            "cbs-cust-perm-phone-num2x":"CUST_COMU_PHONE_NUM_1",
            
            "cbs-related-entity-city-code1x":"CUST_EMP_CITY_CODE",
            "cbs-related-entity-phone-num2x":"CUST_EMP_PHONE_NUM_2",
            "cbs-related-entity-phone-num1x":"CUST_EMP_PHONE_NUM_1",
            "cbs-related-entity-email-id1x":"CUST_EMP_EMAIL_ID",
            
            "cbs-related-person-code1x":"CUST_INTROD_STAT_CODE",
            "cbs-related-person-cust-id1x":"CUST_INTROD_CUST_ID",            
            "cbs-related-person-title-code1x":"INTROD_TITLE_CODE",
            "cbs-related-person-name1x":"CUST_INTROD_NAME",            
            
            "cbs-crncy-code":"CRNCY_CODE",            
            
            "cbs-cust-occp-code":"CUST_OCCP_CODE",            
            
            "cbs-cust-rating-code":"CUST_RATING_CODE",
            "cbs-cust-mgr-opin":"CUST_MGR_OPIN",
            
            "cbs-free-text-10":"FREE_TEXT_10",
            "cbs-free-text-11":"FREE_TEXT_11",        
            "cbs-free-text-12":"FREE_TEXT_12"                  
    };
    populateCbsFields(cmgMappingInfo, cmgData[0]);
// populateCbsFieldsArray(cmgMappingInfo, cmgData[0], "single-id-wrap",
// "Identification", "identification-wrap");
    var addr1 = cmgData[0]['CUST_PERM_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_PERM_ADDR1'];
    var addr2 = cmgData[0]['CUST_PERM_ADDR2'] == "N/A" ? "" : ", " + cmgData[0]['CUST_PERM_ADDR2']
    var addr3 = cmgData[0]['CUST_COMU_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_COMU_ADDR1'];
    var addr4 = cmgData[0]['CUST_COMU_ADDR2'] == "N/A" ? "" : cmgData[0]['CUST_COMU_ADDR2'];
    var addr5 = cmgData[0]['CUST_EMP_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_EMP_ADDR1'];
    var addr6 = cmgData[0]['CUST_EMP_ADDR2'] == "N/A" ? "" : cmgData[0]['CUST_EMP_ADDR2'];
    
    
    $('#cbs-cust-perm-addr1x').val(addr1 + addr2);
    $('#cbs-cust-perm-addr2x').val(addr3 + addr4);
    $('#cbs-related-entity-district1x').val(addr5 + addr6);    
   
    gamData = data.GAM;
    var gamMappingInfo = {
            "cbs-acid":"ACID",
            "account-id":"ACID",
            
            "cbs-foracid":"FORACID",
            "for-account-id":"FORACID",
            
            "cbs-acct-crncy-code":"ACCT_CRNCY_CODE",
            "currency-of-account":"ACCT_CRNCY_CODE",
    
            "cbs-acct-num":"ACCT_NUM",
            "account-no":"ACCT_NUM",
            
            "cbs-acct-name":"ACCT_NAME",
            "account-name":"ACCT_NAME",
            
            "cbs-acct-short-name":"ACCT_SHORT_NAME",
            "account-short-name":"ACCT_SHORT_NAME",
            
            "cbs-acct-ownership":"ACCT_OWNERSHIP",
            "account-ownership":"ACCT_OWNERSHIP",
            
            "cbs-schm-type":"SCHM_TYPE",
            "scheme-type":"SCHM_TYPE",
            
            "cbs-schm-code":"SCHM_CODE",
            "scheme-code":"SCHM_CODE",
            
            "cbs-gl-sub-head-code":"GL_SUB_HEAD_CODE",
            "gl-sub-head-code":"GL_SUB_HEAD_CODE",                

            "cbs-product-group":"PRODUCT_GROUP",
            "product-group":"PRODUCT_GROUP",
            
            "cbs-last-tran-date":"LAST_TRAN_DATE",
            
            "cbs-acct-opn-date":"ACCT_OPN_DATE",
            "cbs-dr-bal-lim":"DR_BAL_LIM",
            "cbs-ant":"ANT",
            "cbs-adct":"ADCT",
            "cbs-cust-id":"CUST_ID",
            "cbs-aas":"AAS",            
            "cbs-emp-id":"EMP_ID"            
        };
    
    
    var aasMappingInfo = {
            "cbs-signatory-reltn-code":"CUST_RELTN_CODE",
            "cbs-signatory-cust-id":"CUST_ID"                
            /*
			 * "cbs-schm-type":"SCHM_TYPE", "cbs-stmt-cust-id":"STMT_CUST_ID",
			 * "cbs-end-date":"END_DATE", "cbs-acid":"ACID",
			 * "cbs-start-date":"START_DATE"
			 */
    };
    
    
//    populateCbsFieldsArrayGam(gamMappingInfo, gamData, "single-account-wrap", 
//            "Account", "accounts-wrap", "accountsCounter", 
//            "single-nomination-info", "single-signatory-info", aasMappingInfo);
    // populateCbsFields(gamMappingInfo, gamData, )
    
    populateCbsFieldsArray(gamMappingInfo, gamData, "single-account-wrap", "accounts-wrap")
    
   
    
    var adctMappingInfo = {
            "cbs-free-text-10":"FREE_TEXT_10",
            "cbs-free-text-2":"FREE_TEXT_2",
            "cbs-free-text-8":"FREE_TEXT_8",
            "cbs-free-text-9":"FREE_TEXT_9",
            "cbs-document-code":"DOCUMENT_CODE",
            "cbs-free-text-3":"FREE_TEXT_3",
            "cbs-free-text-1":"FREE_TEXT_1",
            "cbs-free-text-6":"FREE_TEXT_6",
            "cbs-free-text-7":"FREE_TEXT_7",
            "cbs-free-text-4":"FREE_TEXT_4",
            "cbs-free-text-5":"FREE_TEXT_5"
    };
    
    var antMappingInfo = {
            "cbs-nom-name":"NOM_NAME",
            
            "cbs-minor-guard-code":"MINOR_GUARD_CODE",
            "cbs-nom-city-code":"NOM_CITY_CODE",
            "cbs-nom-guard-city-code":"NOM_GUARD_CITY_CODE",
            "cbs-nom-guard-name":"NOM_GUARD_NAME",
            "cbs-nom-guard-pin-code":"NOM_GUARD_PIN_CODE",
            "cbs-nom-guard-addr2":"NOM_GUARD_ADDR2",
            "cbs-nom-date-of-birth":"NOM_DATE_OF_BIRTH",
            "cbs-nom-cntry-code":"NOM_CNTRY_CODE",
            "cbs-nom-pin-code":"NOM_PIN_CODE",
            "cbs-nom-guard-addr1":"NOM_GUARD_ADDR1",
            "cbs-nom-guard-state-code":"NOM_GUARD_STATE_CODE",
            "cbs-nom-reg-num":"NOM_REG_NUM",
            "cbs-nom-reltn-code":"NOM_RELTN_CODE",
                      
            "cbs-nom-addr1":"NOM_ADDR1",
            "cbs-nom-guard-cntry-code":"NOM_GUARD_CNTRY_CODE",
            "cbs-nom-state-code":"NOM_STATE_CODE",
            "cbs-nom-addr2":"NOM_ADDR2"
    };
    
    // translating
    var translateDataInfo = [
        {column:"ENTITY_CRE_FLG", id:"verified", type:"text", translation_required:"false"},
        {column:"CUST_TITLE_CODE", id:"salutation", type:"select", translation_required:"true"}
    ];
    
    var today = new Date();
    var dob = new Date(cmgData[0]['Date of birth']);
    if (!isNaN(dob)) {
        var ageGap = new Date(today - dob);
        var age = ageGap.getFullYear() - 1970;
        $('#age').val(age);
    }

    // CBS Generated Address
    var fieldsToAdd = "";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Permanent address1"] + "' readonly>";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Permanent address2"] + "' readonly>";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Comu address1"] + "' readonly>";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Comu address2"] + "' readonly>";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Employer address 1"] + "' readonly>";
    fieldsToAdd += "<input type='text' class='col-md-6' name='cbs-generated-address[]' value='" + cmgData[0]["Employer address 2"] + "' readonly>";

    fieldsToAdd += "<div class='clearfix'></div><hr />";
    $("#CBS-generated-address").append(fieldsToAdd);
    gamdata = data.gam;
    var i = 1;
    var gamMapping = {
        "" : "Customer ID"
    }
    $.each(gamdata, function(key, account) {
        if ($("#account-number" + i).length == 0) {
            $("#Add-Another-Account").click();
        }
        aasData = account["aas"];
        adctData = account["adct"];
        antData = account["ant"];
        delete account["aas"];
        delete account["adct"];
        delete account["ant"];
        $("#account-number" + i).val(account["Account number"]);
        $("#currency-of-account" + i).val(account["Account currency code"]);
        var fieldsToAdd = "<h4>Accounts detail</h4><br>";
        $.each(account, function(key, value) {

            fieldsToAdd += '<div class="col-md-4 item form-group">\
							<label class="control-label col-md-3">' + key + ':</label>\
							<div class="col-md-8">\
								<input class="form-control col-md-7" readonly="readonly" value="' + value + '" type="text">\
							</div>\
						</div>';
            // })

        });
        
        /*
        fieldsToAdd += "<div class='clearfix'></div><h4>Account signatories detail</h4><br>";
        $.each(aasData, function(k, val) {
            var i = 1;
            $.each(val, function(key, value) {
                if (value != "N/A") {
                    fieldsToAdd += '<div class="col-md-4 item form-group">\
								<label class="control-label col-md-3">' + key + ':</label>\
								<div class="col-md-8">\
									<input class="form-control col-md-7" readonly="readonly" value="' + value + '" type="text">\
								</div>\
							</div>';
                    if (i++ % 3 == 0) {
                        fieldsToAdd += "<div class='clearfix'></div>";
                    }
                }
            })
            fieldsToAdd += "<div class='clearfix'></div><hr>"
        });
        fieldsToAdd += "<div class='clearfix'></div><h4>Account documents detail</h4><br>";
        $.each(adctData, function(k, val) {
            var i = 1;
            $.each(val, function(key, value) {
                if (value != "N/A") {
                    fieldsToAdd += '<div class="col-md-4 item form-group">\
								<label class="control-label col-md-3">' + key + ':</label>\
								<div class="col-md-8">\
									<input class="form-control col-md-7" readonly="readonly" value="' + value + '" type="text">\
								</div>\
							</div>';
                    if (i++ % 3 == 0) {
                        fieldsToAdd += "<div class='clearfix'></div>";
                    }
                }

            })
            fieldsToAdd += "<div class='clearfix'></div><hr>"
        });
        fieldsToAdd += "<div class='clearfix'></div><h4>Account nomination detail</h4><br>";
        $.each(antData, function(k, val) {
            var i = 1;
            $.each(val, function(key, value) {
                if (value != "N/A") {
                    fieldsToAdd += '<div class="col-md-4 item form-group">\
								<label class="control-label col-md-3">' + key + ':</label>\
								<div class="col-md-8">\
									<input class="form-control col-md-7" readonly="readonly" value="' + value + '" type="text">\
								</div>\
							</div>';
                    if (i++ % 3 == 0) {
                        fieldsToAdd += "<div class='clearfix'></div>";
                    }
                }

            })
            fieldsToAdd += "<div class='clearfix'></div><hr>"
        });
        */
        $("#account-number" + i).closest(".single-accounts").append(fieldsToAdd)
        i++;
    })
}
function loadScreeningLegalDetails(screening_id) {
	if (screening_id == null) {
		var url = "./accounts/kycReviewListForm";
		$.get(url, function(data) {
			$("#page-content").html(data);
		});
		return false;
	} else {
		
	     var screeningDataRequest = $.ajax({
	         url: "./screeningl/getDetails?screening_id="+screening_id,
	         method: "POST",                                      
	         dataType: "json",
	         contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	     });   
		
	    
		screeningDataRequest.done(function(response) {
			
			response = formatDBJson(JSON.stringify(response));
			response = JSON.parse(response);
			console.log(response)
			populateScreeningLegalData(response.data.screening_l_request_data);
			populateRelatedPersonData(response.data.screening_l_related_person);
			populateRelatedEntityData(response.data.screening_l_related_entity);
		});
	}
}


function populateScreeningLegalData(data){
	
	$("#primary-sol-id").val(data.branch_sol_id)
	$("#salutation").val(data.salutation)
	$("#name-of-the-institution").val(data.name_of_institution)
	$("#ls-name").val(data.ls_name)
	$("#date-of-establishment").val(data.date_of_establishment)
	$("#type-of-industry").val(data.type_of_industry)
	$("#pan-number").val(data.pan_number)
	$("#notes").val(data.notes)
	$("#add-another-regd").click();
	$("#regd-number1x").val(data.registration_number)
	$("#country1x").val(data.country_of_issue)
	$("#state1x").val(data.state)
	$("#zone1x").val(data.zone)
	$("#ward-no1x").val(data.ward_no)
	$("#district1x").val(data.district)
	$("#mn-vdc1x").val(data.mn_vdc)
	$("#email_id1x").val(data.email_id)
	$("#contact_number1x").val(data.contact_number)
	$("#kycl-status").val(data.kycl_id)
	
//	if (relatedData != undefined) {
//             $.each(relatedData, function(index, value) {
//            	 counter = 1;
//                 idNumX = counter+"x";
//                 
//                 if (relatedData[index]['related_n_request_data'] != undefined) {
//                	 populateRelatedPersonData(value['related_n_request_data'],idNumX);
//                 }
//                 if (relatedData[index]['related_l_request_data'] != undefined) {
//                	// populateRelatedEntityData(value,idNumX)
//                 }
//             });
//         }
	
}

function populateRelatedPersonData(value){
	
	var relatedPersonKYCMappingInfo = {
			//"rel-person-id":"id",
			"person-type":"accounts_l_sub_type",
			"cust-id":"cust_id",
			"salutation":"salutation",
			"kycn-id":"kycn_id",
			"first-name":"first_name",
			"middle-name":"middle_name",
			"last-name":"last_name",
			"lsf-name":"lsf_name",
			"lsm-name":"lsm_name",
			"lsl-name":"lsl_name",
			"middle-name":"middle_name",
			"primary-identification-document-type":"primary_identification_type",
			"primary-identification-document-no":"primary_identification_no",
			"country":"country",
			"second-name":"second_name",
			"called-by-name":"called_by_name",
			"issuing-authority": "issuing_authority",
			"place-of-issue":"place_of_issue",
			"issue-date":"issue_date",
			"expiry-date":"expiry_date",
			"notes":"notes"
				
		};
	
	populateKyclFieldsArray(relatedPersonKYCMappingInfo,value,"single-related-person-wrap","Related Person","related-person-info-wrap",relatedPersonLegalCounter)
	
}

function populateRelatedEntityData(data){
	
	console.log(data)
	
	var relatedEntityKYCMappingInfo = {
			
				"entity-type": "accounts_l_sub_type",
				"kycl-id": "kycl_id",		
				"name": "name_of_institution",
				"ls-name": "ls_name",
				"country": "country_of_issue",
				"zone": "zone",
				"district": "district",
				"registration-no":"registration_no",
				"ward-number": "ward_no",
				"mn-vdc": "mn_vdc",
				"branch-sol-id": "branch_sol_id",
				"email-id": "email_id",
				"date-of-establishment": "date_of_establishment"
				
		};
	
	populateKyclFieldsArray(relatedEntityKYCMappingInfo,data,"single-related-entity-wrap","Related Entity","related-entity-info-wrap",relatedEntityLegalCounter)
	
}

function populateKyclFieldsArray(mappingInfo, data, singleDiv, sectionTitle, targetDiv, varName = ""){
    var counter = 0;
    var singleDivString = $("#" + singleDiv).html();  
    $.each(data, function(index, value){
    	counter++;
        var headerHtml = "<h3>" + sectionTitle +"-" + counter+"</h3><br />";
        var textToAdd = $("#" + singleDiv).html();
        textToAdd = textToAdd.replace(new RegExp('0x', 'g'), counter + 'x')
        textToAdd += "<div class=\"clearfix\"></div></div>";
        $("#" + targetDiv).append(headerHtml + textToAdd);
        populateKyclFields(mappingInfo, value, counter+"x");
        if (varName != ""){
            window[varName] += 1;
        }
    });
}

function populateKyclFields(mappingInfo, data, arrayIdx = ""){	
	
    $.each(mappingInfo, function(index, value) {
        content = data[value];
        
        //console.log("Index: "+index +arrayIdx +" Value: "+value)
        if (content != "N/A" && content != undefined) {
            $("#" + index + arrayIdx).val(content);          
        }
       
    });      
}



function getKyclSearchJsonArray() {
	var searchterm = $('#search-kycl-text').val();
	var filterOption = $('#kyc-filter').val();
	console.log("Filter :" + filterOption);

	var url =  ""; 	
	if(filterOption == "search-by-kycl-id") {
		url = "./kyclSearchJsonArrayByKyclId"
	}else if(filterOption == "search-by-cust-id") {
		url = "./kyclSearchJsonArrayByCustId"
	}else{
		url = "./kyclSearchJsonArray"
	}
	
		post_data = {
			"msg_type" : "kyc-search",
			"data" : searchterm
		};
		var request = $.ajax({
			url : url,
			method : "POST",
			data : post_data,
			dataType : "json",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		request.done(function(response) {
			
			if(response.data==null || response.data==""){
				bootBoxAlert();
			}
			
			generateKycTable(
					response,
					"kycl-search-results",
					"<td><button id=\"kycl-detail-btn\" class=\"btn btn-primary btn-xs kycl-detail-btn\">Details...</button><button id=\"kycl-update-btn\" class=\"btn btn-success btn-xs kycl-detail-btn\">Update</button></td>",
					"<th><b>Action</b></th>",
					false,
					["Similarity value"]);
			$('#pep-table-to-excel').show();
			
		});
		
		request.fail(function(response){
			bootBoxAlert();
		});
		
} // end of getPepSearchData


$(document).off('click',"#kycl-detail-btn").on('click',"#kycl-detail-btn",function(e){
	e.preventDefault();
	var $row = $(this).closest("tr");
	$.each($row, function(i, v) {
		var value = v;
		var row = $(value).closest("tr");
		console.log(row)
		id = row.find(".id").text();
	})
	var url = "./screeningn/getMatchDetails?id=" + id
			+ "&name='kycl'";
	$.get(url, function(data) {
		// $("#page-content").html(data);

		bootbox.dialog({
			 
			size: "large",
			message : data,
			title : "KYCL Details",
			buttons : {
				success : {
					label : "OK!",
					className : "btn-primary",
				},
			}
		});
	})
})


$(document).off('click',"#kycl-update-btn").on('click',"#kycl-update-btn",function(e){
	e.preventDefault();
	$(".pre-loader").show();
	var $row = $(this).closest("tr");
	$.each($row, function(i, v) {
		var value = v;
		var row = $(value).closest("tr");
		console.log(row)
		kycId = row.find(".id").text();
		screeningId = row.find(".screening-iD").text();
		custId = row.find(".cust-iD").text();
		
	});

	var url = "./kycl/accounts/refreshForm?kycId="+ kycId+"&screeningId="+screeningId+"&custId="+custId;
	
	$.get(url, function(data) {	
		$(".pre-loader").fadeOut('slow');
        $("#page-content").html(data);  
    });
	
	
	
})