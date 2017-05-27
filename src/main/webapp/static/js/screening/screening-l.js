$(document).ready(function(){
    $(document).off("click", ".screening-review-l-btn").on("click", ".screening-review-l-btn", function() { 
        var $row = $(this).closest("tr");
        var id = $row.find(".id").text();        
        var url = "./screeningl/requestDetailForm?id="+ id;
        $.get(url, function(data) {
            $("#page-content").html(data);
        });
    });

    $(document).off("click", "#screening-l-response-btn").on("click", "#screening-l-response-btn", function(event){
        screeningLResponseSubmit(this);
    });
    
}); 

function screeningLReviewGenerateTable(tabledata, tableclass, targetdiv, extraTD="",extraTH=""){
    var tdstring = "";
    var headings = [];
    tdstring+="<table class=\"table table-hover " + tableclass + "\"><thead><tr>";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
        tdstring+="<th>"+index+"</th>";
    });   
    tdstring+=extraTH;
    tdstring+="</tr></thead><tbody>";
    //CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        tdstring+="<td class='id'>"+tabledata.data[i][headings[0]]+"</td>";
        for(j=1;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
        }
        tdstring+=extraTD;
        tdstring+= "</tr>";
    }
    tdstring+= "</tbody></table>";
    // Add table rows to target table tbody
    $('#'+targetdiv).html(tdstring);    
}

// function screeningNReviewCheckerGetAllJsonArray(){
//     post_data = {"msg_type": "screening-review-n-get-all-json-array"};
//     var request = $.ajax({
//         url: "./screeningNReviewCheckerGetAllJsonArray",
//         method: "POST",                                      
//         data: post_data,
//         dataType: "json",
//         contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
//     }); 
//     request.done(function ( response ){
//         screeningLReviewGenerateTable(response, "screening-search-tbl", "screening-review-n-results", "<td><button class=\"btn btn-primary btn-xs screening-review-n-btn\">Review...</button></td>", "<th></th>");
//         $('#screening-table-to-excel').show();
//     });
// }   // end of getPepSearchData

function screeningLReviewCheckerGetAllJsonArray(){
    post_data = {"msg_type": "screening-review-l-get-all-json-array"};
    var request = $.ajax({
        url: "./screeningLReviewCheckerGetAllJsonArray",
        method: "POST",                                      
        data: post_data,
        dataType: "json",
        mimeType: 'application/json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    }); 
    request.done(function ( response ){
        screeningLReviewGenerateTable(response, "screening-search-tbl", "screening-review-l-results", "<td><button class=\"btn btn-primary btn-xs screening-review-l-btn\">Review...</button></td>", "<th></th>");
        $('#screening-table-to-excel').show();
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
        screeningNResponseGenerateTable(response, "screening-n-response-tbl", "screening-n-response-results", "<td><button class=\"btn btn-primary btn-xs screening-view-n-btn\">View...</button></td>", "<th></th>");
        $('#screening-table-to-excel').show();
    });
}   // end of getPepSearchData


function checkerSearchPopulateLegalMatchWrap(data,div){
	
	
    var detailsVar = "screening-l-match-details";
   
    data = data[detailsVar];

    // $("#screening-n-match-info")
     $("#"+div)
            .html("<div class=\"col-md-12\" id=\"details-wrap-"+div +"\">\
                <div id=\"personal-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>UN Entity match</b></h4>\
                <div id=\"un-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>OFAC Entity match</b></h4>\
                <div id=\"ofac-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
                <h4><b>Adverse Media match</b></h4>\
                <div id=\"adverse-media-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
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
                <div id=\"KYCL-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
            	<h4><b>Accuity match</b></h4>\
                <div id=\"accuity-wrap-"+div +"\" style=\"overflow-x:auto\"></div>\
                <div class=\"clearfix\"></div><hr />\
            </div>")   
        var un = "UN entity";
        var ofac = "Ofac Entity";
        var ps = "Previous screening";
        var kycl = "KYCL details";
        var domestic = "Domestic risk";
        var adverse = "Adverse media details";
        var hotlist= "Hot list"
        var investigation="Investigation details"
        var accuity = "Accuity details";
        
        var prevScreeingDiv = "previous-screening-wrap-"+div +"";
        var domesticrisksdiv = "domestic-risk-wrap-"+div +"";
        var undiv = "un-wrap-"+div +"";
        var ofacdiv = "ofac-wrap-"+div +"";
        var kycldiv = "KYCL-wrap-"+div +"";
        var adversediv = "adverse-media-wrap-"+div +""
        var hotlistdiv="Hot-list-wrap-"+div +""
        var investigationdiv="Investigation-details-wrap-"+div +""
        var accuitydiv = "accuity-wrap-"+div +""
                                        
       
        var psData = JSON.parse(data[ps])
        $.each(psData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: psData
        }, prevScreeingDiv, 'previous-screening',"<td><button id='checker-psl-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

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

        
        var kyclData = JSON.parse(data[kycl])
        $.each(kyclData, function(index, item){
            if (item.hasOwnProperty("Similarity value")){
             delete item["Similarity value"]
            }
        });
        generateCheckerMatchTable({
            data: kyclData 
        }, kycldiv, 'KYCL',"<td><button id='checker-kycl-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");

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
        
//        var investigationData = JSON.parse(data[investigation])
//        $.each(investigationData, function(index, item){
//            if (item.hasOwnProperty("Similarity value")){
//             delete item["Similarity value"]
//            }
//        });
//        generateCheckerMatchTable({
//            data: investigationData
//        }, investigationdiv, 'Investigation',"<td><button id='checker-investigation-match-detail-btn' class='btn btn-primary btn-xs'>Details..</td>","<th>Action</th>");
        

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

function checkerLegalFindMatch(p1){
    
	  // var p1 =
		// changeObjectToFormData($(that).closest("form").serializeArray());
	    console.log("p1: ", p1);
	    // Selective fields for screening. Add here if a new field is added.
	    //var screeningFieldsName = [];
	    
	    //var data = filterData(p1, screeningFieldsName);   
	    
	    // console.log("Screening request data:", data);
	    
	    dataJson = JSON.stringify(p1);    
	    console.log("Data after stringify: ", dataJson);  
	    post_data = {"msg_type":"screening_n_request" , "data": dataJson}    
	    
	    var request = $.ajax({
	    	url: './screeningl/findMatchUsingFieldsChecker',
	        type: 'POST',
	        dataType: 'json',
	        data: post_data,
	        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	        async: false
	    });
	    request.done(function(response) {      
	        console.log("Match result: ", response);
	        checkerSearchPopulateLegalMatchWrap(response,"screening-l-match-info")
	    });
	    request.fail(function() {
	        console.log("error")
	    });     
	    
	}
