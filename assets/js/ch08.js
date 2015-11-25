/**
 * Created by fanzhang on 11/25/15.
 */


var jsonPath = 'data/gv39/data.json';
var dataToUse;
$(window).load(function () {
    var allCells = $('.dataValue');

    // add %
//    allCells.html(allCells.html() + "%");
    loadData(1);
});

function loadData(num) {
    switch (num) {
        case 1:
        {
            jsonPath = 'data/gv08/data.json';
        }
            break;
        case 2:
        {
            jsonPath = 'data/gv08/data2.json';
        }
            break;
        default :
        {
            jsonPath = 'data/gv08/data.json';
        }
    }
    $.getJSON(jsonPath)
        .done(function (json) {
            prepareTableWithData(json, function () {
                findMinMax(dataToUse.sortType);
                formatData(num);
            })
        })
        .fail(function (error) {
            console.log(error);
        })
    ;
}

function prepareTableWithData(json, callback) {

    dataToUse = json.data[0];
    var dataWrapper = $(".data-table");
    dataWrapper.html('');
    dataWrapper.append("<tr class='header-tr'></tr>");
    var tableHeader = $(".header-tr");
    tableHeader.append("<th> </th>");
    for (var i = 0; i < dataToUse.numberOfCols; i++) {
        tableHeader.append("<th>" + dataToUse.columns[i].content + "</th>");
    }

    //add rows:
    for (var i = 0; i < dataToUse.numberOfRows; i++) {
        dataWrapper.append("<tr id='dataR" + (i + 1) + "'></tr>");
        var targetRow = $("#dataR" + (i + 1));
        targetRow
            .append("<td class='row-header'>" + dataToUse.rows[i].content + "</td>")
        for (var j = 0; j < dataToUse.numberOfCols; j++) {
            targetRow.append("<td class='dataValue' id='r" + (i + 1) + "col" + (j + 1) + "'>" + (dataToUse.data[i].values[j].value) + "</td>");
        }
    }


    // call back function
    if (callback && typeof(callback) === "function") {
        callback();
    }
}
function formatData(type){
    var allCells = $('.dataValue');
    switch (type) {
        case 1:
        {
            // percent
            for (var i=0; i<allCells.length; i++){
                var temp = $(allCells[i]);
                temp.html(temp.html() + "%")
            }
            //allCells.html(allCells.html() + "%");
        }
            break;
        case 2:
        {
            // percent
            for (var i=0; i<allCells.length; i++){
                var temp = $(allCells[i]);
                temp.html("%" + temp.html())
            }
            //allCells.html( "$" + allCells.html());
        }
            break;
        default :
        {
            allCells.html(allCells.html() + "%");
        }
    }
}
function findMinMax(type) {
    $(".dataValue").removeClass('color-green').removeClass('color-red');
    switch (type) {
        case 1:
        {
            //col
            // for all cols:
            for (var m = 1; m <= dataToUse.numberOfCols; m++) {
                var min = 100, max = 0;
                // find
                for (var i = 0; i < dataToUse.numberOfRows; i++) {
                    var temp = $("#r" + (i + 1) + "col" + m);
                    var tempVal = parseInt(temp.html());
                    min = min > tempVal ? tempVal : min;
                    max = max < tempVal ? tempVal : max;
                }
                //label
                for (var i = 0; i < dataToUse.numberOfRows; i++) {
                    var temp = $("#r" + (i + 1) + "col" + m);
                    var tempVal = parseInt(temp.html());
                    if(min==tempVal){
                        temp.addClass('color-green')
                    }
                    if(max==tempVal){
                        temp.addClass('color-red')
                    }
                }
            }
        }
            break;
        case 2:
        {
            //row

            // for all rows:
            for (var m = 1; m <= dataToUse.numberOfRows; m++) {
                var min = 100, max = 0;
                // find
                for (var i = 0; i < dataToUse.numberOfCols; i++) {
                    var temp = $("#r" + m + "col" + (i + 1));
                    var tempVal = parseInt(temp.html());
                    min = min > tempVal ? tempVal : min;
                    max = max < tempVal ? tempVal : max;
                }
                //label
                for (var i = 0; i < dataToUse.numberOfCols; i++) {
                    var temp = $("#r" + m + "col" + (i + 1));
                    var tempVal = parseInt(temp.html());
                    if(min==tempVal){
                        temp.addClass('color-green')
                    }
                    if(max==tempVal){
                        temp.addClass('color-red')
                    }
                }
            }
        }
            break;
        default :
        {

        }
    }
}
