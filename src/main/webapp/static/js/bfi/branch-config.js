/*
    id of contents: content-container
*/

/* ====================================
   Business logic functions 
   ==================================== */
// New KYC

// Called when data is received for population of review form
function putReviewData(data){
}

function branchClick(that){
    var branch_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    /*branch_post_data["first-name"]!="" && branch_post_data["last-name"]!="" && branch_post_data["nepali-first-name"]!="" && branch_post_data["nepali-last-name"]!="" && branch_post_data["marital-status"]!="" && branch_post_data["gender"]!="" && branch_post_data["date-of-birth"]!=""*/  // apply validation here

    var validationCheck = false;
    if($("#D01021001").is(":visible")){
        if(true){// validate here
            validationCheck = true;
        }
    }
    else{
        validationCheck = true;
    }


    if(validationCheck){
        addArrayToLocalStorage("branch_post_data", branch_post_data,"branch-info");
        $("#branch-address-tab").click();

    }else{
        console.log("incomplete data");
        showMessageBox("Incomplete Data", "Some required fields have been left empty. Please check your form");
    }
}
function branchAddClick(that){
    var branch_post_data = oneToMany($(that).closest("form").serializeArray());
    /*branch_post_data["first-name"]!="" && branch_post_data["last-name"]!="" && branch_post_data["nepali-first-name"]!="" && branch_post_data["nepali-last-name"]!="" && branch_post_data["marital-status"]!="" && branch_post_data["gender"]!="" && branch_post_data["date-of-birth"]!=""*/  // apply validation here

    var validationCheck = false;
    if($("#D01021001").is(":visible")){
        if(true){// validate here
            validationCheck = true;
        }
    }
    else{
        validationCheck = true;
    }


    if(validationCheck){
        addArrayToLocalStorage("branch_post_data", branch_post_data,"branch-address-info");
        $("#branch-contact-tab").click();

    }else{
        console.log("incomplete data");
        showMessageBox("Incomplete Data", "Some required fields have been left empty. Please check your form");
    }
}

function branchConClick(that){
    var branch_post_data = oneToMany($(that).closest("form").serializeArray());
    /*branch_post_data["first-name"]!="" && branch_post_data["last-name"]!="" && branch_post_data["nepali-first-name"]!="" && branch_post_data["nepali-last-name"]!="" && branch_post_data["marital-status"]!="" && branch_post_data["gender"]!="" && branch_post_data["date-of-birth"]!=""*/  // apply validation here

    var validationCheck = false;
    if($("#D01021001").is(":visible")){
        if(true){// validate here
            validationCheck = true;
        }
    }
    else{
        validationCheck = true;
    }


    if(validationCheck){
        addArrayToLocalStorage("branch_post_data", branch_post_data,"branch-contact-info");
        $("#branch-email-tab").click();

    }else{
        console.log("incomplete data");
        showMessageBox("Incomplete Data", "Some required fields have been left empty. Please check your form");
    }
}

function branchEmailClick(that){
    var branch_post_data = oneToMany($(that).closest("form").serializeArray());
    /*branch_post_data["first-name"]!="" && branch_post_data["last-name"]!="" && branch_post_data["nepali-first-name"]!="" && branch_post_data["nepali-last-name"]!="" && branch_post_data["marital-status"]!="" && branch_post_data["gender"]!="" && branch_post_data["date-of-birth"]!=""*/  // apply validation here

    var validationCheck = false;
    if($("#D01021001").is(":visible")){
        if(true){// validate here
            validationCheck = true;
        }
    }
    else{
        validationCheck = true;
    }


    if(validationCheck){
        addArrayToLocalStorage("branch_post_data", branch_post_data,"branch-email-info");
        $("#review-tab").click();

    }else{
        console.log("incomplete data");
        showMessageBox("Incomplete Data", "Some required fields have been left empty. Please check your form");
    }
}


// function for final submission after review
function revSubmit(){
    var branch_post_data = JSON.parse(localStorage.getItem("branch_post_data"));
    console.log(JSON.stringify(branch_post_data));
    var request = $.ajax({
      url: host,
      method: "POST",
      data: branch_post_data, 
      contentType: false,
      processData: false,
      dataType: "json"
    });
     
    request.done(function( response ) {
        response=JSON.parse(response); console.log(response);;
        $('#forms-container').load(response.redirect, function(){});
    });
     
    request.fail(function( jqXHR, textStatus ) {
      console.log( "Request failed: " + textStatus );
    });
}

function revClick(){
    var infoToRetrieve = ["branch-info", "branch-address-info", "branch-contact-info","branch-email-info"]
    var txtToDisplay = "";
    
    var branch_post_data = JSON.parse(localStorage.getItem("branch_post_data"));
    txtToDisplay+= addReviewFields(branch_post_data[infoToRetrieve[0]], "Branch Info", "h3", "branch-info-tab")
    txtToDisplay+= addReviewFieldsArray(branch_post_data[infoToRetrieve[1]], "Branch Address Info", "h3", "branch-address-tab")
    txtToDisplay+= addReviewFieldsArray(branch_post_data[infoToRetrieve[2]], "Branch Contact Info", "h3", "branch-contact-tab")
    txtToDisplay+= addReviewFieldsArray(branch_post_data[infoToRetrieve[3]], "Branch Email Info", "h3", "branch-email-tab")
    // Prettify Bad Input
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsf Name", 'g'),"नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsm Name", 'g'),"बीचकाे&nbsp;नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsl Name", 'g'),"थर");
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class=""></label>', 'g'),'<label class="">N/A</label>');
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class="">-1</label>', 'g'),'<label class="">N/A</label>');

    $("#review-wrap").html(txtToDisplay)
}

function addReviewFields(info, title="", tag="h3", edit=""){
    var text = "<div class='clearfix'></div><div class='col-md-6'><"+tag+">"+title+"</"+tag+"></div>";
    if(edit != ""){
        text+="<div class='col-md-6 pull-right text-right'><div class='btn btn-primary edit-buttons' data-edit='"+edit+"' onclick='editButtonsClick(this)'>Edit</div></div>";
    }
    text+="<div class='clearfix'></div>";
    var i =0;

    $.each(info, function(key,value){
        text+= '<div class="col-xs-4 hover-group">\
                    <label class="control-label col-xs-4 review-key">'+turnKeyToHeader(key)+'</label>\
                    <div class="col-xs-4 review-value">\
                        <label class="">'+value+'</label>\
                    </div>\
                </div>';
        if(++i == 3){
            i=0;
            text+="<div class='clearfix'></div>"
        }
    })
    text+="<div class='clearfix'></div><hr/>"
    return text;
}

function addReviewFieldsArray(info, title, tag="h3", edit="", extra=""){
    var text = "<div class='clearfix'></div><div class='col-md-6'><"+tag+">"+title+"</"+tag+"></div>";
    if(edit != ""){
        text+="<div class='col-md-6 pull-right text-right'><div class='btn btn-primary edit-buttons' data-edit='"+edit+"' onclick='editButtonsClick(this)'>Edit</div></div>";
    }
    text+="<div class='clearfix'></div>";
    text+=extra;
    $.each(info, function(key, val){
        if(!isNaN(key))
            key=key+1
        else
            key = turnKeyToHeader(key)
        text+=addReviewFields(val, title+" - "+key, "h4")
    })
    return text
}

function turnKeyToHeader(str){
    txtToReturn = "";
    str = str.split("-")
    $.each(str, function(key, value){
        txtToReturn += value.charAt(0).toUpperCase() + value.slice(1)+" "      
    })
    return txtToReturn;
}

function editButtonsClick(that){
    $("#"+$(that).data("edit")).click()
}


function initBranchConf(){
	// Define localstorage for data to be sent
	var dataToBeSent = {};
	localStorage.setItem("branch_post_data" ,JSON.stringify(dataToBeSent));

	// Define selectors add value to them through ajax
	var selectors = ["transaction-type", "document-type"];
	getOptionValue(selectors);

	//manage jump to top on tab click
	$("#kycTabs").find("li>a").click(function(){

		$("body").animate({
			scrollTop: "100px"
		})
	});

	// Define click functions
	$("#branchNext").click(function(){
        branchClick(this)
    })
    $("#branchAddNext").click(function(){
        branchAddClick(this)
    })
    $("#branchConNext").click(function(){
        branchConClick(this)
    })
    $("#branchEmailNext").click(function(){
        branchEmailClick(this)
    })
    $("#branchUsrNext").click(function(){
        branchUsrClick(this)
    })    
    $("#revSubmit").click(function(){
        revSubmit(this);
    })
    $("#review-tab").click(function(){
        revClick();
    })
}