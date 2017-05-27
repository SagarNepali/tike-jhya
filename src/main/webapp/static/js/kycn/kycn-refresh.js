var addressWrapCounter = 0;
var identificationWrapCounter = 0;
var relationWrapCounter = 0;
var relatedPersonWrapCounter = 0;
var relatedEntityWrapCounter = 0;
var educationWrapCounter = 0;
var involvementWrapCounter = 0;
var accountsWrapCounter = 0;
var internalObservationWrapCounter = 0;
var amlInfoWrapCounter = 0;
var documentStatusWrapCounter = 0;

var kyc_cust_id = 0;


function loadKycnDetails(kycnDetails){
	
	data = kycnDetails["data"]
	var personalInfo = JSON.parse(data["Personal info"])
	var identificationInfo = JSON.parse(data["Identification info"])
	var addressInfo = JSON.parse(data["Address info"]);
	var familyInfo = JSON.parse(data["Family info"]);
	var involvementInfo = JSON.parse(data["Involvement info"]);
	var educationInfo = JSON.parse(data["Education info"]);
	var accountsInfo = JSON.parse(data["Accounts info"]);
	var amlInfo = JSON.parse(data["AML info"]);
	var internalInfo = JSON.parse(data["Internal observations"]);
	var documentStatusInfo = JSON.parse(data["Documents status"]);
	var relatedPersonInfoData = JSON.parse(data["Related person info"]);
	var relatedEntityInfoData = JSON.parse(data["Related entity info"]);
	var financialInfoData = JSON.parse(data["Financial info"]);
	
	populatePersonalInfo(personalInfo);
	populateIdentificationInfo(identificationInfo);
	populateAddressInfo(addressInfo);
	populateRelationInfo(familyInfo);
	populateInvolvementInfo(involvementInfo);
	populateAccountsInfo(accountsInfo);
	populateAmlInfo(amlInfo);
	populateEducationInfo(educationInfo);
	populateDocumentStatusInfo(documentStatusInfo);
	populateInternalInfo(internalInfo);
	populateRelatedPersonKYCInfo(relatedPersonInfoData)
	populateRelatedEntityKYCData(relatedEntityInfoData)
	populateFinancialInfoData(financialInfoData);
	console.log(financialInfoData)

	loadCbsDetailsWithKyc(kyc_cust_id); 
	
}

function populateFinancialInfoData(financialInfoData){
	
	$.each(financialInfoData,function(i,o){
		$("#customer-pan").val(o["pan_gir_of_customer"]);
		$("#customer-currency").val(o["currency_of_customer"]);
	})
}

function populateRelatedPersonKYCInfo(relatedPersonInfo){
	
	var relatedPersonKYCMappingInfo = {
			"rel-person-id":"id",
			"related-person-type":"person_type",
			"related-person-cust-id":"cust_id",
			"related-person-salutation":"salutation",
			"related-person-kycn-id":"kycn_id",
			"related-person-first-name":"first_name",
			"related-person-middle-name":"middle_name",
			"related-person-last-name":"last_name",
			"related-person-lsf-name":"lsf_name",
			"related-person-lsm-name":"lsm_name",
			"related-person-lsl-name":"lsl_name",
			"related-person-middle-name":"middle_name",
			"related-person-primary-identification-document-type":"primary_identification_type",
			"related-person-primary-identification-document-no":"primary_identification_no",
			"related-person-country":"country",
			"related-person-second-name":"second_name",
			"related-person-called-by-name":"called_by_name",
			"related-person-issuing-authority": "issuing_authority",
			"related-person-place-of-issue":"place_of_issue",
			"related-person-issue-date":"issue_date",
			"related-person-expiry-date":"expiry_date",
			"related-person-notes":"notes"
				
		}
		populateKycFieldsArray(relatedPersonKYCMappingInfo, relatedPersonInfo, "single-related-person-wrap", "Related person", "related-person-info-wrap","relatedPersonWrapCounter");
}

function populateRelatedEntityKYCData(relatedEntityKYCData){
	
	var relatedEntityKYCMappingInfo = {
			"rel-entity-id":"id",
			"related-entity-type":"person_type",
			"related-entity-cust-id":"cust_id",
			"related-entity-salutation":"salutation",
			"related-entity-kycn-id":"kycn_id",
			"related-entity-name":"name",
			"related-entity-ls":"ls_name",
			"related-entity-primary-identification-document-type":"primary_identification_document_type",
			"related-entity-primary-registration-no":"registration_no",
			"related-entity-country":"country",
			"related-entity-second-name":"second_name",
			"related-entity-called-by-name":"called_by_name",
			"related-entity-issuing-authority": "issuing_authority",
			"related-entity-place-of-issue":"place_of_issue",
			"related-entity-issue-date":"issue_date",
			"related-entity-expiry-date":"expiry_date",
			"related-entity-notes":"notes",
			"related-entity-zone":"zone",
			"related-entity-district":"district",
			"related-entity-mn-vdc":"mn_vdc",
			"related-entity-pinzip":"pinzip",
			
			"related-entity-ward-number":"ward_number",
			"related-entity-tole-area":"tole_area",
			"related-entity-street":"street",
			"related-entity-house-no":"house_no",
			"related-entity-unit-number":"unit_number",
			"related-entity-nearest-landmark":"nearest_landmark",
			"related-entity-latitude":"latitude",
			"related-entity-longitude":"longitude",
			"related-entity-phone-no-country-code":"phone_no_country_code",
			"related-entity-phone-no-area-code":"phone_no_area_code",
			"related-entity-phone-no":"phone_no",
			"related-entity-telex-no-country-code":"telex_no_country_code",
			"related-entity-telex-no-area-code":"telex_no_area_code",
			"related-entity-telex-no":"telex_no",
			"related-entity-email-id":"email_id",
			"related-entity-notes":"notes",
				
		}
	populateKycFieldsArray(relatedEntityKYCMappingInfo, relatedEntityKYCData, "single-related-entity-wrap","Related Entity","related-entity-info-wrap","relatedEntityWrapCounter")
}



function populateEducationInfo(educationInfo){
	
	var educationMappingInfo = 
	{
			"edu-id":"id",
			"qualification": "qualification",
			"name-of-institute":"name_of_institute",
			"field-of-study":"field_of_study",
			"year-of-graduation":"year_of_graduation",
	        "education-notes":"notes"
		};
	
	populateKycFieldsArray(educationMappingInfo, educationInfo, "single-education-wrap","Education","education-wrap","educationWrapCounter")
}


function populateInternalInfo(internalInfo){
	
	
	$.each(internalInfo,function(index,value){
		$("#obsrv-id").val(value["id"]);
		$("#observation-type").val(value["observation_type"]);
		$("#internal-observation-behavioural").val(value["internal_observation_behavioral"]);
		$("#internal-observation-financial").val(value["internal_observation_financial"]);
		$("#internal-observation-physical").val(value["internal_observation_physical"]);
		$("#internal-observation-connected-person").val(value["internal_observation_connected_person"]);
		$("#connected-person-id").val(value["connected_person_id"]);
		$("#connected-person").val(value["connected_person"]);
		$("#internal-observation-intended-objective-of-business-relation").val(value["internal_observation_intended_objective_of_business_relation"]);
		$("#observation-media-source").val(value["observation_media_source"]);
		$("#observation-date").val(value["observation_date"]);
		$("#observation-time").val(value["observation_time"]);
		$("#observation-notes").val(value["notes"]);
	})
	
	
}


function populateDocumentStatusInfo(documentStatusInfo){
	
	var docStatMappingInfo = 	{
		    "doc-id":"id",
			"document-type":"document_type",
			"document-status":"document_status",
			"date":"date",
			"refresh-date":"refersh_date",
			"document-notes": "notes"
	};
	
	populateKycFieldsArray(docStatMappingInfo,documentStatusInfo,"single-document-status-wrap","Document status","document-status-wrap","documentStatusWrapCounter");
}


function populateAmlInfo(amlInfo){
	
		
	$.each(amlInfo,function(index,value){
		$("#aml-id").val(value["id"]);
		$("#recommendations").val(value["recommendations"]);
		$("#risk-categorization").val(value["risk_categorization"]);
		$("#us-non-us").prop("checked",value["un_non_us"])
		$("#fatca-country").prop("checked",value["fatca_country"])
		$("#aml-check").prop("checked",value["aml_check"])
		$("#aml-notes").val(value["aml_notes"])
	});
	
}


function populateAccountsInfo(accountsInfo){
	
	var accountsMappingInfo = {
		
			"acc-id" :"id",
			"customer-pan": "customer_pan",
			"customer-currency": "customer_currency",
			"account-id": "account_id",
			"for-account-id": "for_account_id",
			"currency-of-account": "currency_of_account" ,
			"account-no":"account_no",
			"account-name": "account_name",
			"account-short-name":"account_short_name" ,
			"account-ownership":"account_ownership",
			"scheme-type":"scheme_type",
			"scheme-code":"scheme_code",
			"gl-sub-head-code": "gl_sub_head_code",
			"product-group": "product_group",
			"last-transaction-date": "last_transaction_date" ,
			"account-open-date": "account_open_date", 
			"estimated-yearly-transactions": "estimated_yearly_transactions",
			"estimated-monthly-transactions": "estimated_monthly_transactions" ,
			"estimated-yearly-turnover": "estimated_yearly_turnover",
			"estimated-monthly-turnover": "estimated_monthly_turnover",
			"regular-source-of-income":"regular_source_of_income" ,
			"source-of-fund": "source_of_fund",
			"account-notes": "notes"
			
	}
	
	populateKycFieldsArray(accountsMappingInfo,accountsInfo,"single-account-wrap","Account","accounts-wrap","accountsWrapCounter");
}


function populateInvolvementInfo(involvementInfo){
	
	var involvementMappingInfo =  
			{
				"inv-id" :"id",
				"involvement-organization-kycl-id":"kycl_id",
				"involvement-organization-nature":"organization_nature",
				"involvement-country": "country",
		    	"involvement-zone": 	"zone",
				"involvement-district": "district",
				"involvement-mn-vdc": "mn_vdc",
				"involvement-pinzip": "pinzip",
				"involvement-ward-number": "involvement_ward_number",
				"involvement-tole-area": "tole_area",
				"involvement-street": "street",
				"involvement-house-no": "house_no",
				"involvement-unit-number": "unit_number",
				"involvement-nearest-landmark": "nearest_landmark",
				"involvement-latitude": "latitude",
				"involvement-longitude": "longitude",
				"involvement-phone-no-country-code": "phone_no_country_code",
				"involvement-phone-no-area-code":"phone_no_area_code",
				"involvement-phone-no":"phone_no",
				"involvement-fax-no":"fax_no",
				"involvement-fax-no-country-code":"fax_no_country_code",
				"involvement-fax-no-area-code":"fax_no_area_code",
				"involvement-email-id":"email_id",
				"involvement-website":"website",
				"involvement-panvat":"panvat",
				"involvement-poboxno":"poboxno",
				"involvement-nature":"nature",
				"involvement-designation":"designation",
				"involvement-start-date":"start_date",
				"involvement-end-date":"end_date",
				"involvement-notes":"involvement_notes",
				"occupation-type":"occupation_type"
			};
	
	populateKycFieldsArray(involvementMappingInfo,involvementInfo,"single-involvement-wrap","Involvement","involvement-wrap","involvementWrapCounter");
	
}


function populateRelationInfo(relationInfo){
	
	var relationMappingInfo = {
		"rel-id" :"id",
		"relation-type": "relation_type",
		"relation-cust-id": "cust_id",
		"relation-kycn-id" : "kycn_id",
		"relation-first-name": "first_name",
		"relation-middle-name": "middle_name",
		"relation-last-name": "last_name",
		"relation-lsf-name": "lsf_name",
		"relation-lsm-name": "lsm_name",
		"relation-lsl-name": "lsl_name",
		"relation-second-name": "relation_second_name",
		"relation-called-by-name": "relation_called_by_name",
		"relation-primary-identification-document-type": "primary_identification_document_type",
		"relation-primary-identification-document-no": "primary_identification_document_no",
		"relation-country": "relation_country",
		"issuing-authority": "issuing_authority",
		"place-of-issue": "place_of_issue",
		"relation-id-issue-date" : "issue_date",
		"relation-id-expiry-date": "expiry_date",
		"relation-note": "notes"
			
	}
	populateKycFieldsArray(relationMappingInfo,relationInfo,"single-relation-wrap","Relation","relation-info-wrap","relationWrapCounter");
}


function populateAddressInfo(addressInfo){
	
	var addressMappingInfo = {
		"add-id" :"id",
		"address-type": "address_type",
		"address-country" : "country",
		"address-zone" : "zone",
		"address-district":"district" ,
		"address-mn-vdc": "mn_vdc",
		"address-pinzip": "pinzip",
		"address-ward-number": "ward_number",
		"address-tole-area" : "tole_area",
		"address-street": "street",
		"address-house-no": "house_no",
		"address-unit-number": "unit_number",
		"address-nearest-landmark": "nearest_landmark",
		"address-latitude": "latitude",
		"address-longitude": "longitude",
		"address-phone-no-country-code": "phone_no_country_code",
		"address-phone-no-area-code":"phone_no_area_code",
		"address-phone-no":"phone_no" ,
		"address-pager-no-country-code":"pager_no_country_code" ,
		"address-pager-no-area-code": "pager_no_area_code",
		"address-pager-no": "pager_no",
		"address-telex-no-country-code":"telex_no_country_code",
		"address-telex-no-area-code": "telex_no_area_code",
		"address-telex-no": "telex_no",
		"address-email-id": "email_id", 
		"address-notes": "notes"
			
	};
	
	
    populateKycFieldsArray(addressMappingInfo,addressInfo,"single-address-wrap", "Address","address-info-wrap","addressWrapCounter");
    
	// populateCbsFields(addressMappingInfo, addressInfo[0])
}

function populateIdentificationInfo(identificationInfo){
	
	var identificationMappingInfo = {
		"identi-id" :"id",	
		"primary-identification-document-type":"primary_identification_document_type",
		"primary-identification-document-no":"primary_identification_document_no",
		"id-country-of-issue":"country_of_issue",
		"passport-no":"passport_no",
		"passport-issuing-authority":"passport_issuing_authority",
		"passport-place-of-issue":"passport_place_of_issue",
		"passport-issude-date":"passport_issue_date",
		"passport-expiry-date":"expiry_date",
		"visa-no":"visa_no",
		"visa-expiry-date":"visa_expiry_date",
		"nepal-entry-date":"nepal_entry_date",
		"idiNotes":"notes"
	};
 populateKycFieldsArray(identificationMappingInfo,identificationInfo,"single-id-wrap", "Identification","identification-wrap","identificationWrapCounter");

}

function populatePersonalInfo(personalInfo){
	
	$("#kycn_personal_info_id").val(personalInfo.id)
	if(personalInfo.gender!=""){
	$("input[name=gender][value=" + personalInfo.gender+ "]").prop("checked","checked");
	}
	if(personalInfo.marital_status!=""){
		$("input[name=marital-status][value=" + personalInfo.marital_status + "]").prop("checked", "checked");
	}
	$("#cust-id").val(personalInfo.cust_id)
	$("#screening-n-id").val(personalInfo.screening_id)
	$('#salutation option:contains('+personalInfo.salutation+')').prop('selected',true);
	$("#first-name").val(personalInfo.first_name)
	$("#middle-name").val(personalInfo.middle_name)
	$("#last-name").val(personalInfo.last_name)
	$("#ls-title").val(personalInfo.ls_title)
	$("#lsf-name").val(personalInfo.lsf_name)
	$("#lsm-name").val(personalInfo.lsm_name)
	$("#lsl-name").val(personalInfo.lsl_name)
	$("#customer-cardholder-flag").prop("checked",personalInfo.card_holder);
	
	$("#second-name").val(personalInfo.second_name)
	$("#called-by-name").val(personalInfo.called_by_name)
	$("#previous-name").val(personalInfo.previous_name)
	$("#date-of-birth").val(personalInfo.date_of_birth)
	$("#age").val(personalInfo.age)
	$("#minor").prop("checked",personalInfo.minor)
	$("#marital-status").val(personalInfo.marital_status)
	$("#notes").val(personalInfo.notes)
	$("#customer-type").val(personalInfo.customer_type)
	$("#customer-group").val(personalInfo.customer_group)
	$("#customer-constitution").val(personalInfo.customer_constitution)
	$("#customer-community").val(personalInfo.customer_community)
	$("#customer-caste").val(personalInfo.customer_caste)
	$("#customer-employee-id").val(personalInfo.customer_employee_id)
	$("#customer-status-code").val(personalInfo.customer_status_code)
	$("#customer-open-date").val(personalInfo.customer_open_date)
	$("#customer-maker").val(personalInfo.customer_maker)
	$("#customer-nre-flag").prop('checked',personalInfo.non_resident_external );
	$("#piNotes").val(personalInfo.notes)
	
	kyc_cust_id = personalInfo.cust_id;
	
	
}



function populateKycFields(mappingInfo, data, arrayIdx = ""){	
    $.each(mappingInfo, function(index, value) {
        content = data[value];
        //console.log("Index: "+index +arrayIdx +" Value: "+value)
        if (content != "N/A" && content != undefined) {
            $("#" + index + arrayIdx).val(content);          
        }
       
    });      
}

function populateCbsFieldsWithKyc(mappingInfo, data, arrayIdx = ""){	
	
	
    $.each(mappingInfo, function(index, value) {
        content = data[value];
       // console.log("Index: "+index +arrayIdx +" Value: "+value)    
        if (content != "N/A" && content != undefined) {
            $("#" + index + arrayIdx).val(content);          
        }
       
    });      
}

function populateKycFieldsArray(mappingInfo, data, singleDiv, sectionTitle, targetDiv, varName = ""){
	
    var counter = 0;
    var singleDivString = $("#" + singleDiv).html();  
    $.each(data, function(index, value){
    	counter++;
        var headerHtml = "<h3>" + sectionTitle +"-" + counter+"</h3><br />";
        var textToAdd = $("#" + singleDiv).html();
        textToAdd = textToAdd.replace(new RegExp('0x', 'g'), counter + 'x')
        textToAdd += "<div class=\"clearfix\"></div></div>";
        $("#" + targetDiv).append(headerHtml + textToAdd);
        populateKycFields(mappingInfo, value, counter+"x");
        if (varName != ""){
            window[varName] += 1;
        }
    });
}

function populateCbsFieldsArrayWithKyc(mappingInfo, data, varName = ""){
	
	for(i=0;i<=varName;i++){
		$.each(data,function(i,o){
				populateKycFields(mappingInfo, o, i+1+"x");
			
		})
	}
	
	
}


$(document).off('click', "#kycnRefresh").on('click', "#kycnRefresh", function() {
    kycnRefreshSubmit(this);
});


//function for final submission after review
function kycnRefreshSubmit() {
    post_data = JSON.parse(localStorage.getItem("kycn_post_data"));
    //console.log(JSON.stringify(post_data));
    var request = $.ajax({
        url : "./api/rest/kycn/refreshSubmit",
        method : "POST",
        data : {
            postData : (JSON.stringify(post_data))
        },
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    request.done(function(response) {
        //console.log(response)
        if (response.httpStatusCode === 200) {
            // bootbox.alert("KYC saved successfully")
            var dialog = bootbox.dialog({
                title : '<span style="color: #5CB85C ;">KYC Refresh</span>',
                message : '<h4><b>Saved successfully</b></h4>'
            });
            $.get("./kyc/refreshListForm", function(data) {
                $("#page-content").html(data);
            })
        } else {
            var res = JSON.parse(response);
            // bootbox.alert("0x",res.httpStatusCode,res.errorLevelCode,res.errorCode);

            var dialog = bootbox.dialog({
                title : '<span style="color: #FF0000;">KYC Refresh</span>',
                message : '<h4><b> Unsuccesful : 0x' + res.httpStatusCode + res.errorLevelCode + res.errorCode + '</b></h4>'
            });
        }
    });
    request.fail(function(response) {
        console.log("error")
        bootbox.alert(response.errorMessage + " \n" + response.errorCode)
    });

}


function loadCbsDetailsWithKyc(cust_id) {
	
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
			if(response.data.CMG.length>0){
				updateCBSFieldsWithKYC(response.data);
//				updateKycnCbsFields(response.data);
			}else{
				bootbox.alert("No data found in CBS");
			}
		});
		cbsDataRequest.fail(function() {
			bootbox.alert("Couldnot connect to CBS");
		})

}

function updateCBSFieldsWithKYC(data){
	
//	console.log(JSON.stringify(data))
	
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
            "cbs-rcre-user-id":"RCRE_USER_ID"
    }
            
     var cbsIdentificationMapping =     
     { 
    		"cbs-nat-id-card-num1x":"NAT_ID_CARD_NUM",
            "cbs-psprt-num1x":"PSPRT_NUM"
    }
   
    var cbsAddressMapping = {
    		"cbs-cust-perm-cntry-code1x":"CUST_PERM_CNTRY_CODE",        
            "cbs-cust-perm-state-code1x":"CUST_PERM_STATE_CODE",        
            "cbs-cust-perm-city-code1x":"CUST_PERM_CITY_CODE",
            "cbs-cust-perm-pin-code1x":"CUST_PERM_PIN_CODE",
            "cbs-cust-perm-phone-num1x":"CUST_PERM_PHONE_NUM",
            "cbs-cust-perm-telex-num1x":"CUST_PERM_TELEX_NUM",
            "cbs-cust-perm-email-id1x":"CUST_PERM_EMAIL_ID",
            
            "cbs-cust-perm-cntry-code2x":"CUST_COMU_CNTRY_CODE",
            "cbs-cust-perm-state-code2x":"CUST_COMU_STATE_CODE",
            "cbs-cust-perm-city-code2x":"CUST_COMU_CITY_CODE",
            "cbs-cust-perm-pin-code2x":"CUST_COMU_PIN_CODE",
            "cbs-cust-perm-phone-num2x":"CUST_COMU_PHONE_NUM_1"
    }
            
     var cbsRelatedEntityMapping = {
    		"cbs-related-entity-city-code1x":"CUST_EMP_CITY_CODE",
            "cbs-related-entity-phone-num2x":"CUST_EMP_PHONE_NUM_2",
            "cbs-related-entity-phone-num1x":"CUST_EMP_PHONE_NUM_1",
            "cbs-related-entity-email-id1x":"CUST_EMP_EMAIL_ID"	
    }     
            
    var cbsRelatedPersonMapping = {
            "cbs-related-person-code1x":"CUST_INTROD_STAT_CODE",
            "cbs-related-person-cust-id1x":"CUST_INTROD_CUST_ID",            
            "cbs-related-person-title-code1x":"INTROD_TITLE_CODE",
            "cbs-related-person-name1x":"CUST_INTROD_NAME"
    }
    
    var cbsAccountsMappingInfo = {
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
    var cptMappingInfo = {    
            "cbs-cust-reltn-code":"CUST_RELTN_CODE",            
            "cbs-person-reltn-name":"PERSON_RELTN_NAME",
            "cbs-person-reltn-cust-id":"PERSON_RELTN_CUST_ID"
        };
    
    populateCbsFieldsWithKyc(cmgMappingInfo, cmgData[0]);
    populateCbsFieldsWithKyc(cbsAddressMapping,cmgData[0])
    populateCbsFieldsWithKyc(cbsIdentificationMapping,cmgData[0])
    populateCbsFieldsWithKyc(cbsRelatedPersonMapping,cmgData[0])
    populateCbsFieldsWithKyc(cbsRelatedEntityMapping,cmgData[0])
    gamData = data.GAM
    //populateCbsFieldsWithKyc(cbsAccountsMappingInfo,gamData[0],accountsWrapCounter+"x")
    populateCbsFieldsArrayWithKyc(cbsAccountsMappingInfo,gamData,accountsWrapCounter)
    cptData = data.CPT;
    populateCbsFieldsArrayWithKyc(cptMappingInfo, cptData,relationWrapCounter);
    
    /** CBS ADDRESS data filled **/
    var addr1 = cmgData[0]['CUST_PERM_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_PERM_ADDR1'];
    var addr2 = cmgData[0]['CUST_PERM_ADDR2'] == "N/A" ? "" : ", " + cmgData[0]['CUST_PERM_ADDR2']
    var addr3 = cmgData[0]['CUST_COMU_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_COMU_ADDR1'];
    var addr4 = cmgData[0]['CUST_COMU_ADDR2'] == "N/A" ? "" : cmgData[0]['CUST_COMU_ADDR2'];
    var addr5 = cmgData[0]['CUST_EMP_ADDR1'] == "N/A" ? "" : cmgData[0]['CUST_EMP_ADDR1'];
    var addr6 = cmgData[0]['CUST_EMP_ADDR2'] == "N/A" ? "" : cmgData[0]['CUST_EMP_ADDR2'];
    
    $('#cbs-cust-perm-addr1x').val(addr1 + addr2);
    $('#cbs-cust-perm-addr2x').val(addr3 + addr4);
    $('#cbs-related-entity-district1x').val(addr5 + addr6);
    /** CBS ADDRESS data filled **/
    
//    populateCbsFieldsArrayWithKyc(cbsAddressMapping,cmgData[0],"single-address-wrap","Address-wrap","address-wrap","addressWrapCounter")
    
    //populateCbsFieldsArrayWithKyc
	
}
