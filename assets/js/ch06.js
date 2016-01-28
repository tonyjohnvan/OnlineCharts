/**
 * Created by fanzhang on 11/25/15.
 */


var jsonPath;
var dataToUse;
$(window).load(function () {
    loadData(1);
});
function loadData(num) {
    switch (num) {
        case 1:
        {
            jsonPath = 'data/gv06.json';
        }
            break;
        case 2:
        {
            jsonPath = 'data/gv06-2.json';
        }
            break;
        default :
        {
            jsonPath = 'data/gv06.json';
        }
    }
    $.getJSON(jsonPath)
        .done(function (json) {
            prepareTableWithData(json, function () {
                formatData(num);
                addOtherFeatrures();
            })
        })
        .fail(function (error) {
            console.log(error);
        })
    ;
}

function prepareTableWithData(json, callback) {

    dataToUse = json.data;
    var dataWrapper = $(".data-table");
    dataWrapper.html('');
    dataWrapper.append('<thead class="tablehead"></thead>');
    $('.tablehead').append("<tr class='header-tr'></tr>");
    var tableHeader = $(".header-tr");
    tableHeader.append("<th class='header-first'>&nbsp</th><th class='header-index'>" + dataToUse.series[0].data[0].x + "</th>");
    for (var i = 1; i < dataToUse.series[0].data.length; i++) {
        tableHeader.append("<th class='sorter'>" + dataToUse.series[0].data[i].x + "</th>");
    }

    //add rows:
    dataWrapper.append('<tbody class="tableBody"></tbody>');
    var bodyWrapper = $('.tableBody');
    for (var i = 0; i < dataToUse.series.length; i++) {
        bodyWrapper.append("<tr id='dataR" + (i + 1) + "'></tr>");
        var targetRow = $("#dataR" + (i + 1));
        targetRow
            .append("<td class='row-header row-header-first'>" + dataToUse.series[i].name + "</td><td class='row-header row-header-index'>" + dataToUse.series[i].data[0].y + "</td>");
        for (var j = 1; j < dataToUse.series[i].data.length; j++) {
            targetRow.append("<td class='dataValue' id='r" + (i + 1) + "col" + (j + 1) + "'>" + (dataToUse.series[i].data[j].y) + "</td>");
        }
    }


    // call back function
    if (callback && typeof(callback) === "function") {
        callback();
    }
}
function formatData() {
    var allCells = $('.dataValue');
    for (var i = 0; i < allCells.length; i++) {
        var temp = $(allCells[i]);
        var tempValue = parseInt(temp.html().substr(0, temp.html().length - 1));
        if (tempValue <= 20) {
            $(temp).addClass('red');
        } else if (tempValue > 20 && tempValue <= 40) {
            $(temp).addClass('orange');
        } else if (tempValue > 40 && tempValue <= 60) {
            $(temp).addClass('yellow');
        } else if (tempValue > 60 && tempValue <= 80) {
            $(temp).addClass('green');
        } else if (tempValue > 80 && tempValue <= 100) {
            $(temp).addClass('blue');
        }
    }
}

function addOtherFeatrures(){
    // JQ sortable
    $('.tableBody').sortable({
        helper: fixHelper
    }).disableSelection();
    $('.data-table').dragtable({
        sortClass: '.sorter',
        dragaccept: '.sorter',
        exact: true
    }).tablesorter({ selectorSort: '.sorter' });
}

var fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
};