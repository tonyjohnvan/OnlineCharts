/**
 * Created by fanzhang on 12/11/15.
 */

var jsonPath = 'data/gv05/data.json';
var dataToUse;

$(window).load(function () {
    loadData(1);
    $('.noselect').delegate('img', 'mousedown', function (e) {
        e.preventDefault();
    });
});

var authToken;
function loadData(num) {
//    switch (num) {
//        case 1:
//        {
//            jsonPath = 'data/gv05/data.json';
//        }
//            break;
//        case 2:
//        {
//            jsonPath = 'data/gv05/data2.json';
//        }
//            break;
//        default :
//        {
//            jsonPath = 'data/gv08/data.json';
//        }
//    }
//    $.getJSON(jsonPath)
//        .done(function (json) {
//            prepareTableWithData(json, function () {
//            })
//        })
//        .fail(function (error) {
//            console.log(error);
//        })
//    ;

    var auth = {"username": "user", "password": "password"};

    $.ajax({
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json");
        },
        method: "POST",
        url: "http://ec2-54-85-179-119.compute-1.amazonaws.com:8080/nwo/api/login",
        data: JSON.stringify(auth),
        success: function (json) {
            console.log(json);
            //localStorage.set('token', json);
            authToken = json;


            var callData = {
                "chartId": 1,
                "chartType": "SparkLine",
                "dataSource": "quantilus_chart5",
                "query": "select * from quantilus_chart5 order by chart, series, factor",
                "series": [
                    {
                        "column": "series",
                        "x": {
                            "column": "factor"
                        },
                        "y": {
                            "column": "value"
                        }
                    }
                ]
            };
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Accept", "application/json");
                    xhrObj.setRequestHeader("Authorization", "Bearer " + authToken.access_token);
                },
                method: "POST",
                url: "http://ec2-54-85-179-119.compute-1.amazonaws.com:8080/nwo/chart/getChartData ",
                data: JSON.stringify(callData),
                success: function (json) {
                    console.log(json);
                    prepareTableWithData(json);
                }
            });


        }
    });


}


function prepareTableWithData(json, callback) {
    $('#loadingText').remove();
    dataToUse = json.data;
    var dataWrapper = $(".data-table");
    dataWrapper.html('');
    dataWrapper.append("<tr class='header-tr'></tr>");
    var tableHeader = $(".header-tr");
    tableHeader.append("<th> </th>").append("<th class='lineTitle'>"+dataToUse.series[0].data[0].x+"</th>");
    for (var i = 1; i < dataToUse.series[0].data.length; i++) {
        tableHeader.append("<th>" + dataToUse.series[0].data[i].x + "</th>");
    }

    // Find Highest
    var maxValue = 0;
    for (var i = 0; i < dataToUse.series.length; i++) {
        maxValue < dataToUse.series[i].data[0].y ? maxValue = dataToUse.series[i].data[0].y : {};
    }

    //add rows:
    for (var i = 0; i < dataToUse.series.length; i++) {
        dataWrapper.append("<tr id='dataR" + (i + 1) + "'></tr>");
        var targetRow = $("#dataR" + (i + 1));
        targetRow
            .append("<td class='row-header'> Series " + dataToUse.series[i].name + "</td>")
            .append(
            '<td class="barValue" id="r' + (i + 1) + 'col1">' +
            '<div class="barValueWrapper">' +
            '<div class="barValueInner" style="width: ' +
            (dataToUse.series[i].data[0].y / maxValue) * 100 +
            '%"></div>' +
            '</div>' +
            '<span class="barValue">' + dataToUse.series[i].data[0].y + '</span>' +
            '</td>'
        );
        for (var j = 1; j < dataToUse.series[i].data.length; j++) {
            var imgSrc = '';
            switch (dataToUse.series[i].data[j].y) {
                case 1:
                {
                    imgSrc = 'assets/img/gv05/pie1.png';
                }
                    break;
                case 2:
                {
                    imgSrc = 'assets/img/gv05/pie2.png';
                }
                    break;
                case 3:
                {
                    imgSrc = 'assets/img/gv05/pie3.png';
                }
                    break;
                case 4:
                {
                    imgSrc = 'assets/img/gv05/pie4.png';
                }
                    break;
                default:
                {
                    imgSrc = 'assets/img/gv05/pie1.png';
                }
                    break;
            }
            targetRow.append(
                "<td class='dataValue' id='r" + (i + 1) + "col" + (j + 1) + "'>" +
                '<img src="' + imgSrc + '" alt=""/>' +
                "</td>"
            );

        }
    }


    // call back function
    if (callback && typeof(callback) === "function") {
        callback();
    }
}
