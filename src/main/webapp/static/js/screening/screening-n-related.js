var screeningNRequestGlobalCount = 0;
var screeningNRequestRelatedCount = 0;
var screeningNRequestMandateCount = 0;
var screeningNRequestSignatoryCount = 0;
var screeningNRelatedTabArray = [];
var screeningNRemovedTabArray = [];
var screeningNRelatedTabModifiedArray = {};
var filesArray = [];
var screeningNRelatedTabsAdded = false;

function screeningNRelatedProceedBtnClick(that) {    
    var thisId = $(that).attr('id');
    var relatedString = "screening-n-related-proceed-btn";    
    var length = relatedString.length;
    var idNumX = thisId.substr(length);
    
    // pushing the tab id to array
    var relatedTab = idNumX;   
    
    if(screeningNRelatedTabArray.indexOf(relatedTab) < 0 && screeningNRemovedTabArray.indexOf(relatedTab) < 0 ){        
        screeningNRelatedTabArray.push(relatedTab);    
    }

    var count = parseInt(idNumX.substr(0, idNumX.length - 1));    
    
    var totalTabs = screeningNRelatedTabArray.length;
    
    if (screeningNRequestRelatedCount > count) {
        count = count + 1;
        console.log("going to click on tab: ", count);
        $('#related-tab-' + count + 'x').click();        
    } else {
        screeningNReviewTabClick()
    }
    $("body").animate({
        scrollTop : "100px"
    });
}

function screeningNRequestRelatedFindMatch(that, idNumX){    
    var valid = true;    
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value){
        if($(value).val()=="")
            valid=false;                                    
    }) 
    if(valid==false){
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var disabledControls = $(that).closest("form").find(":disabled").removeAttr('disabled');    
    var data = changeObjectToFormData($(that).closest("form").serializeArray());        
    disabledControls.attr('disabled', 'disabled');
    
    $('#screening-n-related-proceed-btn' + idNumX).removeAttr('disabled');       
    screeningNRelatedTabModifiedArray[idNumX] = false;
    var relatedString = "related-";
    var relatedLength = relatedString.length;
    $.each(data, function(key, value){
        var keyLength = key.length;    
        if(key.indexOf(relatedString) >= 0){
            var normalizedKey = key.substr(relatedLength, keyLength - relatedLength);
            console.log("Normalized key: ", normalizedKey, "value: ", value)
            delete data[key];
            data[normalizedKey] = value;            
        }
    });    
    
    delete data["related_is_existing_customer"]; 
    delete data["accounts_n_sub_type"];
    delete data["notes"];
    data = JSON.stringify(data);      
  data = {"msg_type":"screening_n_request" , "data":data}
  
  var request = $.ajax({ 
      url: './screeningn/findRequestMatchUsingFields',  
      type: 'POST', 
      dataType: 'json', 
      data: data, 
      contentType:  'application/x-www-form-urlencoded; charset=UTF-8', 
      async: false });
  request.done(function(response) {
      screeningNRequestRelatedPopulateMatchWrap(response, idNumX) 
  }); 
  request.fail(function() {
      console.log("error") 
  });     
}


function screeningNRequestRelatedPopulateMatchWrap(data, idNumX){
    var detailsVar = "screening_n_match_details";    
    data = data[detailsVar];
    if (data.hasOwnProperty("Screening personal details"))
    {
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
    $("#related_request_wrap"+ idNumX).find("input").removeAttr('disabled');
    $("#related_request_wrap"+ idNumX).find("select").removeAttr('disabled');
        $("#related-n-match-info" + idNumX)
            .html("<div class=\"col-md-12\" id=\"details-wrap"+idNumX+"\">\
                <h4><b>Details:</b></h4>\
                <div id=\"personal-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Previous Screening</b></h4>\
                <div id=\"previous-screening-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>PEP</b></h4>\
                <div id=\"pep-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Adverse Media</b></h4>\
                <div id=\"adverse-media-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Domestic Risk</b></h4>\
                <div id=\"domestic-risk-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>UN details</b></h4>\
                <div id=\"un-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>OFAC details</b></h4>\
                <div id=\"ofac-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>KYCN details</b></h4>\
                <div id=\"KYCN-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Hot-list details</b></h4>\
                <div id=\"Hot-list-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Investigation details</b></h4>\
                <div id=\"Investigation-details-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Accuity Details</b></h4>\
                <div id=\"accuity-wrap"+idNumX+"\" style=\"overflow-x:auto\"></div>\
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
        
        var prevScreeingDiv = "previous-screening-wrap"+idNumX;
        var domesticrisksdiv = "domestic-risk-wrap"+idNumX;
        var undiv = "un-wrap"+idNumX;
        var ofacdiv = "ofac-wrap"+idNumX;
        var kycndiv = "KYCN-wrap"+idNumX;
        var adversediv = "adverse-media-wrap"+idNumX;
        var pepdiv = "pep-wrap"+idNumX;  
        var hotlistdiv="Hot-list-wrap"+idNumX;
        var investigationdiv="Investigation-details-wrap"+idNumX;
        var accuitydiv = "accuity-wrap"+idNumX;
                                        
        var pepData = JSON.parse(data[pep])
        $.each(pepData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: pepData
        }, pepdiv, 'pep',"","<td><button id=\"pep-match-detail-btn\"  class=\"btn btn-primary btn-xs \">Details...</button></td>", "<th>Action</th>");

        var psData = JSON.parse(data[ps])
        $.each(psData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: psData
        }, prevScreeingDiv, 'previous-screening',"","<td><button id=\"prev-screening-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var domesticData = JSON.parse(data[domestic])
        $.each(domesticData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: domesticData
        }, domesticrisksdiv, 'domestic');

        var adverseData = JSON.parse(data[adverse])
        $.each(adverseData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: adverseData
        }, adversediv, 'adverse',"","<td><button id=\"adverse-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var kycnData = JSON.parse(data[kycn])
        $.each(kycnData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: kycnData
        }, kycndiv, 'KYCN',"","<td><button id=\"kycn-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");

        var unData = JSON.parse(data[un])
        $.each(unData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: unData
        }, undiv, 'UN',"","<td><button class=\"btn btn-primary btn-xs \" id=\"un-match-detail-btn\">Details...</button></td>", "<th><b>Action</b></th>");
        
        var ofacData = JSON.parse(data[ofac])
        $.each(ofacData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: ofacData
        }, ofacdiv, 'OFAC',"","<td><button id =\"ofac-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var hotlistData = JSON.parse(data[hotlist])
        $.each(hotlistData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: hotlistData
        }, hotlistdiv, 'HotList',"","<td><button id=\"hotlist-match-detail-btn\"class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var investigationData = JSON.parse(data[investigation])
        $.each(investigationData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: investigationData
        }, investigationdiv, 'Investigation',"","<td><button id=\"investigation-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
        var accuityData = JSON.parse(data[accuity])
        $.each(accuityData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateScreeningNRelatedMatchTable(idNumX, {
            data: accuityData
        }, accuitydiv, 'accuity',"","<td><button id=\"accuity-match-detail-btn\" class=\"btn btn-primary btn-xs match-detail-btn\">Details...</button></td>", "<th>Action</th>");
        
}

function generateScreeningNRelatedMatchTable(idNumX, tabledata, targetdiv, name = "",hideData=[], extraTD = "", extraTH = "", id = false) {    
    if (tabledata['data'] == null) {
        $("#" + targetdiv).html("<h4>No data found</h4>");
        return false;
    }
    var tdstring = "";
    var headings = [];
    tdstring += "<table class=\"table table-hover table-bordered\"><thead><tr>";
    tdstring += "<th>Match</th>";
    if (id == true) {
        tdstring += "<th>ID</th>"
    }
    $.each(tabledata['data'][0], function(index, item) {
    	headings.push(index);  
    	if(hideData.indexOf(index)>-1){
            tdstring+="<th style='display:none'>"+index+"</th>";
            headings.pop(index)
             
         }else{
         tdstring += "<th style='font-size: 14px;'>" + turnKeyToHeader(index) + "</th>";
         }
    });
    tdstring += extraTH;
    tdstring += "</tr></thead><tbody>";
    // CREATE TABLE ROWS
    for (i = 0; i < tabledata.data.length; i++) {
        tdstring += "<tr>";
        if (id == true) {
            tdstring += "<td>" + (i + 1) + "</td>";
        }
        tdstring += "<td><input type='radio' name='"  + name + "' id='"+tabledata.data[i]['ID']+idNumX+"'></td>";
        for (j = 0; j < headings.length; j++) {
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

function populateRelatedKycnDetailsForScreening(idNumX, data) {
    var relatedMappingInfo = {
    	"related-salutation":"Salutation",
        "related-first-name" : "First name",
        "related-middle-name" : "Middle name",
        "related-last-name" : "Last name",
        "related-lsf-name" : "नाम",
        "related-lsm-name" : "बीचको नाम",        
        "related-lsl-name" : "थर",
        "related-gender" : "Gender",
        "related-zone" : "State",
        "related-pan-number" : "Pan number",
        "related-date-of-birth" : "Date of birth",        
        "related-primary-identification-document-type": "Primary identification type",
        "related-primary-identification-document-no":"Primary identification no",
        "related-country-of-issue":"Country",
        "related-zone":"Zone",
        "related-district":"District",
        "related-mn-vdc":"MN/VDC"        
    };
    $.each(relatedMappingInfo, function(index, value) {
        content = data[0][value];
        if (content != "" && content != undefined) {
            //console.log("Setting value of #" + index + idNumX + " to " + content);
            $("#" + index + idNumX).val(content);
        }
    });
}

function screeningNAddRelated() {    
    screeningNRequestRelatedCount++;
    screeningNRelatedTabsAdded = true;    
    var targetIdx = screeningNRequestRelatedCount + 'x';
    console.log("targetIdx", targetIdx)
    // screeningNRequestInit
    var relatedHtmlContent = $('#related-template').html();
    relatedHtmlContent = relatedHtmlContent.replace(new RegExp('0x"', 'g'), targetIdx + '"');
    
    $('#myTabContent').append(relatedHtmlContent);
    //     bind events to new tab
    $('#related-date-of-birth' + targetIdx).daterangepicker({
        singleDatePicker : true,
        showDropdowns : true,
        minDate : new Date(1900, 1, 1),
        maxDate : new Date()
    }, function(start, end, label) {
        $('#related-date-of-birth' + targetIdx).val(start.format("YYYY-MM-DD"));
    });
    var tabContent = '<li role="presentation">' + '<a href="#related-content' + targetIdx + '" id="related-tab-' + targetIdx + '" role="tab" data-toggle="tab" aria-expanded="true">' + 'Related ' + screeningNRequestRelatedCount + '</a></li>';
    $('#screeningnTabs').append(tabContent);
    screeningNRelatedTabModifiedArray[targetIdx] = true;

    // change name of tab to relevant
    $(document).off('change', '.accounts-n-sub-type').on('change', '.accounts-n-sub-type', function() {
        var thisId = $(this).attr('id');
        var relatedString = "related-"
        var thisCustomerType = $('#' + thisId + ' option:selected').text();
        var length = (relatedString + 'accounts-n-sub-type').length;
        var thisTargetIdx = thisId.substr(length);
        $('#related-tab-' + thisTargetIdx).text(thisCustomerType);
    });
    
    $(document).off('change', '.track-changes' + targetIdx).on('change', '.track-changes' + targetIdx, function () {
        $('#screening-n-related-proceed-btn' + targetIdx).attr('disabled', 'disabled');
        $('#related-n-match-info' + targetIdx).html("");
        screeningNRelatedTabModifiedArray[targetIdx] = true;
        
    });

    $('#related-tab-' + targetIdx).click();
}
