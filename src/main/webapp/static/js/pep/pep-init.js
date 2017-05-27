/* ====================================
   Event listeners 
   ==================================== */
var family_members = 0;
var pepGlobalCount = 0;

$(document).ready(function() {
    $(document).off("click", "#pep-entry").on("click", "#pep-entry", function() {
        family_members = 0;
    });
});

function pepEntryInit() {
    // Define localstorage for data to be sent
    var dataToBeSent = {};
    localStorage.setItem("pep_post_data", JSON.stringify(dataToBeSent));
    $("#PepTabs").find("li>a").click(function() {
        $("body").animate({
            scrollTop : "100px"
        })
    });
    // Define selectors add value to them through ajax
    // var selectors = ["salutation", "jurisdiction", "nationality", "pep-type",
    // "pep-status", "media-type"];
    // getOptionValue(selectors);

    $("#pepPiNext").click(function() {
        pepPiClick(this)
    })
    $("#pepOfficeNext").click(function() {
        pepOfficeClick(this)
    })
    $("#pepTypeNext").click(function() {
        pepTypeClick(this)
    })
    $("#pepFiNext").click(function() {
        pepFiClick(this)
    })
    $("#pepAddressNext").click(function() {
        pepAddressClick(this)
    })
    $("#pepContactNext").click(function() {
        pepContactClick(this)
    })
    $("#pepMediaNext").click(function() {
        pepMediaClick(this)
    })
    $("#pep-review-tab").click(function() {
        pepRevClick();
    })
    $("#pepRevSubmit").click(function() {
        pepRevSubmit(this);
    })
}
function pepPiClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    addArrayToLocalStorage("pep_post_data", pep_post_data, "personal-info");
    pepGlobalCount++;
    $("#pep-office-info-tab").click();
}

function pepOfficeClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    addArrayToLocalStorage("pep_post_data", pep_post_data, "office-info");
    pepGlobalCount++;
    $("#pep-type-info-tab").click();
}
function pepTypeClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    addArrayToLocalStorage("pep_post_data", pep_post_data, "type-info");
    pepGlobalCount++;
    $("#pep-family-info-tab").click();
}
function pepFiClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_object = $(that).closest("form").serializeArray();
    var pep_post_data = oneToMany(pep_post_object);
    addArrayToLocalStorage("pep_post_data", pep_post_data, "family-info");
    pepGlobalCount++;
    $("#pep-address-info-tab").click();
}
function pepAddressClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_data = changeObjectToFormData($(that).closest("form").serializeArray());
    addArrayToLocalStorage("pep_post_data", pep_post_data, "address-info");
    pepGlobalCount++;
    $("#pep-contact-info-tab").click();
}
function pepContactClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_object = $(that).closest("form").serializeArray();
    var pep_post_data = oneToMany(pep_post_object);
    addArrayToLocalStorage("pep_post_data", pep_post_data, "contact-info");
    pepGlobalCount++;
    $("#pep-media-info-tab").click();
}

function pepMediaClick(that) {
    var valid = true;
    var fieldsToCheck = $(that).closest("form").find(":required");
    $.each(fieldsToCheck, function(index, value) {
        if ($(value).val() == "") {
            valid = false;
        }
    });
    if (valid == false) {
        $(that).closest('form').find(".formSubmit").click();
        return false;
    }
    var pep_post_data = oneToMany($(that).closest("form").serializeArray());
    addArrayToLocalStorage("pep_post_data", pep_post_data, "media-info");
    pepGlobalCount++;
    $("#pep-review-tab").click();
}

function pepRevClick() {
    var infoToRetrieve = [ "personal-info", "office-info", "type-info", "family-info", "address-info", "contact-info", "media-info" ]
    txtToDisplay = "";
    pep_post_data = JSON.parse(localStorage.getItem("pep_post_data"));
    console.log("Pep post data", pep_post_data);
    txtToDisplay += addReviewFields(pep_post_data[infoToRetrieve[0]], "Personal Info", "h3", "pep-personal-info-tab")
    txtToDisplay += addReviewFields(pep_post_data[infoToRetrieve[1]], "Office Info", "h3", "pep-office-info-tab")
    txtToDisplay += addReviewFields(pep_post_data[infoToRetrieve[2]], "Type Info", "h3", "pep-type-info-tab")
    txtToDisplay += addReviewFieldsArray(pep_post_data[infoToRetrieve[3]], "Family Info", "h3", "pep-family-info-tab")
    txtToDisplay += addReviewFields(pep_post_data[infoToRetrieve[4]], "Address Info", "h3", "pep-address-info-tab")
    txtToDisplay += addReviewFieldsArray(pep_post_data[infoToRetrieve[5]], "Contact Info", "h3", "pep-contact-info-tab")

    // Special condition for media Display
    var text = "<div class='clearfix'></div><div class='col-md-6'><h3>Media Info</h3></div>";
    text += "<div class='col-md-6 pull-right text-right'><div class='btn btn-primary edit-buttons' data-edit='pep-media-info-tab' onclick='editButtonsClick(this)'>Edit</div></div>";

    text += "<div class='clearfix'></div>";
    info = pep_post_data[infoToRetrieve[6]];
    $.each(info, function(key, val) {
        if (!isNaN(key))
            key = key + 1
        else
            key = turnKeyToHeader(key)
        var temp = "<div class='clearfix'></div><div class='col-md-6'><h4>Media Info - " + key + "</h4></div>";
        temp += "<div class='clearfix'></div>";
        var i = 0;
        // storing extension
        var extension = "";
        var allowedImageExtensions = [ "png", "jpeg", "jpg" ]
        $.each(val, function(mykey, myval) {
            if (mykey == "extension-text")
                extension = myval
            if (mykey == "media-content") {
                temp += '<div class="col-xs-4 hover-group">\
                        <label class="control-label col-xs-4 review-key">' + turnKeyToHeader(mykey) + '</label>';
                if (allowedImageExtensions.indexOf(extension) != -1) {
                    temp += '<div class="col-xs-4 review-value">\
                            <label class=""><img src="data:image/' + extension + ';base64,' + myval + '" style="max-width:100%"></label>\
                        </div>';
                }
                temp += '</div>';
            } else {
                temp += '<div class="col-xs-4 hover-group">\
                        <label class="control-label col-xs-4 review-key">' + turnKeyToHeader(mykey) + '</label>\
                        <div class="col-xs-4 review-value">\
                            <label class="">' + myval + '</label>\
                        </div>\
                    </div>';
            }
            if (++i == 3) {
                i = 0;
                temp += "<div class='clearfix'></div>"
            }
        })
        temp += "<div class='clearfix'></div><hr/>"
        text += temp;
    })
    txtToDisplay += text;
    // Prettify Bad Input
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsf Name", 'g'), "नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsm Name", 'g'), "बीचकाे&nbsp;नाम");
    txtToDisplay = txtToDisplay.replace(new RegExp("Lsl Name", 'g'), "थर");
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class=""></label>', 'g'), '<label class="">N/A</label>');
    txtToDisplay = txtToDisplay.replace(new RegExp('<label class=""></label>', 'g'), '<label class="">N/A</label>');
    $("#pep-review-wrap").html(txtToDisplay)
}

function pepRevSubmit() {
    var pep_post_data = {
        "msg-type" : "pep-form-submit",
        "data" : localStorage.getItem("pep_post_data")
    };
    var request = $.ajax({
        url : "./lists/pepSubmit",
        method : "POST",
        data : pep_post_data,
        dataType : "json",
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    request.done(function(response) {
        if (response == 1) {
            $('.message-title').html("KYCN Form Submitted");
            $('.message-body').html("<p>KYCN Form Submitted Successfully</p>");
            $('.message-title').html("PEP Profile Submit");

            var url = "./lists/pepEntryForm";
            $('#message-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
                $.get(url, function(data) {
                    $("#page-content").html(data);
                });
            });
        } else {
            $('.message-title').html("ERROR");
            $('.message-body').html("<p>Error Number:" + response.errno + "</p><p>Error Description: " + response.message + "</p><p>Please contact administrator for support.</p>");
        }
        $('#message-modal').modal();
    });

}