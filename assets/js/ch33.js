$(function () {
  $.getJSON('data/ch33.json')
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

  chartData.series[0].data.forEach(function(element, index, array) {
    categories.push(element.x);
  });
  chartData.series.forEach(function(element, index, array) {
    var data = [];
    element.data.forEach(function(element, index, array) {
      data.push(element.y);
    });
    series.push({
      name: element.name,
      data: data
    });
  });


  $('#container').highcharts({
    chart: {
      type: 'line',
      inverted: true
    },
    //title: {
    //  text: 'Average fruit consumption during one week'
    //},
    subtitle: {
      style: {
        position: 'absolute',
        right: '0px',
        bottom: '10px'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    xAxis: {
      gridLineWidth: 1,
      tickmarkPlacement: 'on',
      categories: categories
    },
    yAxis: {
      title: {
        text: 'Number of units'
      },
      labels: {
        formatter: function () {
          return this.value + '%';
        }
      },
      min: -100,
      max: 100
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5
      },
      series: {
        events: {
          legendItemClick: function () {
            return false;
          }
        }
      }
    },
    series: series
  }, function(chart) {

  });

}
