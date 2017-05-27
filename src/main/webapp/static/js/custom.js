/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

// Sidebar
$(document).ready(function() {
	$('a.limited').click(function(event){		
		event.preventDefault();
	});	
	
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + $FOOTER.height();

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            
            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $MENU_TOGGLE.on('click', function() {
        if ($BODY.hasClass('nav-md')) {
            $BODY.removeClass('nav-md').addClass('nav-sm');

            if ($SIDEBAR_MENU.find('li').hasClass('active')) {
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            }
        } else {
            $BODY.removeClass('nav-sm').addClass('nav-md');

            if ($SIDEBAR_MENU.find('li').hasClass('active-sm')) {
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }
        }

        setContentHeight();
    });

    // check active menu
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function(){  
        setContentHeight();
    });

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
});
// /Sidebar

// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');
        
        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function(){
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200); 
            $BOX_PANEL.css('height', 'auto');  
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

// Progressbar
if ($(".progress .progress-bar")[0]) {
    $('.progress .progress-bar').progressbar(); // bootstrap 3
}
// /Progressbar

// Switchery
$(document).ready(function() {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
});
// /Switchery

// iCheck
$(document).ready(function() {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
});
// /iCheck

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});



// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// NProgress
if (typeof NProgress != 'undefined') {
    $(document).ready(function () {
        NProgress.start();
    });

    $(window).load(function () {
        NProgress.done();
    });
}

/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

function addDatePicker(target){
    $(target).daterangepicker({
          singleDatePicker: true,
          showDropdowns: true
      }, 
      function(start, end, label) {
          $(target).val(start.format("YYYY-MM-DD"));
      });	
}   

/* Hex Converter */
function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

/* Bar Graph Generator */
function generateBarGraph(tabledata, targetdiv){
    var colors = ["#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"]
    var tdstring = "";
    var tablelabels = [];
    var headings = [];
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });   
    // create sub-arrays to store labels and values
    for(j=0;j<headings.length;j++){
        tablelabels[j] = [];
    } 
    //CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        for(j=0;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
            tablelabels[j].push(tabledata.data[i][headings[j]])
        }
        tdstring+= "</tr>";
    }
    // Add table rows to target table tbody
    $('#'+targetdiv+'-tbody').append(tdstring);

    // create datasets
    var datasets = []
    for(var i=1;i<headings.length;i++){
        datasets.push({label: headings[i], backgroundColor:colors[i-1], data: tablelabels[i]});
    }
      // Bar chart
      var ctx = document.getElementById(targetdiv+"-bar");
      var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: tablelabels[0],
          datasets: datasets
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
      legendHolder = document.createElement('div');
      legendHolder.innerHTML = mybarChart.generateLegend();
       if($('#'+targetdiv+'-div').find(".x_panel").height() > $('#'+targetdiv+'-chart-div').find(".x_panel").height()){
        $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height() + 100)
      }
      else{
        $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-chart-div').find(".x_panel").height() + 60);
      }
      $('#'+targetdiv+'-chart-div').find(".legend").append(legendHolder);      
      $(".legend").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;")
      $('#'+targetdiv+'-chart-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height())
     
}

//Doughnot  chart    
function generateDoughnutChart(tabledata, targetdiv, pieindex=1){
    var colors = ["#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"]
    var headings=[];
    var pielabels=[];
    var tdstring = "";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });   
    tablelabels =[];


    //CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        for(j=0;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
        }
        tdstring+= "</tr>";
    }
    // Add table rows to target table tbody
    $('#'+targetdiv+'-tbody').append(tdstring);

    // Calculate Values for Pie chart
    for(j=0;j<tabledata['data'].length;j++){
        tablelabels.push(tabledata.data[j][headings[pieindex]])
        pielabels.push(tabledata.data[j][headings[0]])
    }
      var ctx = document.getElementById(targetdiv+"-bar");
      var data = {
        datasets: [{
          data: tablelabels,
          backgroundColor: colors,
          label: headings[pieindex]// for legend
        }],
        labels: pielabels
      };

        var canvasDoughnut = new Chart(ctx, {
        type: 'doughnut',
        tooltipFillColor: "rgba(51, 51, 51, 0.55)",
        data: data
      });
      legendHolder = document.createElement('div');
      legendHolder.innerHTML = canvasDoughnut.generateLegend();
      if($('#'+targetdiv+'-div').find(".x_panel").height() > $('#'+targetdiv+'-chart-div').find(".x_panel").height()){
        // $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height() + 150)
    	  $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height() + 20)
      }
      else{
        // $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-chart-div').find(".x_panel").height() + 100);
        $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-chart-div').find(".x_panel").height());
      }
      $('#'+targetdiv+'-chart-div').find(".legend").append(legendHolder);
      
      $(".legend").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;")
      $('#'+targetdiv+'-chart-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height())
}

/* Line Graph Without Table Generator */
function generateLineGraphNoTable(tabledata, targetdiv, index=0){
    var colors = ["#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"]
    var tablelabels = [];
    var headings = [];
    var linelabels = [];
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });   
    // create sub-arrays to store labels and values
    for(j=0;j<headings.length;j++){
        tablelabels[j] = [];
    } 
    //CREATE TABLE labels
    for(i=0;i<tabledata.data.length;i++){
        for(j=0;j<headings.length;j++){
            tablelabels[j].push(tabledata.data[i][headings[j]])
        }
        linelabels.push(tabledata.data[i][headings[0]])
    }
    // create dataset
    var datavalues = []
    for(var i=0;i<tabledata.data.length;i++){
        datavalues.push(tabledata.data[i][headings[index]]);
    }
    dataset = [{
            label: headings[index],
            backgroundColor: "rgba(38, 185, 154, 0.31)",
            borderColor: "rgba(38, 185, 154, 0.7)",
            pointBorderColor: "rgba(38, 185, 154, 0.7)",
            pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: datavalues
        }]
        
      // Bar chart
      var ctx = document.getElementById(targetdiv);
      var mybarChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: linelabels,
          datasets: dataset
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });   
}


/* Multiple Line Graph Without Table Generator */
function generateLinesGraphNoTable(tabledata, targetdiv, indexes){
    var colors = ["#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"]

    var headings = [];
    var linelabels = [];
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });   
    // Create Line Labels
    for(i=0;i<tabledata.data.length;i++){
        linelabels.push(tabledata.data[i][headings[0]])
    }
    // create dataset
    dataset=[];
    var datavalues = []
    for(j=0;j<indexes.length;j++){
        datavalues[j]=[]
        for(var i=0;i<tabledata.data.length;i++){
            datavalues[j].push(tabledata.data[i][headings[indexes[j]]]);
        }
       dataset.push({
        label: headings[indexes[j]],
        backgroundColor: convertHex(colors[j],31),
        borderColor: convertHex(colors[j],70),
        pointBorderColor: "rgba(38, 185, 154, 0.7)",
        pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: colors[j],
        pointBorderWidth: 1,
        data: datavalues[j]
        })
    }
        
      // Bar chart
      var ctx = document.getElementById(targetdiv);
      var mybarChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: linelabels,
          datasets: dataset
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });   
}




 // Pie chart
    
function generatePieChart(tabledata, targetdiv, pieindex=1){
    var colors = ["#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"]
    var headings=[];
    var pielabels=[];
    var tdstring = "";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });   
    tablelabels =[];


    //CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        for(j=0;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
        }
        tdstring+= "</tr>";
    }
    // Add table rows to target table tbody
    $('#'+targetdiv+'-tbody').append(tdstring);

    // Calculate Values for Pie chart
    for(j=0;j<tabledata['data'].length;j++){
        tablelabels.push(tabledata.data[j][headings[pieindex]])
        pielabels.push(tabledata.data[j][headings[0]])
    }
      var ctx = document.getElementById(targetdiv+"-bar");
      var data = {
        datasets: [{
          data: tablelabels,
          backgroundColor: colors,
          label: headings[pieindex]// for legend
        }],
        labels: pielabels
      };

      var pieChart = new Chart(ctx, {
        data: data,
        type: 'pie',
        options: {
          legend: true
        }
      });
      legendHolder = document.createElement('div');
      legendHolder.innerHTML = pieChart.generateLegend();
      if($('#'+targetdiv+'-div').find(".x_panel").height() > $('#'+targetdiv+'-chart-div').find(".x_panel").height()){
        $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height() + 150)
      }
      else{
        $('#'+targetdiv+'-div').find(".x_panel").height($('#'+targetdiv+'-chart-div').find(".x_panel").height() + 100);
      }
      $('#'+targetdiv+'-chart-div').find(".legend").append(legendHolder);
      
      $(".legend").find("span").html("&nbsp;&nbsp;&nbsp;&nbsp;")
      $('#'+targetdiv+'-chart-div').find(".x_panel").height($('#'+targetdiv+'-div').find(".x_panel").height())
}



function generateTable(tabledata, targetdiv, extraTD="",extraTH=""){
    var tdstring = "";
    var headings = [];
    tdstring+="<table class=\"table table-hover\"><thead><tr>";
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
        tdstring+="<th>"+index+"</th>";
    });   
    tdstring+=extraTH;
    tdstring+="</tr></thead><tbody>";
    //CREATE TABLE ROWS
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

/* Table Without Headers Generator */
function generateTableNoHeaders(tabledata, targetdiv, extraTD="",extraTH=""){
    var tdstring = "";
    var headings = [];
    $.each(tabledata['data'][0],function(index, item){
        headings.push(index);
    });
    //CREATE TABLE ROWS
    for(i=0;i<tabledata.data.length;i++){
        tdstring+="<tr>";
        for(j=0;j<headings.length;j++){
            tdstring+="<td>"+tabledata.data[i][headings[j]]+"</td>";
        }
        tdstring+=extraTD;
        tdstring+= "</tr>";
    }
    // Add table rows to target table tbody
    $('#'+targetdiv).html(tdstring);    
}



function setProgressBar(id, percentage){
    $("#"+id).css("width",percentage+"%").attr("aria-valuenow",percentage).html(percentage+"%").css("background-size",10000/percentage+"%")
}

/*modal functions*/
function showMessageBox(title, message){
    $('.message-title').html(title);
    $('.message-body').html(message);
    $('#message-modal').modal();
}

function tableToExcel (table, name){
	  var uri = 'data:application/vnd.ms-excel;base64,';
	  var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
	  var base64 = function(s) { 
		  				return window.btoa(unescape(encodeURIComponent(s))); 
		  			}
	  var format = function(s, c) { 
		  				return s.replace(/{(\w+)}/g, function(m, p) { 
		  												return c[p]; 
		  											}); 
		  			}  
	  return function(table, name) {
	    if (!table.nodeType) {
	    	table = document.getElementById(table)
	    }
	    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
	    window.location.href = uri + base64(format(template, ctx));
	  }	    
	}

function formatDBJson(jsonString){
 
    var result = jsonString.replace(/\\\\\\\\\\"/g, '"');
    result = result.replace(/\\\\\\\\\"/g, '"');
    result = result.replace(/\\\\\\\\"/g, '"');
    result = result.replace(/\\\\\\\"/g, '"');
    result = result.replace(/\\\\\\"/g, '"');
    result = result.replace(/\\\\\"/g, '"');
    result = result.replace(/\\\\"/g, '"');
    result = result.replace(/\\\"/g, '"');
    result = result.replace(/\\"/g, '"');
    result = result.replace(/\"/g, '"');
    result = result.replace(/"{/g, '{');
    result = result.replace(/}"/g, '}');
    result = result.replace(/"\[/g, '[');
    result = result.replace(/\]"/g, ']');

    // result = result.replace('"[', '[');
    // result = result.replace(']"', ']');
    return result;
}