/* ====================================
   Event listeners 
   ==================================== */
$(document).ready(function(){
	// click on the search-un-btn
	$(document).off("click", "#search-un-individual-btn").on("click", "#search-un-individual-btn", function(){	
		// getPepSearchJsonArray();
		unGetSearchIndividualJsonArray();
	});	

	// press 'enter' in the search-un-text
	$(document).off("keydown", "#search-un-individual-text").on("keydown", "#search-un-individual-text", function(event){		
		// event.preventDefault();
		if (event.keyCode == 13 || event.which == 13){			
			unGetSearchIndividualJsonArray();
		}		
	});	
	
	// click on the search-un-btn
	$(document).off("click", "#search-un-entity-btn").on("click", "#search-un-entity-btn", function(){	
		// getPepSearchJsonArray();
		unGetSearchEntityJsonArray();
	});	

	// press 'enter' in the search-un-text
	$(document).off("keydown", "#search-un-entity-text").on("keydown", "#search-un-entity-text", function(event){		
		// event.preventDefault();
		if (event.keyCode == 13 || event.which == 13){			
			unGetSearchEntityJsonArray();
		}		
	});
});

function unGetLastUpdateDate(){
	var post_data = {msg_type:"un-last-updated", data:""};	
	var request = $.ajax({
		url: "./unGetLastUpdateDate",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	
	request.done(function (response){		
		var updateString = "<h3>UN Sanction List <small>Last update date: " + response['unLastUpdateDate'] + ".</small></h3>";		
		$("#un-last-update-date").html(updateString);		
	});
}	// end of getPepCountSP


function unIndividualGetCount(){
	var post_data = {msg_type:"un-individual-count", data:""};
	var request = $.ajax({
		url: "./unIndividualGetCount",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	request.done(function (response){		
		var updateString = "<h3>Total no. of PEP record: " + response['unIndividualCount'] + ".</h3>";		
		$("#un-individual-count").html(updateString);		
	});
}	// end of

function unGetAllIndividualJsonArray(){
	var searchterm = $('#search-un-text').val();	
	post_data = {msg_type:"un-get-all-individual-json-array", data:""};
	var request = $.ajax({
		url: "./unGetAllIndividualJsonArray",
		method: "POST",		                            	 
		data: post_data,
		dataType: "json"
	});	
	request.done(function ( response ){
		unGenerateTable(response, "search-results", "<td><button class=\"btn btn-primary btn-xs\">Details</button></td>", "<th></th>");		                            	  
   	});
}	// end of

function unGetSearchEntityJsonArray(){	
	var searchterm = $('#search-un-entity-text').val();	
	post_data = {"msg_type": "un-entity-search", "data": searchterm};
	var request = $.ajax({
		url: "./unGetSearchEntityJsonArray",
		method: "POST",		                            	 
		data: post_data,
		dataType: "json",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	});	
	request.done(function ( response ){
		unGenerateTable(response, "un-search-entity-results", "", "<th></th>");				                            	  
		// unGenerateTable(response, "un-search-entity-results", "<td><button class=\"btn btn-primary btn-xs\">Details...</button></td>", "<th></th>");
   	});
	request.fail(function(response){
		bootBoxAlert();
	});
}	// end of


function unGetSearchIndividualJsonArray(){	
	var searchterm = $('#search-un-individual-text').val();	
	post_data = {"msg_type": "un-individual-search", "data": searchterm};
	var request = $.ajax({
		url: "./unGetSearchIndividualJsonArray",
		method: "POST",		                            	 
		data: post_data,
		dataType: "json",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	});	
	request.done(function ( response ){
		//unGenerateTable(response, "un-search-individual-results", "<td><button class=\"btn btn-primary btn-xs\">Details...</button></td>", "<th></th>");
		unGenerateTable(response, "un-search-individual-results", "", "<th></th>");
   	});
	
	request.fail(function(response){
		bootBoxAlert();
	});
	
}	// end o


function unGenerateTable(tabledata, targetdiv, extraTD="",extraTH=""){
    var tdstring = "";
    var headings = [];
    tdstring+="<table class=\"table table-hover\"><thead><tr>";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
        tdstring+="<th>"+index+"</th>";
    });   
    tdstring+=extraTH;
    tdstring+="</tr></thead><tbody>";
    // CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        for(j=0;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
        }
        tdstring+=extraTD;
        tdstring+= "</tr>";
    }
    tdstring+= "</tbody></table>";
    // Add table rows to target table tbody
    $('#'+targetdiv).html(tdstring);    
}
