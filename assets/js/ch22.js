$(function () {
    convertedServerData('data/gv22.json');
});

function convertedServerData(jsonPath) {
    $.getJSON(jsonPath)
        .done(function (json) {
            console.log(json);
            initHighChartWith(json);
        })
        .fail(function (error) {
            console.log(error);
        })
    ;
}

function initHighChartWith(data) {

    var seriesdata = [];
    var categories = [];

    for (var i in data.data.series) {
        var temp = {};
        temp.name = data.data.series[i].name;
        temp.data = [];
        for (var j in data.data.series[i].data) {
            temp.data.push(data.data.series[i].data[j].y);
            if (categories.length < data.data.series[i].data.length) {
                categories.push(data.data.series[i].data[j].x);
            }
        }
        seriesdata.push(temp);
    }

    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Clustered Cylinder Chart'
        },
        subtitle: {
            text: 'Chart Title (n=215)'
        },
        xAxis: {
            categories: categories,
            crosshair: false
        },
        yAxis: {
            min: 0,
            title: {
                enabled: false
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{y}<br>{y}%"
                }
            }
        },
        series: seriesdata
    });
}