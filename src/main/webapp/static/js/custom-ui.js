$(document).off('click', '#print-btn').on('click', '#print-btn', function(){
   window.print(); 
});

function getOptionValue(selectors){
    var post_data = {msg_type:"options", data: JSON.stringify(selectors)}
    var request = $.ajax({
      url: "./getCategories",
      method: "POST",
      data: post_data,
      dataType: "json",
      async: false
    });     
    request.done(function( response ) {             
        var i = 0;
        $.each(response["data"], function(index, value){
            populateOptions(selectors[i++], value)
        });
    });     
    request.fail(function( jqXHR, textStatus ) {
      console.log( "Request failed: " + textStatus );
    });
}

function populateOptions(selector, data){    
    $.each(data, function(i, item){
        $("."+selector).append("<option value='"+item+"'>"+item+"</option>");
    })
}

function getOptionValueForId(selectors){
    var post_data = {msg_type:"options", data: JSON.stringify(selectors)}
    var request = $.ajax({
      url: "./getCategories",
      method: "POST",
      data: post_data,
      dataType: "json",
      async: false
    });     
    request.done(function( response ) {           	
        var i = 0;
        $.each(response["data"], function(index, value){
            populateOptionsForId(selectors[i++], value)
        });
    });     
    request.fail(function( jqXHR, textStatus ) {
      console.log( "Request failed: " + textStatus );
    });
}

function populateOptionsForId(selector, data){
    console.log("Selector: " , selector)
    var id = $("." + selector).attr("id");
    
    var enumLength = $("#" + id + " option").size() - 2;
    
    for(var i = 0; i < enumLength; i++){
        $("#"+id + " option").remove();
    }
    
    $.each(data, function(i, item){
        $("#"+id).append("<option value='"+item+"'>"+item+"</option>");
    })
}

function generateTable(tabledata, tableclass, targetdiv, extraTD="",extraTH="",hideData=[]){
	if(tabledata['data']== null){
	        return;
	}
    var tdstring = "";
    var headings = [];
    tdstring+='<div id="filterrequests" class="pull-right">\
		<input id="filter-text-'+targetdiv+'" name="filter_text" placeholder="Enter keyword" type="text" style="margin-right: 4px;" />\
			<button class="btn btn-primary btn-sm" type="button" id="showall-'+targetdiv+'" disabled="disabled">Show all </button>\
		</div>';
    
    tdstring+="<table class=\"table table-hover " + tableclass + "\"><thead><tr>";
    $.each(tabledata['data'][0],function(index, item){
    	
    	headings.push(index);
    	if(hideData.indexOf(index)>-1){
            tdstring+="<th style='display:none'>"+index+"</th>";
            headings.pop(index)
             
         }else{
             tdstring+="<th>"+index+"</th>";
         }
    	
    });   
    tdstring+=extraTH;
    tdstring+="</tr></thead><tbody>";
    // CREATE TABLE ROWS
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

function addArrayToLocalStorage(storageName, arr, name){
    var oldObj = JSON.parse(localStorage.getItem(storageName));
    oldObj[name] = arr;
    localStorage.setItem(storageName ,JSON.stringify(oldObj));
}

function turnKeyToHeader(str){
    txtToReturn = "";
    str2 = "";
    str = str.split("-")
    $.each(str, function(key, value){
        // str2 += value.charAt(0).toUpperCase() + value.slice(1)+" "
        str2 += value.toUpperCase() + " "
    })
    str2 = str2.split("_")
    $.each(str2, function(key, value){
        // txtToReturn += value.charAt(0).toUpperCase() + value.slice(1)+" "
        txtToReturn += value.toUpperCase()+" "
    })
    return txtToReturn;
}

function turnHeaderToKey(str){
	txtToReturn = "";
	str2 = "";
	str = str.split(" ")
	$.each(str, function(key,value){
		str2 += value.charAt(0).toLowerCase() + value.slice(1) + "-"
	})
	txtToReturn = str2.substr(0, str2.length-1);	
	return txtToReturn;	
}

function editButtonsClick(that){
    $("#"+$(that).data("edit")).click()
}

function changeObjectToFormData(object, msg_type){
    var fd = {};
    $.each(object, function(key, value){
        fd[value.name] = value.value
    })
    return fd;
}
function changeObjectToFormData(object, msg_type){
    var fd = {};
    $.each(object, function(key, value){
        fd[value.name] = value.value
    })
    return fd;
}
function oneToMany(object){
    var arr = [];
    var tempObj = {}
    var nameArr = []    
    $.each(object, function(key, value){    	
    	if(value != undefined){    		
	        name = value.name.substring(0, value.name.indexOf('['));	        
	        if(typeof tempObj[name] == 'undefined'){
	            tempObj[name] = [];	            
	            nameArr.push(name);
	        }
	        tempObj[name].push(value.value);
    	}
    })    
    /*
	 * console.log("Name array: "); console.log(nameArr); console.log("Data
	 * array: "); console.log(tempObj); console.log("Individual data: ");
	 */
    if(! $.isEmptyObject(tempObj) && ! $.isEmptyObject(nameArr[1])){
	    for(i=0;i<tempObj[nameArr[1]].length;i++){
	        var singleObj = {};
	        for(j=0;j<nameArr.length;j++){	        	
	        	singleObj[nameArr[j]] = tempObj[nameArr[j]][i]	        	
	        }
	      //  console.log(singleObj);
	        arr.push(singleObj)
	    }
    }
    return arr
}

function addReviewFields(info, title="", tag="h3", edit=""){
    var text = "<div class='clearfix'></div><div class='col-md-6'><"+tag+">"+title+"</"+tag+"></div>";
    if(edit != ""){
        text+="<div class='col-md-6 pull-right text-right'><div class='btn btn-primary no-print edit-buttons' data-edit='"+edit+"' onclick='editButtonsClick(this)'>Edit</div></div>";
    }
    text+="<div class='clearfix'></div>";
    var i =0;

    $.each(info, function(key,value){
        valueStr = $.trim(value);
        if(valueStr != ""){   
            text+= '<div class="col-xs-12 hover-group review-group">\
                        <label class="control-label col-xs-4 review-key">'+turnKeyToHeader(key)+'</label>\
                        <div class="col-xs-8 review-value">';
            text = text.replace("Lsf", "Local Script First");
            text = text.replace("Lsm", "Local Script Middle");
            text = text.replace("Lsl", "Local Script Last");
            text += '<label class="">'+valueStr+'</label>';
            text += '</div>\
                    </div>';
            }        
        
    });    
        
    return text;
}
function addReviewFieldsArray(info, title, tag="h3", edit="", extra=""){
    var text = "<div class='clearfix'></div><div class='col-md-6'><"+tag+">"+title+"</"+tag+"></div>";
    if(edit != ""){
        text+="<div class='col-md-6 pull-right text-right'><div class='btn btn-primary edit-buttons no-print' data-edit='"+edit+"' onclick='editButtonsClick(this)'>Edit</div></div>";
    }
    text+="<div class='clearfix'></div>";
    text+=extra;
    $.each(info, function(key, val){    	
        if(!isNaN(key)){
            key=key+1
        }
        else{
            key = turnKeyToHeader(key)
        }
        text+=addReviewFields(val, title+" - "+key, "h4")
    })
    return text
}

function attachmentDetailGenerateHtml(attachment_data){
    txtToDisplay = "";
    $.each(attachment_data, function(index, attachment) {
        var extension = attachment['File extension'];
        var attachmentId = attachment['Screening attachment ID']
        var actionId = attachment['Screening action ID'];
        
        delete attachment['Screening action ID'];
        delete attachment['Screening ID'];
        delete attachment['Screening attachment ID'];                
        delete attachment['File extension'];
        
        attachment['File type'] = extension.toUpperCase();
        attachment['Download URL'] = "<a href='./screeningn/getAttachment?id="+attachmentId+"' target='_blank' download='attachment." + extension + "'>Click here to download</a>";
        txtToDisplay += addReviewFields(attachment, attachment['Document type'], "p");                
    });           
    return txtToDisplay;    
}

function screeningLattachmentDetailGenerateHtml(attachment_data){
    txtToDisplay = "";
    $.each(attachment_data, function(index, attachment) {
        var extension = attachment['File extension'];
        var attachmentId = attachment['Screening attachment ID']
        var actionId = attachment['Screening action ID'];
        
        delete attachment['Screening action ID'];
        delete attachment['Screening ID'];
        delete attachment['Screening attachment ID'];                
        delete attachment['File extension'];
        
        attachment['File type'] = extension.toUpperCase();
        attachment['Download URL'] = "<a href='./screeningl/getAttachment?id="+attachmentId+"' target='_blank' download='attachment." + extension + "'>Click here to download</a>";
        txtToDisplay += addReviewFields(attachment, attachment['Document type'], "p");                
    });           
    return txtToDisplay;    
}

function accountAttachmentDetailGenerateHtml(attachment_data){
    txtToDisplay = "";
    var lastDocument = "";
    $.each(attachment_data, function(index, attachment) {
        var dueDateOfPendingDocuments = attachment['Due date of pending documents'];
        lastDocument = dueDateOfPendingDocuments;
        var dueDateComments = attachment['Due date comments'];
        if(dueDateOfPendingDocuments!=null){
        	
        	delete attachment['File extension'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Accounts ID'];
            delete attachment['Accounts action ID'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Notes'];
            delete attachment['Attachment date'];
            delete attachment['Attachment time'];
            
        	
        	txtToDisplay += addReviewFields(attachment, "Due date received", "p");
        	
        	
        	
        }else{
        
        var extension = attachment['File extension'];
        var attachmentId = attachment['Accounts attachment ID']
        var actionId = attachment['Accounts action ID'];
             
        delete attachment['File extension'];

        delete attachment['Accounts attachment ID'];
        delete attachment['Accounts ID'];
        delete attachment['Accounts action ID'];
        
        attachment['File type'] = extension.toUpperCase();
        attachment['Download URL'] = "<a href='./accountsn/getAttachment?id="+attachmentId+"' target='_blank' download='attachment." + extension + "'>Click here to download</a>";
        
        txtToDisplay += addReviewFields(attachment, attachment['Document type'], "p");
        }
    });       
    
    if(lastDocument!=null && lastDocument !=''){    	
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type").append('<option value="Due date acknowledged"> Due date acknowledged </option>');
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	$("#action-sub-type").append('<option value="Due date rejected"> Due date rejected</option>');
    }else{
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	
    }
   
    
    return txtToDisplay;    
}

function accountsLAttachmentDetailGenerateHtml(attachment_data){
    txtToDisplay = "";
    var lastDocument = "";
    $.each(attachment_data, function(index, attachment) {
        var dueDateOfPendingDocuments = attachment['Due date of pending documents'];
        lastDocument = dueDateOfPendingDocuments;
        var dueDateComments = attachment['Due date comments'];
        if(dueDateOfPendingDocuments!=null){
        	
        	delete attachment['File extension'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Accounts ID'];
            delete attachment['Accounts action ID'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Notes'];
            delete attachment['Attachment date'];
            delete attachment['Attachment time'];
            
        	
        	txtToDisplay += addReviewFields(attachment, "Due date received", "p");
        	
        	
        	
        }else{
        
        var extension = attachment['File extension'];
        var attachmentId = attachment['Accounts attachment ID']
        var actionId = attachment['Accounts action ID'];
             
        delete attachment['File extension'];

        delete attachment['Accounts attachment ID'];
        delete attachment['Accounts ID'];
        delete attachment['Accounts action ID'];
        
        attachment['File type'] = extension.toUpperCase();
        attachment['Download URL'] = "<a href='./accountsl/getAttachment?id="+attachmentId+"' target='_blank' download='attachment." + extension + "'>Click here to download</a>";
        
        txtToDisplay += addReviewFields(attachment, attachment['Document type'], "p");
        }
    });       
    
    if(lastDocument!=null && lastDocument !=''){    	
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type").append('<option value="Due date acknowledged"> Due date acknowledged </option>');
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	$("#action-sub-type").append('<option value="Due date rejected"> Due date rejected</option>');
    }else{
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	
    }
   
    
    return txtToDisplay;    
}

function accountLAttachmentDetailGenerateHtml(attachment_data){
    txtToDisplay = "";
    var lastDocument = "";
    $.each(attachment_data, function(index, attachment) {
        var dueDateOfPendingDocuments = attachment['Due date of pending documents'];
        lastDocument = dueDateOfPendingDocuments;
        var dueDateComments = attachment['Due date comments'];
        if(dueDateOfPendingDocuments!=null){
        	
        	delete attachment['File extension'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Accounts ID'];
            delete attachment['Accounts action ID'];
            delete attachment['Accounts attachment ID'];
            delete attachment['Notes'];
            delete attachment['Attachment date'];
            delete attachment['Attachment time'];
            
        	
        	txtToDisplay += addReviewFields(attachment, "Due date received", "p");
        	
        	
        	
        }else{
        
        var extension = attachment['File extension'];
        var attachmentId = attachment['Accounts attachment ID']
        var actionId = attachment['Accounts action ID'];
             
        delete attachment['File extension'];

        delete attachment['Accounts attachment ID'];
        delete attachment['Accounts ID'];
        delete attachment['Accounts action ID'];
        
        attachment['File type'] = extension.toUpperCase();
        attachment['Download URL'] = "<a href='./accountsl/getAttachment?id="+attachmentId+"' target='_blank' download='attachment." + extension + "'>Click here to download</a>";
        
        txtToDisplay += addReviewFields(attachment, attachment['Document type'], "p");
        }
    });       
    
    if(lastDocument!=null && lastDocument !=''){    	
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type").append('<option value="Due date acknowledged"> Due date acknowledged </option>');
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	$("#action-sub-type").append('<option value="Due date rejected"> Due date rejected</option>');
    }else{
    	$("#action-sub-type option[value='Due date acknowledged']").remove();
    	$("#action-sub-type option[value='Due date rejected']").remove();
    	
    }
   
    
    return txtToDisplay;    
}


function allowUncheckRadio(){
    
    $(document).off('click', "input[type='radio']").on('click', "input[type='radio']", function(){
        
        var previousValue = $(this).attr('previousValue');
        var name = $(this).attr('name');
        console.log("Radio button: ", name, " clicked.");

        if (previousValue == 'checked')
        {
          $(this).removeAttr('checked');
          $(this).attr('previousValue', false);
        }
        else
        {
          $("input[name="+name+"]:radio").attr('previousValue', false);
          $(this).attr('previousValue', 'checked');
        } 
    });
}

// disable enter
$(document).keypress(function (e) {
    if(e.which == 13 ) return false;
});




function filterTable(targetDiv,keyword){
	$('#'+targetDiv+' tr').hide();
	// $('#'+targetDiv+' tr:contains("ID")').show();
	$('#'+targetDiv+' tr:first').show();
	$.each(keyword, function(index, value){
		$('#'+targetDiv+' tr:contains('+value+')').show();    
	});
	$("#showall-"+targetDiv).removeAttr('disabled');
}

function filterTableShowAll(targetDiv){
	$('#'+targetDiv+" tr").show();
	clearText('#filter-text-'+targetDiv);
	$('#filter-text'+targetDiv).prop("placeholder","Enter filter text")
 	$('#showall-'+targetDiv).attr('disabled', 'disabled');
}

/*
 * function simplifiedFilterShowAllMethod(targetDiv){
 * $(document).off("click",'#showall-'+targetDiv).on("click",'#showall-'+targetDiv,function(){
 * filterTableShowAll(targetDiv);
 * 
 * }); }
 * 
 * function simplifiedFilterKeyPress(targetDiv){
 * $(document).on("keypress",'#filter-text-'+targetDiv,function(){
 * 
 * var keywords = $('#filter-text-'+targetDiv).val().split(" ");
 * filterTable(targetDiv,keywords); }); }
 */


function clearText(textfield) {
    // we use getElementById method to select the text input and than change its
	// value to an empty string
	
    $(textfield).val("");
} 

function generateReplyTable(tabledata, targetdiv, extraTD="",extraTH="", sn=false, hideData=[]){

  var tdstring = "";
  var headings = [];
  tdstring+='<div id="filterrequests" class="pull-right">\
		<input id="filter-text-'+targetdiv+'" name="filter_text" placeholder="Enter keyword" type="text" style="margin-right: 4px;" />\
			<button class="btn btn-primary btn-sm" type="button" id="showall-'+targetdiv+'" disabled="disabled">Show all </button>\
		</div>';
  
  tdstring+="<table class=\"table table-hover\"><thead><tr>";
  if(sn==true){
      tdstring+="<th>SN</th>"
  }
  var i =0
  $.each(tabledata['data'][0],function(index, item){
	  	headings.push(index)

     // if($.inArray(i++, hideData)> -1){
	  if(hideData.indexOf(index)>-1){
		  
          tdstring+="<th style='display:none'>"+index+"</th>";
          headings.pop(index)
          
      }else{
          tdstring+="<th>"+index+"</th>";
      }
          
  });   
  tdstring+=extraTH;
  tdstring+="</tr></thead><tbody>";
  // CREATE TABLE ROWS
  for(i=0;i<tabledata.data.length;i++){
      var replyDate =moment(tabledata.data[i]['Reply date']);
      var curdate = moment(new Date())
      var trclass = "";
      if(Math.abs(replyDate.diff(curdate, 'days')) > 30)
          trclass="danger";
      
      if(tabledata.data[i]['Purpose of screening'].toUpperCase().indexOf("REMITTANCE") > 0 || tabledata.data[i]['Purpose of screening'].toUpperCase().indexOf("EXCHANGE") > 0){
          tdstring+="<tr style='background-color:#DEA5A7; class='" + trclass + "'>";    
      }else if(tabledata.data[i]['Frozen'] ){
          tdstring+="<tr style='background-color:#DEA5A7;'>";    
      }
      else{
          tdstring+="<tr>";
      }
      if(sn==true){
          tdstring+="<td>"+(i+1)+"</td>"
      }
      tdstring += "<td class='id'>"+tabledata.data[i][headings[0]]+"</td>";
      for(j=1;j<headings.length;j++){		            	  
          if($.inArray(j, hideData) > -1)
              tdstring+="<td style='display:none'>"+tabledata.data[i][headings[j]]+"</td>";
          else
              tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";		                 
      }
      tdstring+=extraTD;
      tdstring+= "</tr>";
  }
  tdstring+= "</tbody></table>";
  // Add table rows to target table tbody
  $('#'+targetdiv).html(tdstring);    
}

function generateScreeningReviewTable(tabledata, tableclass, targetdiv, extraTD="",extraTH="",hideData=[]){
    if(tabledata['data']== null){
        return;
    }
    var tdstring = "";
    var headings = [];
    
    tdstring+='<div id="filterrequests" class="pull-right">\
		<input id="filter-text-'+targetdiv+'" name="filter_text" placeholder="Enter keyword" type="text" style="margin-right: 4px;" />\
			<button class="btn btn-primary btn-sm" type="button" id="showall-'+targetdiv+'" disabled="disabled">Show all </button>\
		</div>';
  
    
    tdstring+="<table class=\"table table-hover " + tableclass + "\"><thead><tr>";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
        
        if(hideData.indexOf(index)>-1){
        	  tdstring+="<th style='display:none'>"+index+"</th>";
              headings.pop(index)	
        }else{
        
        tdstring+="<th>"+index+"</th>";
        }
    });   
    tdstring+=extraTH;
    tdstring+="</tr></thead><tbody>";
    // CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
    	if(tabledata.data[i]['Repaired'] ){
            tdstring+="<tr style='background-color:#ccffcc;'>";    
        }
    	else if(tabledata.data[i]['Purpose of screening'].toUpperCase().indexOf("REMITTANCE") > 0 || tabledata.data[i]['Purpose of screening'].toUpperCase().indexOf("EXCHANGE") > 0){
            tdstring+="<tr style='background-color:#DEA5A7;'>";    
        }
        else if(tabledata.data[i]['Has joint account holder?'] ){
            tdstring+="<tr style='background-color:#AEBAC7;'>";    
        }
        else{
            tdstring+="<tr>";
        }            
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

function generateScreeningMatchTable(tabledata, targetdiv, name = "",hideData=[], extraTD = "", extraTH = "", id = false) {    
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
            tdstring += "<td>" + (i + 1) + "</td>"
        }
        
        tdstring += "<td><input type='radio' name = '"+ name + "' id='"+tabledata.data[i]['ID']+"'></td>";
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

function generateKycTable(tabledata, targetdiv, extraTD="",extraTH="", sn=false, hideData=[]){
	 if(tabledata['data']== null){
	        return;
	  }
     var tdstring = "";
     var headings = [];
     tdstring+='<div id="filterrequests" class="pull-right">\
 		<input id="filter-text-'+targetdiv+'" name="filter_text" placeholder="Enter keyword" type="text" style="margin-right: 4px;" />\
 			<button class="btn btn-primary btn-sm" type="button" id="showall-'+targetdiv+'" disabled="disabled">Show all </button>\
 		</div>';
   
     tdstring+="<table class=\"table table-hover\"><thead><tr>";
     if(sn==true){
         tdstring+="<th>SN</th>"
     }
     var i =0
     $.each(tabledata['data'][0],function(index, item){
         headings.push(index);
         if(hideData.indexOf(index)> -1){
             tdstring+="<th style='display:none'>"+index+"</th>";
             headings.pop(index)
         }
         else{
             tdstring+="<th>"+index+"</th>";
         }
             
     });   
     tdstring+=extraTH;
     tdstring+="</tr></thead><tbody>";
     //CREATE TABLE ROWS
     for(i=0;i<tabledata.data.length;i++){
    	 
         var trclass = "";
         tdstring+="<tr class='"+trclass+"'>";
         if(sn==true){
             tdstring+="<td>"+(i+1)+"</td>"
         }
         tdstring += "<td class='id'>"+tabledata.data[i][headings[0]]+"</td>";
         for(j=1;j<headings.length;j++){		            	  
        	 if(tabledata.data[i][headings[j]]==null)
                 tabledata.data[i][headings[j]] = "";
                 key = turnHeaderToKey(headings[j]);
                 tdstring += "<td class='" + key + "'>" + tabledata.data[i][headings[j]] + "</td>";
         }
         tdstring+=extraTD;
         tdstring+= "</tr>";
     }
     tdstring+= "</tbody></table>";
     // Add table rows to target table tbody
     $('#'+targetdiv).html(tdstring);    
 }