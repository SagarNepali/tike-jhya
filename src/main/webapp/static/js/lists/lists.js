function sanctionListGetCategoryCount(){
	var post_data = {msg_type: "sanction-list-category-count-sp", data: ""};	
	var request = $.ajax({
		url: "./sanctionLists/getCategoryCount",
		method: "POST",
		data: post_data,
		dataType: "json"
	});
	
	request.done(function (response){		
		Chart.defaults.global.legend = {enabled: false};
		generateTable(response, "sanction-list-category-count");		
		var table1data = response;
		generateBarGraph(table1data, "sanction-list-base");		
		// generateTable(response, "search-results", "<td><button class=\"btn btn-primary btn-xs\">Update</button></td>", "<th></th>");	                            	  
	});	
}	// end of
