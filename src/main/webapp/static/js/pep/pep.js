
function pepGenerateTable(tabledata, tableclass, targetdiv, extraTD="",extraTH=""){
	  var tdstring = "";
	    var headings = [];
	    tdstring+="<table class=\"table table-hover " + tableclass + "\"><thead><tr>";
	    $.each(tabledata['data'][0],function(index, item){
	        if(index != "similarity_value"){
	        	headings.push(index);
	        	tdstring+="<th>"+index+"</th>";
	        }
	    });   
	    tdstring+=extraTH;
	    tdstring+="</tr></thead><tbody>";
	    var media;
	    // CREATE TABLE ROWS
	    for(i=0;i<tabledata.data.length;i++){
	        tdstring+="<tr>";
	        tdstring+="<td class='id'>"+tabledata.data[i][headings[0]]+"</td>";
	        for(j=1;j<headings.length;j++){
	        	media = tabledata.data[i][headings[j]]; 
	        	if( media == null){
	        		tdstring+="<td>"+"N/A"+"</td>";
	        	}else{
	        		media = media.substr(0,1).toUpperCase() + media.substr(1);
	        		tdstring+="<td>"+ media +"</td>";
	        	}
	        }
	        tdstring+=extraTD;
	        tdstring+= "</tr>";
	    }
	    tdstring+= "</tbody></table>";
	    // Add table rows to target table tbody
	    $('#'+targetdiv).html(tdstring);  
}

function pepGetAllJsonArray(){	
	$("#add-new-wrapper").html("<a href=\"#\" class=\"btn btn-info btn-sm pull-right\" id=\"add-new-pep-btn\"><i class=\"fa fa-plus\"></i> Add new</a>");
	var searchterm = $('#search-pep-text').val();	
	post_data = {msg_type:"pep-get-all-json-array", data:""};
	var request = $.ajax({
		url: "./pepGetAllJsonArray",
		method: "POST",		                            	 
		data: post_data,
		dataType: "json"
	});	
	request.done(function ( response ){
		// pepGenerateTable(response, "pep-search-tbl", "pep-search-results",
        // "<td><button class=\"btn btn-primary btn-xs
        // pep-detail-btn\">Details..</button></td>", "<th></th>");
		pepGenerateTable(response, "pep-search-tbl", "pep-search-results", "<td><button class=\"btn btn-primary btn-xs pep-detail-btn\">Details..</button></td>", "<th></th>");
		
   	});
}	// end of getPepListData

function pepGetCategoryCountSPJsonArray(){
	var post_data = {msg_type: "pep-category-count-sp", data: ""};	
	var request = $.ajax({
		url: "./pepGetCategoryCountSPJsonArray",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	
	request.done(function (response){
		var totalPEPs = 0;
		$.each(response['data'], function(key, value){			
			totalPEPs = totalPEPs + parseInt(value['Count']);
		});
		
		var updateString = "<h3>Total no. of high risk profiles: " + totalPEPs.toString() + ".</h3>";		
		$("#pep-count").html(updateString);
		
		Chart.defaults.global.legend = {enabled: false};
		generateTable(response, "pep-category-count");
		
		var table1data = response;
		generateBarGraph(table1data, "pep-base");		
		// generateTable(response, "pep-search-results", "<td><button
        // class=\"btn btn-primary btn-xs\">Update</button></td>", "<th></th>");
	});	
}		// end of getPepCountSP

function pepGetCount(){
	var post_data = {msg_type:"pep-count", data:""};
	var request = $.ajax({
		url: "./pepGetCount",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	request.done(function (response){		
		var updateString = "<h3>Total no. of PEP record: " + response['pepCount'] + ".</h3>";		
		$("#pep-count").html(updateString);		
	});
}	// end of getPepCount

function pepGetCountSP(){
	var post_data = {msg_type:"pep-count-sp", data:""};	
	var request = $.ajax({
		url: "./pepGetCountSP",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	
	request.done(function (response){		
		var updateString = "<h3>Total no. of PEP record: " + response['pepCount'] + ".</h3>";		
		$("#pep-count").html(updateString);		
	});
}	// end of getPepCountSP

function pepGetDetails(pepId){

	var url = "./getPepDetails?id="+pepId;
	$.get(url,function(data){
		//$("#page-content").html(data);
		
		 bootbox.dialog({
	            message: data,
	            title: "PEP Details",
	            buttons: {
	                success: {
	                    label: "OK!",
	                    className: "btn-primary",
	                },
	            }
	        });
	})
	
}

function pepGetOfficeSearchJsonArray(){	
	var searchterm = $('#search-pep-text').val();
	post_data = {"msg_type": "pep-search", "data": searchterm};
	var request = $.ajax({
		url: "./pepGetOfficeSearchJsonArray",
		method: "POST",		                            	 
		data: post_data,
		dataType: "json",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	});	
	request.done(function ( response ){
		
		if(response.data==null){
		//	bootbox.alert("No PEP found");
			bootBoxAlert();
		}else{
		
			pepGenerateTable(response, "pep-search-tbl", "pep-search-results", "<td><button class=\"btn btn-primary btn-xs pep-detail-btn\">Details...</button></td>", "<th></th>");
		$('#pep-table-to-excel').show();
		}
   	});
}	// end of getPepSearchData


