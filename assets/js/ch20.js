$(function () {
    convertedServerData('data/gv20.json');
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
            if(categories.length<data.data.series[i].data.length){
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
            text: 'Driver Chart(Negative)'
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
                text: 'Rainfall (mm)',
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
                    format: "{y}%"
                }
            }
        },
        series: seriesdata
        //    [{
        //    name: 'Brand 1',
        //    data: [49, 71, 96, 100, 44]
        //
        //}, {
        //    name: 'Brand 2',
        //    data: [83, 78, 98, 93, 100]
        //
        //}, {
        //    name: 'Brand 3',
        //    data: [48, 38, 39, 41, 47]
        //}]
    });
}