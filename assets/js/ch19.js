$(function () {
  $.getJSON('data/ch19.json')
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
  var charts = [];

  chartData.series[0].data.forEach(function(element, index, array) {
    categories.push(element.x);
  });

  chartData.series.forEach(function(element, index, array) {
    var data = [];
    element.data.forEach(function(element, index, array) {
      data.push(parseFloat(element.y));
    });
    series.push({
      name: element.name,
      data: data
    });
  });


  Highcharts.setOptions({
    colors: ['#7F7F7F', '#81B8CA', '#BE0712', '#0E64AF', '#FDCE30', '#000'],
    title:{
      text: null
    },
    yAxis: {
      min: 0,
      lineWidth: 1,
      tickWidth: 1,
      tickLength: 5,
      tickInterval: 20,
      gridLineWidth: 0,
      labels: {
        format: '{value}%'
      },
      title: {
        text: null
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        groupPadding: 0.1,
        pointPadding: 0,
        animation: false,
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          format: '{y:.1f}%',
          crop: false,
          overflow: 'none'
        }
      }
    }
  });

  // default options
  var options = {
    chart: {
      type: 'column'
    },

    xAxis: {
      categories: categories
    }
  };

  var max=0;
  series.forEach(function(element, index, array) {
    var chartOptions = {
      chart: {
        renderTo: 'container' + index
      },
      series: [element]
    };
    chartOptions = jQuery.extend(true, {}, options, chartOptions);
    var chart = new Highcharts.Chart(chartOptions);
    var yAxisMax = chart.yAxis[0].getExtremes().max;
    if (yAxisMax > max) {
      max = yAxisMax;
    }
    charts.push(chart);
  });

  charts.forEach(function(element, index, array) {
    element.yAxis[0].update({
      endOnTick: false
    }, false);
    element.yAxis[0].setExtremes(null,max, true,false);
  });
}