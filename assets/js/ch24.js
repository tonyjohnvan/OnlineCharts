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
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        plotOptions: {
            column: {
                stacking: 'percent',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: seriesdata
    });
}