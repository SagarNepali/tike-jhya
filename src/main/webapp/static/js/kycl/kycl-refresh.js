
var kyc_cust_id = 0;


function loadKyclDetails(kyclDetails){
	
	data = kyclDetails["data"]
	
	
	var kyclInfo = JSON.parse(data["Kycl info"])
	var addressInfo = JSON.parse(data["Address info"])
	var registrationInfo = JSON.parse(data["Registration info"])
	var registrationAddressInfo = JSON.parse(data["Registration address info"])
	var auditInfo = JSON.parse(data["Audit info"])
	var businessInfo = JSON.parse(data["Business info"])
	var landlordInfo = JSON.parse(data["Landlord info"])
	var relatedPersonInfo = JSON.parse(data["Related person info"])
	var relatedEntityInfo = JSON.parse(data["Related entity info"])
	var complianceInfo = JSON.parse(data["Compliance info"])
	var accountsInfo = JSON.parse(data["Accounts info"])
	var documentsInfo = JSON.parse(data["Documents info"])
	
	populateKyclInfo(kyclInfo)
	populateAddressInfo(addressInfo)
	populateRegistrationInfo(registrationInfo)
	populateRegistrationAddressInfo(registrationAddressInfo)
	populateAuditInfo(auditInfo)
	populateBusinessInfo(businessInfo)
	populateLandlordInfo(landlordInfo)
	populateRelatedPersonInfo(relatedPersonInfo)
	populateRelatedEntityInfo(relatedEntityInfo)
	populateComplianceInfo(complianceInfo)
	populateAccountsInfo(accountsInfo)
	populateDocumentStatusInfo(documentsInfo)
	
}

function populateKyclInfo(data){
	
	var kyclMappingInfo = {
			
			"kycl_info_id":"id",
			"primary-sol-id":"primary_sol_id",
			"salutation":"salutation",
			"name-of-the-institution":"name_of_the_institution",
			"ls-name":"ls_name",
			"cust-short-name":"cust_short_name",
			"date-of-establishment":"date_of_establishment",
			"notes":"notes",
			"customer-type":"customer_type",
			"customer-group":"customer_group",
			"customer-constitution":"customer_constitution",
			"customer-community":"customer_community",
			"customer-employee-id":"customer_employee_id",
			"customer-open-date":"customer_open_date",
			"customer-maker":"customer_maker",
			"screening-id":"screening_id",
			"pan-number":"pan_number",
			"minor":"minor",
			"customer-status-code":"customer_status_code",
			"card-holder":"card_holder",
			"non-resident-external":"non_resident_external",
			"cust-id":"cust_id",
			"kycl-status":"kycl_status",
			"last-update-date":"last_update_date",
			"last-screened-date":"last_screened_date",
			"verified-record":"verified_record",
			"audited-fiscal-year":"audited_fiscal_year",
			"net-profit":"net_profit",
			"net-loss":"net_loss",
			"tax-clearence-certificate-date":"tax_clearence_certificate_date",
			"tax-clearence-fiscal-year":"tax_clearence_fiscal_year",
			"next-clearence-certificate-date":"next_clearence_certificate_date",
			"taxable-amount":"taxable_amount",
			"taxable-income":"taxable_income",
			"tax-paid":"tax_paid",
			"tax-paid-date":"tax_paid_date",
			"type-of-industry":"types_of_industry"
	}
	
	populateKyclFields(kyclMappingInfo,data);
	
}	

function populateAddressInfo(data){
	
	var addressMappingInfo ={
			"id": "id",		
			"address-type": "address_type",
			"country": "country",
			"zone": "zone",
			"district": "district",
			"mn-vdc": "mn_vdc",
			"pinzip": "pinzip",
			"ward-number": "ward_number",
			"tole-area": "tole_area",
			"street": "street",
			"house-no": "house_no",
			"unit-number": "unit_number",
			"nearest-landmark": "nearest_landmark",
			"latitude": "latitude",
			"longitude": "longitude",
			"add-phone-no-country-code": "phone_no_country_code",
			"add-phone-no-area-code": "phone_no_area_code",
			"add-phone-no": "phone_no",
			"add-telex-no-country-code": "telex_no_country_code",
			"add-telex-no-area-code": "telex_no_area_code",
			"add-telex-no": "telex_no",
			"add-pager-no-country-code": "pager_no_country_code",
			"add-pager-no-area-code": "pager_no_area_code",
			"add-pager-no": "pager_no",
			"email-id": "email_id",
			"notes": "notes",
			"state": "state",
			
	}
	
	populateKyclFieldsArray(addressMappingInfo, data, "single-address-wrap", "Address", "address-info-wrap",kyclAddressCounter);
}

function populateRegistrationInfo(data){
	
	var registrationMappingInfo = {
			"id": "id",
			"registration-authority": "registration_authority",
			"self-regulatory-body": "self_regulatory_body",
			"regd-number": "regd_number",
			"licensing-authority": "licensing_authority",
			"license-number": "license_number",
			"notes": "notes"
			
	}
	populateKyclFieldsArray(registrationMappingInfo, data, "single-regd-wrap", "Registration", "registration-info-wrap",registrationCounter);
}

function populateRegistrationAddressInfo(data){
	
	var registrationAddressMappingInfo = {
			"regd-add-id": "id",
			"regd-add-country": "country",
			"regd-add-state": "state",
			"regd-add-province": "province",
			"regd-add-district": "district",
			"regd-add-mn-vdc": "mn_vdc",
			"regd-add-ward-no": "ward_no",
			"regd-add-town-city": "town_city",
			"regd-add-notes": "notes",
			"regd-add-phone-no-country-code": "phone_no_country_code",
			"regd-add-phone-no-area-code": "phone_no_area_code",
			"regd-add-phone-no": "phone_no",
			"regd-add-telex-no-country-code": "telex_no_country_code",
			"regd-add-telex-no-area-code": "telex_no_area_code",
			"regd-add-telex-no": "telex_no",
			"regd-add-pager-no-country-code": "pager_no_country_code",
			"regd-add-pager-no-area-code": "pager_no_area_code",
			"regd-add-pager-no": "pager_no",
			"regd-add-email-id": "email_id"
			
		}
	
	populateKyclFieldsArray(registrationAddressMappingInfo, data, "single-registration-address-wrap", "Registration Address", "registration-address-info-wrap",registrationAddressCounter);
} 

function populateAuditInfo(data){
	
	var auditMappintInfo = {
			"audit-id": "id",
			"audited-report": "audited_report",
			"authorized-letter": "authorized_letter",
			"authorized-letter-date": "authorized_letter_date",
			"authorized-letter-agency": "authorized_letter_agency",
			"audit-notes": "notes"
			
		}
	populateKyclFieldsArray(auditMappintInfo, data, "single-audit-wrap", "Audit info", "audit-wrap",auditCounter);
}

function populateBusinessInfo(data){
	
	var businessMappingInfo = {
			"biz-id": "id",
			"biz-branches-name": "branches_name",
			"biz-nature-of-business": "nature_of_business",
			"biz-main-branches-offices": "main_branches_offices",
			"biz-geographical-coverage": "geographical_coverage",
			"biz-country": "country",
			"biz-province": "province",
			"biz-district": "district",
			"biz-mn-vdc": "mn_vdc",
			"biz-ward-no": "ward_no",
			"biz-town-city": "town_city",
			"biz-notes": "notes",
			"biz-phone-no-country-code": "phone_no_country_code",
			"biz-phone-no-area-code": "phone_no_area_code",
			"biz-phone-no": "phone_no",
			"biz-telex-no-country-code": "telex_no_country_code",
			"biz-telex-no-area-code": "telex_no_area_code",
			"biz-telex-no": "telex_no",
			"biz-pager-no-country-code": "pager_no_country_code",
			"biz-pager-no-area-code": "pager_no_area_code",
			"biz-pager-no": "pager_no",
			"biz-email-id": "email_id"
			
		}
	populateKyclFieldsArray(businessMappingInfo, data, "single-business-wrap", "Business info", "business-wrap",businessCounter);
}

function populateLandlordInfo(data){
	
	var landlordMappingInfo = {
			"landlord-id": "id",
			"land-lord-first-name": "land_lord_first_name",
			"land-lord-middle-name": "land_lord_middle_name",
			"land-lord-last-name": "land_lord_last_name",
			"landlord-country": "country",
			"landlord-province": "province",
			"landlord-district": "district",
			"landlord-mn-vdc": "mn_vdc",
			"landlord-ward-no": "ward_no",
			"landlord-town-city": "town_city",
			"landlord-notes": "notes",
			"landlord-phone-no-country-code": "phone_no_country_code",
			"landlord-phone-no-area-code": "phone_no_area_code",
			"landlord-phone-no": "phone_no",
			"landlord-telex-no-country-code": "telex_no_country_code",
			"landlord-telex-no-area-code": "telex_no_area_code",
			"landlord-telex-no": "telex_no",
			"landlord-pager-no-country-code": "pager_no_country_code",
			"landlord-pager-no-area-code": "pager_no_area_code",
			"landlord-pager-no": "pager_no",
			"landlord-email-id": "email_id"
			
		}
	populateKyclFieldsArray(landlordMappingInfo, data, "single-landlord-wrap", "Landlord info", "landlord-wrap",landlordCounter);
}

function populateRelatedPersonInfo(data){
	
	var relatedPersonMappingInfo = {
			"rel-person-id": "id",
			"person-type": "person_type",
			"rel-person-cust-id": "cust_id",
			"rel-person-kycn-id": "kycn_id",
			"rel-person-salutation": "salutation.",
			"rel-person-first-name": "first_name",
			"rel-person-middle-name": "middle_name",
			"rel-person-last-name": "last_name",
			"rel-person-lsf-name": "lsf_name",
			"rel-person-lsm-name": "lsm_name",
			"rel-person-lsl-name": "lsl_name",
			"rel-person-second-name": "second_name",
			"rel-person-called-by-name": "called_by_name",
			"rel-person-primary-identification-document-type": "primary_identification_document_type",
			"rel-person-primary-identification-document-no": "primary_identification_document_no",
			"rel-person-country": "country",
			"rel-person-issuing-authority": "issuing_authority",
			"rel-person-place-of-issue": "place_of_issue",
			"rel-person-issue-date": "issue_date",
			"rel-person-expiry-date": "expiry_date",
			"rel-person-zone": "zone",
			"rel-person-district": "district",
			"rel-person-mn-vdc": "mn_vdc",
			"rel-person-pinzip": "pinzip",
			"rel-person-ward-number": "ward_number",
			"rel-person-tole-area": "tole_area",
			"rel-person-street": "street",
			"rel-person-house-no": "house_no",
			"rel-person-unit-number": "unit_number",
			"rel-person-nearest-landmark": "nearest_landmark",
			"rel-person-latitude": "latitude",
			"rel-person-longitude": "longitude",
			"rel-person-phone-no-country-code": "phone_no_country_code",
			"rel-person-phone-no-area-code": "phone_no_area_code",
			"rel-person-phone-no": "phone_no",
			"rel-person-telex-no-country-code": "telex_no_country_code",
			"rel-person-telex-no-area-code": "telex_no_area_code",
			"rel-person-telex-no": "telex_no",
			"rel-person-email-id": "email_id",
			"rel-person-notes": "notes"
			
		}
	populateKyclFieldsArray(relatedPersonMappingInfo, data, "single-related-person-wrap", "Related person info", "related-person-info-wrap",relatedPersonLegalCounter);
}

function populateRelatedEntityInfo(data){
	
	var relatedEntityMappingInfo = {
			"rel-entity-id": "id",
			"rel-entity-entity-type": "entity_type",
			"rel-entity-cust-id": "cust_id",
			"rel-entity-kycn-id": "kycn_id",
			"rel-entity-salutation": "salutation",
			"rel-entity-name": "name",
			"rel-entity-ls-name": "ls_name",
			"rel-entity-called-by-name": "called_by_name",
			"rel-entity-primary-identification-document-type": "primary_identification_document_type",
			"rel-entity-registration-no": "registration_no",
			"rel-entity-country": "country",
			"rel-entity-zone": "zone",
			"rel-entity-district": "district",
			"rel-entity-mn-vdc": "mn_vdc",
			"rel-entity-pinzip": "pinzip",
			"rel-entity-ward-number": "ward_number",
			"rel-entity-tole-area": "tole_area",
			"rel-entity-street": "street",
			"rel-entity-house-no": "house_no",
			"rel-entity-unit-number": "unit_number",
			"rel-entity-nearest-landmark": "nearest_landmark",
			"rel-entity-latitude": "latitude",
			"rel-entity-longitude": "longitude",
			"rel-entity-phone-no-country-code": "phone_no_country_code",
			"rel-entity-phone-no-area-code": "phone_no_area_code",
			"rel-entity-phone-no": "phone_no",
			"rel-entity-telex-no-country-code": "telex_no_country_code",
			"rel-entity-telex-no-area-code": "telex_no_area_code",
			"rel-entity-telex-no": "telex_no"
			
		}
	populateKyclFieldsArray(relatedEntityMappingInfo, data, "single-related-entity-wrap", "Related entity info", "related-entity-info-wrap",relatedEntityLegalCounter);
}

function populateComplianceInfo(data){
	
	var complianceMappingInfo = {
			"id": "id",
			"level-of-compliance-on-aml": "level_of_compliance_on_aml",
			"level-of-compliance-on-tax": "level_of_compliance_on_tax",
			"level-of-compliance-on-corruption": "level_of_compliance_on_corruption",
			"level-of-compliance-on-others": "level_of_compliance_on_others",
			"notes": "notes"
			
		}
	
//	$("#level-of-compliance-on-aml").val(data['level_of_compliance_on_aml'])
//	$("#level-of-compliance-on-tax").val(data['level_of_compliance_on_tax'])
//	$("#level-of-compliance-on-corruption").val(data['level_of_compliance_on_corruption'])
//	$("#level-of-compliance-on-others").val(data['level_of_compliance_on_others'])
//	$("#notes").val(data['notes'])
	
	populateKyclFields(complianceMappingInfo,data);
}

function populateAccountsInfo(data){
	
	var accountsMappingInfo = {
			"acc-id": "id",
			"account-id": "account_id",
			"for-account-id": "for_account_id",
			"currency-of-account": "currency_of_account",
			"account-no": "account_no",
			"account-name": "account_name",
			"account-short-name": "account_short_name",
			"account-ownership": "account_ownership",
			"scheme-type": "scheme_type",
			"scheme-code": "scheme_code",
			"account-gl-sub-head-code": "gl_sub_head_code",
			"account-product-group": "product_group",
			"last-transaction-date": "last_transaction_date",
			"account-open-date": "account_open_date",
			"estimated-yearly-transactions": "estimated_yearly_transactions",
			"estimated-monthly-transactions": "estimated_monthly_transactions",
			"estimated-yearly-turnover": "estimated_yearly_turnover",
			"estimated-monthly-turnover": "estimated_monthly_turnover",
			"regular-source-of-income": "regular_source_of_income",
			"source-of-fund": "source_of_fund",
			"account-notes": "notes",
			"nature-of-account": "nature_of_account",
			"scheme-description": "scheme_description",
			"dr-balance-limit": "dr_balance_limit",
			"deposite-amount": "deposite_amount",
			"customer-pan": "customer_pan",
			"customer-currency": "customer_currency"
			
		}
	
	populateKyclFieldsArray(accountsMappingInfo, data, "single-account-wrap", "Accounts info", "accounts-wrap",accountsLegalCounter);
}

function populateDocumentStatusInfo(data){
	
	
	var documentStatusMappingInfo = {
			"doc-stat-id": "id",
			"document-type": "document_type",
			"document-status": "document_status",
			"application-submitted-date": "appliction_submitted_date",
			"refresh-date": "refresh_date",
			"doc-stat-notes": "notes"
			
		}
	
	populateKyclFieldsArray(documentStatusMappingInfo, data, "single-document-status-wrap", "Document status info", "document-status-wrap",documentStatusLegalCounter);
}

