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
    jsonPath = 'data/gv14r.json';
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

    tableHeader.append("<th>" + dataToUse.series[0].data[2].x + "</th>");
    for (var i = 0; i < dataToUse.series[0].data.length - 1; i++) {
        tableHeader.append("<th class='fixed'>" + dataToUse.series[0].data[i].x + "</th>");
    }
    //add rows:
    dataWrapper.append('<tbody class="tableBody"></tbody>');
    var bodyWrapper = $('.tableBody');

    for (var i = 0; i < dataToUse.series.length; i++) {
        bodyWrapper.append("<tr id='dataR" + (i + 1) + "'></tr>");
        var targetRow = $("#dataR" + (i + 1));
        targetRow.append('<td class="dataCell firstCol">' + (dataToUse.series[i].data[2].y) + '</td>');
        for (var j = 0; j < dataToUse.series[i].data.length - 1; j++) {
            if (dataToUse.series[i].data[j].y.substr(0, 1) == '-') {
                targetRow.append(
                    '<td class="dataCell bar">\
                        <div class="row">\
                            <div class="col-xs-4 text-right no-padding-right"><span class="gbar" style="width: ' + dataToUse.series[i].data[j].y.replace('-', '') + '"></span></div>\
                            <div class="col-xs-4 text-left no-padding-left"><span class="gbar" style="width: 0%"></span></div>\
                            <div class="col-xs-4 no-padding-left">' + dataToUse.series[i].data[j].y + '</div>\
                        </div>\
                    </td>');
            } else {
                targetRow.append(
                    '<td class="dataCell bar">\
                        <div class="row">\
                            <div class="col-xs-4 text-right no-padding-right"><span class="gbar" style="width: 0%"></span></div>\
                            <div class="col-xs-4 text-left no-padding-left"><span class="gbar" style="width: ' + dataToUse.series[i].data[j].y.replace('-', '') + '"></span></div>\
                            <div class="col-xs-4 no-padding-left">' + dataToUse.series[i].data[j].y + '</div>\
                        </div>\
                    </td>');
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