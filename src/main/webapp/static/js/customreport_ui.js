var colors = [ "#7DD0B6","#1D4E89","#00B3CA","#D2B29B","#9DC6D8","#E38690","#F69256","EAD98B","965251","C6CCCC"];



function lekh(str){
  document.write("<hr>");
  document.write(str);
  document.write("<hr>");
}

//var numberOfRows = 0;
//var currentLevel = 0;
var theLevel = 0;
var maxLevels = 0;

var currentProp = "";
var theTitle = "";
var row = "";
var jsArray = Array();

var levelLabelsPresent = [];
var leafLabels = [];
var levelLabels = [];


var lastLength = 0;
var cProp ="";

function parseObject(obj, level, currentProp, category){
	var i = 0;
    for (var prop in obj) {
    	if(typeof obj[prop] === 'object'){

    		if(currentProp===""){
    			currentProp = prop;
    		}else{
    			currentProp = currentProp +"_"+prop;
    		}
    		if(level==0){
    			theTitle = prop;
    		}

    		if(level==1){
    			currentProp = "";
    			if(maxLevels>level){
    				jsArray.push("{"+row+"}");
    				row = "";
    				keyOn = 1;
    				lastLength = 0;
    			}

    			row += "\"title\": \""+theTitle + "\","+" \""+category+"\" : \""+prop+"\"";
    		}

    		//if(keyOn==0) MyKeys.push(prop+"-"+level+" -->"+lastLength);
    		cProp = prop;

    		parseObject(obj[prop], ++level, currentProp, category);

        // getting maxLevels
    		if(maxLevels < level){
    			maxLevels = level;
    		}

        // getting name of labels at different levels
        var currentLevelLabels = [];
        for(var tProp in obj){
          currentLevelLabels.push(tProp);
        }
        /*
        $.each(obj, function(index, value){
          currentLevelLabels.push(index);
        });
        */
        var levelLabelData = {"level":level , "labels" : currentLevelLabels};

        if(levelLabelsPresent.indexOf(level) < 0){
          levelLabelsPresent.push(level);
          levelLabels.push(levelLabelData);
        }

        // resetting level to real array index
    		--level;

		}else{
			row+= ", \""+cProp+"__"+prop + "\" : \"" + obj[prop]+"\"";
      if(leafLabels.indexOf(prop) < 0){
        leafLabels.push(prop);
      }

			lastLength++;
			i++;
		}
    }
    //return jsArray;
}

function getJsonLevels(object){
  //var numberOfRows = 0;
  //var currentLevel = 0;
  theLevel = 0;
  maxLevels = 0;

  currentProp = "";
  theTitle = "";
  row = "";
  jsArray = Array();

  levelLabelsPresent = [];
  leafLabels = [];
  levelLabels = [];

  parseObject(object, 0, "", "")
  levelLabels.push({"level":maxLevels+1 , "labels" : leafLabels});
  return levelLabels;
}


function getClientJSON(object, theCategory){
  theLevel = 0;
  maxLevels = 0;

  currentProp = "";
  theTitle = "";
  row = "";
  jsArray = Array();

  levelLabelsPresent = [];
  leafLabels = [];
  levelLabels = [];
  parseObject(object, 0, "", theCategory);
  return JSON.parse("["+jsArray+"]");
}




function getLabelsOfLevel(object, level){
  result = getJsonLevels(object);
  labelsToReturn = null;

  $.each(result, function(index, value){
    if(value['level'] == level){
      labelsToReturn = value['labels'];
    }
  });
  return labelsToReturn;
}


function getColSpanForLevel(object, level){
  result = 0;
  result = getLabelsOfLevel(object, level+1).length;
  return result;
}



function getChartDATA(object, chartLabel, labelColumn, dataColumn, chartType, chartID){
  /*
  1. Prepare Labels
  2. Prepare datasets
    a. prepare label
    b.prepare data
    c. prepare background

  */

  var labels = [];
  var datasets = [];
  var data = [];
  var backgroundColors = [];


  for(var i=0; i<object.length; i++){
    for(var prop in object[i]){

      //1. Prepare Labels
      if(prop === labelColumn){
        labels.push(object[i][prop]);
      }

      if(prop === dataColumn){
        data.push(object[i][prop])
      }


    }

    backgroundColors.push(colors[i]);
  }

  var cData = {
      labels: labels,
      datasets: [{
        label: chartLabel,
        data: data,
        backgroundColor: backgroundColors
      }]
    };

  var ctx = document.getElementById(chartID).getContext('2d');

  ctx.canvas.width = 300;
  ctx.canvas.height = 300;

  //line, bar, radar, pie, doughnout, polarArea
  var myChart = new Chart(ctx, {
    type: chartType,
    data: cData,
     options: {
            scales: {
                yAxes: [{
                    display:true,
                    stacked:true,
                    ticks: {
                        min: 0,
                        beginAtZero: true
                    }
                }]
            }
        }
  });

}
