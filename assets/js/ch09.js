$(function () {
  $.getJSON('data/ch09.json')
    .done(function (json) {
      prepareChartWithData(json, function () {
      });
    })
    .fail(function (error) {
      console.log(error);
    });
});

function prepareChartWithData(json, callback) {
  var chartData = json.data;
  var categories = [];
  var series = [];
  var data = {};
  var firstSeries = {
    name: '',
    data: []
  };

  chartData.series.forEach(function(element, index, array) {
    categories.push(element.name);
  });

  for (var i = 0, n = chartData.series.length; i < n; i++) {
    for (var j = 0, m = chartData.series[i].data.length; j < m; j++) {
      var item = chartData.series[i].data[j];
      if (j == 0) {
        if (!firstSeries.name) {
          firstSeries.name = chartData.series[i].data[j].x;
        }
        firstSeries.data.push(parseFloat(chartData.series[i].data[j].y));
      } else {
        if (!data[item.x]) {
          data[item.x] = [];
        }
        data[item.x].push(parseFloat(chartData.series[i].data[j].y));
      }
    }
  }

  series.push({
    name: firstSeries.name,
    type: 'column',
    showInLegend: false,
    yAxis: 0,
    data: firstSeries.data
  });
  for (var prop in data) {
    series.push({
      name: prop,
      type: 'scatter',
      yAxis: 1,
      data: data[prop]
    });
  }

  $('#container').highcharts({
    chart: {
      alignTicks: false,
      zoomType: 'xy'
    },
    title: {
      text: 'Chart Title Here'
    },
    xAxis: [{
      categories: categories,
      crosshair: true
    }],
    yAxis: [{
      gridLineWidth: 0,
      tickLength: 5,
      tickWidth: 1,
      lineWidth: 1,
      crosshair: {
        color: Highcharts.getOptions().colors[0],
        zIndex: 10
      },
      title: {
        text: firstSeries.name,
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      credits: {
        enabled: false
      },
      labels: {
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      }
    }, {
      max: 100,
      tickInterval: 10,
      min: 0,
      gridLineWidth: 0,
      tickLength: 5,
      tickWidth: 1,
      lineWidth: 1,
      crosshair: {
        color: Highcharts.getOptions().colors[1],
        zIndex: 10
      },
      labels: {
        format: '{value} %',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: 'T2B Performance',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    series: series
  });
}