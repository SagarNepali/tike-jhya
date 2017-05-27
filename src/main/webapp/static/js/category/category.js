var detailTable; 
var table;
var risk;
var risk_table;
$(document).ready(function() {

	
	$(document).off('focusout',"#insert-enum-val").on('focusout',"#insert-enum-val", function(){
		var val = $(this).val();
		if(val==""){
			$("#enum-val-error").show();
			$("#enum-val-error").html("Category Name Required");
			return;
		}
		$.ajax({
			url:"./enum/code-validate",
			method:"POST",
			data:{
				enum_code:val.trim(),
				table:table
			},
		}).done(function(response){
			if(response){
				$("#enum-val-error").hide();
				$("#btn-insert").removeAttr("disabled");
			} else{
				$("#enum-val-error").show();
				$("#enum-val-error").html("Category Name Already Exists");
				$("#btn-insert").attr("disabled","disabled");
			}	
			
		}).fail(function(){
			console.log("Server Netork Error");
		})
			
	});
	
	
	   var cTable;
	   

			$('#categoryTable').DataTable( {
				 "processing": true,
				"ajax": {
				    "url": "./enum/getEnumTable",
				    "type": "POST",
				    "dataSrc": function (json) {
				    	return json.table;
				        }
				  },
				
				
				 "columns": [
			            { "data":function (data, type, row, meta) { 
			            	return data["table_name"].replace("enum","").replace(/_/g," ").toUpperCase();
			            	} 
			            },
			            { "data": "table_descriptions" },
			            { 
	                        "data": function (data, type, row, meta) {
	                        	 return '<a class="category-info-table btn btn-info" href="./enum/details?table=' + data["table_name"] + '&risk='+ data["risk"] +' &risk_table='+ data["risk_table"]  +'">Detail</a>';
	                                  },"orderable": false
	                       },
			        ]
			   } );
		
	
	
	$("#category-table").click();
	
	var url;


	function getURLParameter(url, name) {
		
		return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [ , null ])[1];
	}

	var response = {};


	
	$("#btn-insert").on('click', function(e){
		
	    e.preventDefault();
		if($("#insert-enum-val").val()==""){
			alert("Category Code Required");
			return;
		}
		
		if($("#insert-description").val()==""){
			alert("Description Required");
			return;
		}
		
		if(!$("input[name=insert-optradio]").is(':checked')){
			 alert("Status Required");
			 return;
		 }
		
		
		var table = cTable;
		var enumcode = $("#insert-enum-val").val();
		var description = $("#insert-description").val();
		var status = $("input[name=insert-optradio]:checked").val();
		
		var request = {"table":table, field:[{"enumcode":enumcode,"description":description,"status":status}]};
		if(risk)
			request["risk_table"] = risk_table;
		else
			request["risk_table"] = "";
		$.ajax({
			url:"./enum/insert",
			data:JSON.stringify(request),
			method:"POST",
			beforeSend: function(xhr){
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
		}).done(function(response){
			$("#insertModal").modal("hide");
			if(response.httpStatusCode===200){			    	
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Success',
        		    message: 'Successfully Category Information Inserted',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        	}else{
        		
        		var dialog = bootbox.dialog({
	    			size: "small",
	    			title: 'Error',
	    		    message: 'Error Code : 0x'+response.httpStatusCode+response.errorLevelCode+response.errorCode+'<p> Please Contact to Administrator',
	    		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
	    		});
        	}
    		detailTable.ajax.reload();
		}).fail(function(data){
			console.log("Netork Server Error");
		});
		
	});
	
	$(document).off('click',"#btn-update").on('click',"#btn-update", function(e){
		
		e.preventDefault();
		
		if($("#enum-val").val()==""){
			alert("Enum Code Required");
			return;
		}
		
		if($("#description").val()==""){
			alert("Description Required");
			return;
		}
		if($("#reason").val()==""){
			alert("Reason Required");
			return;
		}
		
		if(!$("input[name=optradio]").is(':checked')){
			 alert("Status Required");
			 return;
		 }
		
		if(!$("#confirm").is(':checked')){
			 alert("Confirm Update");
			 return;
		 }
		
		
		
		var enumcode = $("#enum-val").val();
		
		var description = $("#description").val();
		
		var reason = $("#reason").val();
		
		var table = $("#realtion-name label").html();
		
		var status = $("input[name=optradio]:checked").val();
		
		var arrayField = [];
		var field = {"enumcode":enumcode,"description":description,"status":status};
		arrayField.push(field);
		
		
		var json = {};
		
		json["field"] = arrayField;
		json["table"] = table;
		json["reason"] = reason;
		if(risk)
			json["risk_table"] = risk_table;
		else
			json["risk_table"] = "";
		
		$.ajax({
			url:"./enum/update",
			method:"POST",
			data:JSON.stringify(json),
			beforeSend: function(xhr){
				xhr.setRequestHeader("Accept","application/json");
				xhr.setRequestHeader("Content-Type","application/json");
			},
		}).done(function(response){	
			$("#myModal").modal('hide');
	    	if(response.httpStatusCode===200){			    	
	    		var dialog = bootbox.dialog({
	    			size: "small",
	    			title: 'Success',
	    		    message: 'Successfuly Category Updated',
	    		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
	    		});
	    	}else{
	    		
	    		var dialog = bootbox.dialog({
	    			size: "small",
	    			title: 'Error',
	    		    message: 'Error Code : 0x'+response.httpStatusCode+response.errorLevelCode+response.errorCode+'<p> Please Contact to Administrator',
	    		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
	    		});
	    	}
	    	detailTable.ajax.reload();
		}).fail(function(){
			console.log("Server Not Responding");
		});
	});
	
	$(document).off('click',"#insert").on('click',"#insert", function(){
		$("#insertModal").modal("show");
		$("#insertEnumForm")[0].reset();
		$("#enum-val-error").hide();
		$("#btn-insert").removeAttr("disabled");
		cTable = table; //cTable is gloabl variable where table is data from url parms
	});
	
	
	// This 
	
	$(document).off("click", ".category-info-table").on("click", ".category-info-table", function(event){
        event.preventDefault();
        $("#page-content").html('<img src="${images}/loading.gif" alt="loading..." align="middle"/>');
        var url = $(this).attr('href');
        var options ={"Enable":true,"Disable":false};
        var labels ={"Individual":"individual","Account":"account"}
         table = getURLParameter(url, 'table');
         risk = getURLParameter(url, 'risk');
         risk_table = getURLParameter(url, 'risk_table');
        $.get(url, function(data) {             
            $("#page-content").html(data);
        });
        

			/*
			
			if(table=="enum_cards_subscribed" || table == "enum_service_subscribed"){
				detailTable = $('#categoryAdvanceDetail').DataTable( {
					 "processing": true,
					 "order": [[ 1, "asc" ]],
					 "ajax": {
						    "url": "./enum/getTable",
						    "type": "POST",
						    "data": function ( d ) {
				                d.table = table;
				            },
						    "dataSrc": function (json) {
						    	return json;
						        }
						  },
					 "columns": [
						      { 
		                        "data": function (data, type, row, meta) {
		                                          return '<input type="checkbox" disabled>';
		                                  },"orderable": false,"sClass": "check-box"
		                       },
				            { "data": "enumcode","sClass": "enum-code"},
				            { "data":function (data, type, row, meta) {
	                           return '<input type="text" value="'+ data["description"]+'" class="input-format">';
	                       	},"sClass": "description"
				            },
				            {
				            	"data": function(data,type,row,meta){
				                	var $select = $("<select id='select-status' class='form-control'></select>");
				                	$.each(options, function(key,value){
				                    	var $option = $("<option></option>", {
				                        	"text": key,
				                            "value": value
				                        });
				                        if(data["status"]=== value){
				                        	$option.attr("selected", "selected");
				                        } 
				                    	$select.append($option);
				                    });
				                    return $select.prop("outerHTML");
				                },"sClass": "status"
				            },
				            {
				            	"data": function(data,type,row,meta){
				                	var $select = $("<select id='select-label' class='form-control'></select>");
				                	$.each(labels, function(key,value){
				                    	var $option = $("<option></option>", {
				                        	"text": key,
				                            "value": value
				                        });
				                        if(data["label"]=== value){
				                        	$option.attr("selected", "selected");
				                        } 
				                    	$select.append($option);
				                    });
				                    return $select.prop("outerHTML");
				                },"sClass": "label"
				            },
				            
				            { "data": "disabled" },
				            
				            { 
		                        "data": function (data, type, row, meta) {
		                        	 return '<a class="btn btn-default category-info-details center" href="./enum/update?table=' + table + '"><i class="fa fa-pencil fa-fw"></i></a>';
		                                          
		                                  },"orderable": false, "width": "10%"
		                       },
				        ]
				       
				   } );
			} else {*/
				detailTable = $('#categoryDetail').DataTable( {
					 "processing": true,
					 "order": [[ 1, "asc" ]],
					 "ajax": {
						    "url": "./enum/getTable",
						    "type": "POST",
						    "data": function ( d ) {
				                d.table = table;
				            },
						    "dataSrc": function (json) {
						    	return json;
						        }
						  },
					 "columns": [
						      { 
		                        "data": function (data, type, row, meta) {
		                                          return '<input type="checkbox" disabled>';
		                                  },"orderable": false,"sClass": "check-box"
		                       },
				            { "data": "enumcode","sClass": "enum-code"},
				            { "data":function (data, type, row, meta) {
	                            return '<input type="text" value="'+ data["description"]+'" class="input-format">';
	                        	},"sClass": "description"
				            },
				            {
				            	"data": function(data,type,row,meta){
				                	var $select = $("<select id='select-status' class='form-control'></select>");
				                	$.each(options, function(key,value){
				                    	var $option = $("<option></option>", {
				                        	"text": key,
				                            "value": value
				                        });
				                        if(data["status"]=== value){
				                        	$option.attr("selected", "selected");
				                        } 
				                    	$select.append($option);
				                    });
				                    return $select.prop("outerHTML");
				                },"sClass": "status"
				            },
				            
				            { "data": "disabled" },
				            
				            { 
		                        "data": function (data, type, row, meta) {
		                        	 return '<a class="btn btn-default category-info-details center" href="./enum/update?table=' + table + '"><i class="fa fa-pencil fa-fw"></i></a>';
		                                          
		                                  },"orderable": false, "width": "10%"
		                       },
				        ]
				       
				   } );
			//}
			
			
			
			
			
    });
    
    var updateData = [];
    
    $(document).on('click', '#categoryDetail tbody input[type="checkbox"]', function(e){
		
	      var $row = $(this).closest('tr');
	      
	      if($(this).is(':checked')){
	      
		      var enumcode = $row.find("td.enum-code").text();
		      
		      var description = $row.find("td.description").find("input[type='text']").val();
		      
		      var status = $row.find("td.status").find("#select-status option:selected").val();
		      
		      var json = {"enumcode":enumcode,"description":description,"status":status};
		      var i;
		     if(updateData.length>0){
		      for ( i=0; i<updateData.length; i++) { //iterate through each object in an array
		    	     if (updateData[i]["enumcode"] == json["enumcode"] ) {
		    	    	 findAndRemove(updateData,"enumcode",updateData[i]["enumcode"]);
		    	    	 updateData.push(json);
		    	    	 break;
		    	      } 
		    	}
		      if(i==updateData.length){
		    	  updateData.push(json);
		      }
		      
		     }else{
		    	 updateData.push(json);
		     }

		      $("#updateAll").removeAttr("disabled");
	      }
	     
	});
    
    function findAndRemove(array, property, value) {
    	  array.forEach(function(result, index) {
    	    if(result[property] === value) {
    	      //Remove from array
    	      array.splice(index, 1);
    	    }    
    	  });
    	}
    $(document).on('click', '#categoryDetail tbody td', function(e){
		
    	if(detailTable.cell( this ).index().columnVisible==2){
    		var input = $(this).find('input');
    		input.removeClass("input-format");
    		if($(this).parent().find("td.check-box").find("input[type='checkbox']").is(':checked')){
    			$(this).parent().find("td.check-box").find("input[type='checkbox']").attr('checked', false);
    		}
    		$(this).parent().find("td.check-box").find("input[type='checkbox']").removeAttr("disabled");
    	}
    	if(detailTable.cell( this ).index().columnVisible==3){
    		if($(this).parent().find("td.check-box").find("input[type='checkbox']").is(':checked')){
    			$(this).parent().find("td.check-box").find("input[type='checkbox']").attr('checked', false);
    		}
    		$(this).parent().find("td.check-box").find("input[type='checkbox']").removeAttr("disabled");
    	}
    	
    	
	     
	});
    
     $(document).on("click","#updateAll" ,function(){
    	 $("#bulkModal").modal('show');
    	 $("#bulkUpdateForm")[0].reset();
    	 
    });
  
     $(document).off("click", ".category-info-details").on('click',".category-info-details", function(e){
 		e.preventDefault();
 		 var $row = $(this).closest('tr');
 		 var json = detailTable.row( $row ).data();
 		 $("#enumform")[0].reset();

		 $("#myModal").modal('show');
		 $("#myModal .modal-content .modal-body #realtion-name label").html($("#select option:selected").text());
	

		 
		 $("#enum-val").val(json["enumcode"]);
		 
		 $("#description").val(json["description"]);
		 
		 $("#realtion-name label").html(table);

		 if(json["status"]){
			 $("input[name=optradio][value='true']").prop("checked", true);
		 }else{
			 $("input[name=optradio][value='false']").prop("checked", true);
		 }
		
     
 		
 	});
     $(document).off('click',"#btn-bulk-update").on('click','#btn-bulk-update', function(e){
 		e.preventDefault();
 		 var reason = $("#bulk-reason").val();
    	 if(reason==""){
    		 alert("Reason Required");
			 return false;
    	 }
    	 
 		if(!$("#bulk-confirm").is(':checked')){
			 alert("Confirm Update");
			 return false;
		 }
 		var json ={};
 		json["field"] = updateData;
 		json["table"] = table;
 		json["reason"] = reason;
 		if(risk)
			json["risk_table"] = risk_table;
		else
			json["risk_table"] = "";
 		
    	 $.ajax({
    		url:"./enum/bulk/update",
    		data:JSON.stringify(json),
    		method:"POST",
    		beforeSend:function(xhr){
    			xhr.setRequestHeader("Accept","application/json");
    			xhr.setRequestHeader("Content-Type","application/json");
    		},
    	}).done(function(response){
    		$("#bulkModal").modal('hide');	
    		if(response.httpStatusCode===200){			    	
        		var dialog = bootbox.dialog({
        			size: "small",
        			title: 'Success',
        		    message: 'Successfully Category Inforamtion Updated',
        		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
        		});
        	}else{
        		
        		var dialog = bootbox.dialog({
	    			size: "small",
	    			title: 'Error',
	    		    message: 'Error Code : 0x'+response.httpStatusCode+response.errorLevelCode+response.errorCode+'<p> Please Contact to Administrator',
	    		    buttons: {
        		        confirm: {
        		            label: 'ok',
        		            className: 'btn-primary'
        		        }
        		    }
	    		});
        	}
    		detailTable.ajax.reload();
    		$("#updateAll").attr("disabled","disabled");
    	}).fail(function(){
    		console.log("Server Connection Error");
    	}); 
    	
    	
    	
 		
 	});
	
});