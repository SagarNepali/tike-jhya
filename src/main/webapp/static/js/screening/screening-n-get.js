function filterData(dataArray, screeningFieldsName){    
    $.each(dataArray, function(key, value){
        if($.inArray(key, screeningFieldsName) < 0){
            delete dataArray[key];
        }
    });
    return dataArray;
}

function screeningNRequestFindMatch(that){
    var valid = true;
    
    var fieldsToCheck = $(that).closest("form").find(":required");
    
    $.each(fieldsToCheck, function(index, value){
        // console.log("Val of value " + $(value).attr("name") + ": " +
		// $(value).val());
        if($(value).val()=="" )
            valid=false;                                    
    });
    
    // console.log("Valid: ", valid)
    if(valid==false){
        $(that).closest('form').find(".formSubmit").click(); 
        // $(that).closest('form').submit();
        return false;
    }
    else{
        $("#screening-add-attachments").removeAttr("disabled");
        $("#screening-n-primary-proceed-btn").removeAttr("disabled");
    }
    var p1 = changeObjectToFormData($(that).closest("form").serializeArray());
// console.log("p1: ", p1);
    // Selective fields for screening. Add here if a new field is added.
    var screeningFieldsName = ["first_name", "middle_name", "last_name", 
        "lsf_name", "lsm_name", "lsl_name", "date_of_birth", 
        "primary_identification_document_no", "country_of_issue", "zone", 
        "district", "mn_vdc", "find_match_index"];
    
    var data = filterData(p1, screeningFieldsName);   
    
// console.log("Data after filter: ", data);
    
    // console.log("Screening request data:", data);
    data["has_kycn"] = $("#has-kycn").is(":checked");
    
    if($("#has-kycn").is(":checked")){
        data["kycn_id"] = $("#kycn-id").val();    
    }  
    
    dataJson = JSON.stringify(data);    
// console.log("Data after stringify: ", dataJson);
    post_data = {"msg_type":"screening_n_request" , "data": dataJson}    
    
    var request = $.ajax({
        url: './screeningn/findRequestMatchUsingFields',
        type: 'POST',
        dataType: 'json',
        data: post_data,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    request.done(function(response) {      
// console.log("Match result: ", response);
        screeningNRequestPopulateMatchWrap(response)
        
    });
    request.fail(function() {
        console.log("error")
    });     
    
}
function screeningNRequestPopulateMatchWrap(data){
    var detailsVar = "screening_n_match_details";
    if(data[detailsVar] == null){
          $('.message-title').html("No records found in KYC.");
          $('#submit-message-modal').modal();    
          var url = "./screeningn/requestForm";
            $('#submit-message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function(){
                $.get(url, function(data) {             
                    $("#page-content").html(data);
                });            
            });
            return;
    }
    data = data[detailsVar];
    if (data.hasOwnProperty("Screening personal details"))
    {
    	if(data["Screening personal details"]!=null){
        var PD = JSON.parse(data["Screening personal details"]);
        // insert matched data into form above button
        $("#first-name").val(PD[0]["First name"]);
        $("#middle-name").val(PD[0]["Middle name"]);
        $("#last-name").val(PD[0]["Last name"]);
        $("#lsf-name").val(PD[0]["नाम"]);
        $("#lsm-name").val(PD[0]["बीचको नाम"]);
        $("#lsl-name").val(PD[0]["थर"]);
        $("#date-of-birth").val(PD[0]["Date of birth"]);
        $("#primary-identification-document-type").append("<option value='"+PD[0]["Primary identification type"]+"' selected='selected'>"+PD[0]["Primary identification type"]+"</option>");
        $("#primary-identification-document-no").val(PD[0]["Primary identification no."]);
        $("#country-of-issue").find("option[value='"+PD[0]["Country of issue"]+"']").attr("selected","selected");
        $("#state").val(PD[0]["State"]);
        $("#district").val(PD[0]["District"]);
        $("#mn-vdc").val(PD[0]["MN/VDC"]);
    	}
    }
    $("#screening_request_wrap").find("input").removeAttr('disabled');
    $("#screening_request_wrap").find("select").removeAttr('disabled');
    $("#screening-n-match-info")
            .html("<div class=\"col-md-12\" id=\"details-wrap\">\
                <div id=\"personal-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>UN match</b></h4>\
                <div id=\"un-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>OFAC match</b></h4>\
                <div id=\"ofac-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Adverse Media match</b></h4>\
                <div id=\"adverse-media-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>PEP match</b></h4>\
                <div id=\"pep-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Hot-list match</b></h4>\
                <div id=\"Hot-list-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Investigation match</b></h4>\
                <div id=\"Investigation-details-wrap\" style=\"overflow-x:auto\"></div>\
                <h4><b>Domestic risk match</b></h4>\
                <div id=\"domestic-risk-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Previous screening match</b></h4>\
                <div id=\"previous-screening-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Existing KYC match</b></h4>\
                <div id=\"KYCN-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                 <h4><b>Accuity match</b></h4>\
                <div id=\"accuity-wrap\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
            </div>")   
        var un = "UN details";
        var ofac = "OFAC details";
        var ps = "Previous screening";
        var kycn = "KYCN details";
        var pep = "PEP details";
        var domestic = "Domestic risk";
        var adverse = "Adverse media";
        var hotlist= "Hot list details"
        var investigation="Investigation details"
        var accuity = "Accuity details";
        
        var prevScreeingDiv = "previous-screening-wrap";
        var domesticrisksdiv = "domestic-risk-wrap";
        var undiv = "un-wrap";
        var ofacdiv = "ofac-wrap";
        var kycndiv = "KYCN-wrap";
        var adversediv = "adverse-media-wrap"
        var pepdiv = "pep-wrap";  
        var hotlistdiv="Hot-list-wrap"
        var investigationdiv="Investigation-details-wrap"
        var accuitydiv = "accuity-wrap"
                                        
        var pepData = JSON.parse(data[pep])
        $.each(pepData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: pepData
        }, pepdiv, 'pep'," ","<td><button id=\"pep-match-detail-btn\"  class=\"btn btn-primary btn-xs \">Details...</button></td>", "<th>Action</th>");
        
        var psData = JSON.parse(data[ps])
        $.each(psData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: psData
        }, prevScreeingDiv, 'previous-screening'," ","<td><button id=\"prev-screening-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var domesticData = JSON.parse(data[domestic])
        $.each(domesticData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: domesticData
        }, domesticrisksdiv, 'domestic');

        var adverseData = JSON.parse(data[adverse])
        $.each(adverseData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: adverseData
        }, adversediv, 'adverse'," ","<td><button id=\"adverse-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var kycnData = JSON.parse(data[kycn])
        $.each(kycnData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: kycnData
        }, kycndiv, 'KYCN'," ","<td><button id=\"kycn-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var unData = JSON.parse(data[un])
        $.each(unData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: unData
        }, undiv, 'UN',"","<td><button class=\"btn btn-primary btn-xs \" id=\"un-match-detail-btn\">Details...</button></td>", "<th><b>Action</b></th>");
        
        var ofacData = JSON.parse(data[ofac])
        $.each(ofacData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: ofacData
        }, ofacdiv, 'OFAC',"","<td><button id =\"ofac-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var hotlistData = JSON.parse(data[hotlist])
        $.each(hotlistData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: hotlistData
        }, hotlistdiv, 'HotList',"","<td><button class=\"btn btn-primary btn-xs\" id=\"hotlist-match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var investigationData = JSON.parse(data[investigation])
        $.each(investigationData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: investigationData
        }, investigationdiv, 'Investigation',"","<td><button id=\"investigation-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var accuityData = JSON.parse(data[accuity])
        $.each(accuityData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningMatchTable({
            data: accuityData
        }, accuitydiv, 'accuity',"","<td><button id=\"accuity-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
}
function displayScreeningNReplyDetail(that){
    var $row = $(that).closest("tr");
    var id = $row.find(".id").text();        
    var url = "./screeningn/replyViewDetailsForm?id="+ id;
    $.get(url, function(data) {
        $("#page-content").html(data);
    }); 
}
function screeningNResponseMakerGetAllJsonArray(){
    post_data = {"msg_type": "screening-n-response-maker-get-all-json-array"};
    var request = $.ajax({
        url: "./screeningNResponseMakerGetAllJsonArray",
        method: "POST",                                      
        data: post_data,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    }); 
    request.done(function ( response ){
        generateTable(response, "screening-n-response-tbl", "screening-n-response-results", "<td><button class=\"btn btn-primary btn-xs screening-view-n-btn\">View...</button></td>", "<th></th>");
        $('#screening-table-to-excel').show();
    });
}
// for checker


function checkerFindMatch(p1){
    
  // var p1 =
	// changeObjectToFormData($(that).closest("form").serializeArray());
    console.log("p1: ", p1);
    // Selective fields for screening. Add here if a new field is added.
    var screeningFieldsName = ["first_name", "middle_name", "last_name", 
        "lsf_name", "lsm_name", "lsl_name", "date_of_birth", 
        "primary_identification_document_no", "country_of_issue", "zone", 
        "district", "mn_vdc", "find_match_index"];
    
    var data = filterData(p1, screeningFieldsName);   
    
    // console.log("Screening request data:", data);
    
    dataJson = JSON.stringify(data);    
    console.log("Data after stringify: ", dataJson);  
    post_data = {"msg_type":"screening_n_request" , "data": dataJson}    
    
    var request = $.ajax({
    	url: './screeningn/findRequestMatchUsingFieldsForChecker',
        type: 'POST',
        dataType: 'json',
        data: post_data,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: false
    });
    request.done(function(response) {      
        console.log("Match result: ", response);
        checkerSearchPopulateMatchWrap(response,"screening-n-match-info")
    });
    request.fail(function() {
        console.log("error")
    });     
    
}

function checkerSearchPopulateMatchWrap(data,div){
    var detailsVar = "screening_n_match_details";
   
    data = data[detailsVar];
  
    // $("#screening-n-match-info")
     $("#"+div)
            .html("<div class=\"col-md-12\" id=\"details-wrap-"+div +"\">\
                <div id=\"personal-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>UN match</b></h4>\
                <div id=\"un-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>OFAC match</b></h4>\
                <div id=\"ofac-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Adverse Media match</b></h4>\
                <div id=\"adverse-media-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>PEP match</b></h4>\
                <div id=\"pep-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Hot-list match</b></h4>\
                <div id=\"Hot-list-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Investigation match</b></h4>\
                <div id=\"Investigation-details-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <h4><b>Domestic risk match</b></h4>\
                <div id=\"domestic-risk-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Previous screening match</b></h4>\
                <div id=\"previous-screening-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Existing KYC match</b></h4>\
                <div id=\"KYCN-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
            	<h4><b>Accuity match</b></h4>\
                <div id=\"accuity-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
            </div>")   
        var un = "UN details";
        var ofac = "OFAC details";
        var ps = "Previous screening";
        var kycn = "KYCN details";
        var pep = "PEP details";
        var domestic = "Domestic risk";
        var adverse = "Adverse media";
        var hotlist= "Hot list details"
        var investigation="Investigation details"
        var accuity = "Accuity details";
        
        var prevScreeingDiv = "previous-screening-wrap-"+div +"";
        var domesticrisksdiv = "domestic-risk-wrap-"+div +"";
        var undiv = "un-wrap-"+div +"";
        var ofacdiv = "ofac-wrap-"+div +"";
        var kycndiv = "KYCN-wrap-"+div +"";
        var adversediv = "adverse-media-wrap-"+div +""
        var pepdiv = "pep-wrap-"+div +"";  
        var hotlistdiv="Hot-list-wrap-"+div +""
        var investigationdiv="Investigation-details-wrap-"+div +""
        var accuitydiv = "accuity-wrap-"+div +""
                                        
        var pepData = JSON.parse(data[pep])
        $.each(pepData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: pepData
        }, pepdiv, 'pep',"<td><button id='checker-pep-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

        var psData = JSON.parse(data[ps])
        $.each(psData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: psData
        }, prevScreeingDiv, 'previous-screening',"<td><button id='checker-ps-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

        var domesticData = JSON.parse(data[domestic])
        $.each(domesticData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: domesticData
        }, domesticrisksdiv, 'domestic');

        var adverseData = JSON.parse(data[adverse])
        $.each(adverseData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: adverseData
        }, adversediv, 'adverse',"<td><button id='checker-adverse-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

        
        var kycnData = JSON.parse(data[kycn])
        $.each(kycnData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: kycnData 
        }, kycndiv, 'KYCN',"<td><button id='checker-kyc-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

        var unData = JSON.parse(data[un])
        $.each(unData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: unData
        }, undiv, 'UN',"<td><button id='checker-un-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        
        var ofacData = JSON.parse(data[ofac])
        $.each(ofacData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: ofacData
        }, ofacdiv, 'OFAC',"<td><button id='checker-ofac-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        
        var hotlistData = JSON.parse(data[hotlist])
        $.each(hotlistData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: hotlistData
        }, hotlistdiv, 'HotList',"<td><button id='checker-hotlist-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        
        var investigationData = JSON.parse(data[investigation])
        $.each(investigationData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: investigationData
        }, investigationdiv, 'Investigation',"<td><button id='checker-investigation-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        

        var accuityData = JSON.parse(data[accuity])
        $.each(accuityData, function(index, item){
        	if (item.hasOwnProperty("Similarity value")){
        		delete item["Similarity value"]
        	}
        });
        generateCheckerMatchTable({
        	data: accuityData
        }, accuitydiv, 'accuity',"<td><button id='checker-accuity-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        
}

function generateCheckerMatchTable(tabledata, targetdiv, name = "", extraTD = "", extraTH = "", id = false) {    
    if (tabledata['data'] == null) {
        $("#" + targetdiv).html("<h4>No data found</h4>");
        return false;
    }
    var tdstring = "";
    var headings = [];
    tdstring += "<table class=\"table table-hover table-bordered\"><thead><tr>";
    if (id == true) {
        tdstring += "<th>ID</th>"
    }
    $.each(tabledata['data'][0], function(index, item) {
          headings.push(index);                                                                                   
          tdstring += "<th style='font-size: 14px;'>" + turnKeyToHeader(index) + "</th>";
    });
    tdstring += extraTH;
    tdstring += "</tr></thead><tbody>";
    // CREATE TABLE ROWS
    for (i = 0; i < tabledata.data.length; i++) {
        tdstring += "<tr>";
        if (id == true) {
            tdstring += "<td>" + (i + 1) + "</td>"
        }
        tdstring+="<td class='id'>"+tabledata.data[i][headings[0]]+"</td>";
        for (j = 1; j < headings.length; j++) {
            if(tabledata.data[i][headings[j]]==null)
                tabledata.data[i][headings[j]] = "";
                key = turnHeaderToKey(headings[j]);
                tdstring += "<td class='" + key + "'>" + tabledata.data[i][headings[j]] + "</td>";
        }
        tdstring += extraTD;        
        tdstring += "</tr>";
    }
    tdstring += "</tbody></table>";
    // Add table rows to target table tbody
    $('#' + targetdiv).html(tdstring);
}


$(document).off('click',"#checker-kyc-match-detail-btn").on('click',"#checker-kyc-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"kycn");
	
});

$(document).off('click',"#checker-ps-match-detail-btn").on('click',"#checker-ps-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"ps");
	
});

$(document).off('click',"#checker-accuity-match-detail-btn").on('click',"#checker-accuity-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"accuity");
	
});

$(document).off('click',"#checker-investigation-match-detail-btn").on('click',"#checker-investigation-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"investigation");
	
});

$(document).off('click',"#checker-hotlist-match-detail-btn").on('click',"#checker-hotlist-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"hotlist");
	
});

$(document).off('click',"#checker-adverse-match-detail-btn").on('click',"#checker-adverse-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"adverse");
	
});

$(document).off('click',"#checker-ofac-match-detail-btn").on('click',"#checker-ofac-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"ofac");
	
});

$(document).off('click',"#checker-un-match-detail-btn").on('click',"#checker-un-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	
	populateDetailsInBootBox(id,"un");
	
});

$(document).off('click',"#checker-pep-match-detail-btn").on('click',"#checker-pep-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	populatePepDetailsInBootBox(id);
});

$(document).off('click',"#checker-unentity-match-detail-btn").on('click',"#checker-unentity-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".id").text();  
	populateDetailsInBootBox(id,"un-entity");
});

$(document).off('click',"#hotlist-match-detail-btn").on('click',"#hotlist-match-detail-btn",function(e){
	
	e.preventDefault();
	var $row = $(this).closest("tr");
	var id = $row.find(".iD").text();  
	populateDetailsInBootBox(id,"hotlist");
});


function populatePepDetailsInBootBox(id){
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
}

function populateDetailsInBootBox(id,name){
	var url = "./screeningn/getMatchDetails?id=" + id
	+ "&name='"+name+"'";
$.get(url, function(data) {

bootbox.dialog({
	 
	size: "large",
	message : data,
	title : name.toUpperCase()+" Details",
	buttons : {
		success : {
			label : "OK!",
			className : "btn-primary",
		},
	}
});
})
}
