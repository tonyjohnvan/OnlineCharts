/**
 * Created by fanzhang on 1/13/16.
 */

var jsonPath;
var dataToUse;

var fixHelper = function (e, ui) {
    ui.children().each(function () {
        $(this).width($(this).width());
    });
    return ui;
};

$(window).load(function () {
    loadData(1);
});

function loadData() {
    jsonPath = 'data/gv16.json';
    $.getJSON(jsonPath)
        .done(function (json) {
            prepareTableWithData(json, function () {
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
    for (var i = 0; i < dataToUse.series[0].data.length; i++) {
        if (i >= 1) {
            tableHeader.append("<th class='text-center'>" + dataToUse.series[0].data[i].x + "</th>");
        } else {
            tableHeader.append("<th>" + dataToUse.series[0].data[i].x + "</th>");
        }

    }
    //add rows:
    dataWrapper.append('<tbody class="tableBody"></tbody>');
    var bodyWrapper = $('.tableBody');

    for (var i = 0; i < dataToUse.series.length; i++) {
        bodyWrapper.append("<tr id='dataR" + (i + 1) + "'></tr>");
        var targetRow = $("#dataR" + (i + 1));
        targetRow.append('<td class="dataCell firstCol">' + (dataToUse.series[i].data[0].y) + '</td>');
        for (var j = 1; j < dataToUse.series[i].data.length; j++) {
            if (j === 1) {
                targetRow.append('<td class="dataCell"><div class="row"><div class="col-xs-11 text-left"><span class="gbar" style="width: ' +
                    (dataToUse.series[i].data[j].y) + '"></span></div></div></td>');
            } else {
                targetRow.append('<td class="dataCell short"><div class="row"><div class="col-xs-12">' + (dataToUse.series[i].data[j].y) + '</div></div></td>');
            }
        }
    }

    // call back function
    if (callback && typeof(callback) === "function") {
        callback();
    }
}

function addOtherFeatrures() {
    // JQ sortable
    $('.tableBody').sortable({
        helper: fixHelper
    }).disableSelection();
    $('.data-table').tablesorter()
}