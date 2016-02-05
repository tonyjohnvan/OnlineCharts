$(function () {
    convertedServerData('data/gv12.json');
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
    var data1 = [];
    var data2 = [];

    data1.push(data.data.series[0]);
    data2.push(data.data.series[1]);

    $('#pie1').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: data.data.series[0].name
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle'
        },
        series: data1
    });
    $('#pie2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: data.data.series[1].name
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle'
        },
        series: data2
    });

    $('#table1tb').html('');
    $('#table2tb').html('');

    for (var i in data1[0].data) {
        $('#table1tb').append('<tr>\
            <td class="label-cell">' + data1[0].data[i].name + '</td>\
            <td class="bar-cell"><span class="gbar" style="width: ' + data1[0].data[i].y + '%"></span></td>\
            <td class="legend-cell">' + (data1[0].data[i].y) + '%</td>\
        </tr>')
    }
    for (var i in data2[0].data) {
        $('#table2tb').append('<tr>\
            <td class="label-cell">' + data2[0].data[i].name + '</td>\
            <td class="bar-cell"><span class="gbar" style="width: ' + data2[0].data[i].y + '%"></span></td>\
            <td class="legend-cell">' + (data2[0].data[i].y) + '%</td>\
        </tr>')
    }
}