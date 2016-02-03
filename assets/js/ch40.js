$(function () {
  $.getJSON('data/ch40.json')
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
      inverted: true,
      //events: {
      //  load: function() {
      //    StaggerDataLabels(this.series);
      //  },
      //  redraw: function() {
      //    var series = this.series;
      //    setTimeout(function() {
      //      StaggerDataLabels(series);
      //    }, 1000);
      //  }
      //}
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
        dataLabels: {
          allowOverlap: true,
          enabled: true
        },
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


function StaggerDataLabels(series) {
  sc = series.length;
  if (sc < 2) return;

  for (s = 1; s < sc; s++) {
    var s1 = series[s - 1].points,
      s2 = series[s].points,
      l = s1.length,
      diff, h;

    for (i = 0; i < l; i++) {
      if (s1[i].dataLabel && s2[i].dataLabel) {
        diff = s1[i].dataLabel.y - s2[i].dataLabel.y;
        h = s1[i].dataLabel.height + 2;

        if (isLabelOnLabel(s1[i].dataLabel, s2[i].dataLabel)) {
          if (diff < 0) s1[i].dataLabel.translate(s1[i].dataLabel.translateX, s1[i].dataLabel.translateY - (h + diff));
          else s2[i].dataLabel.translate(s2[i].dataLabel.translateX, s2[i].dataLabel.translateY - (h - diff));
        }
      }
    }
  }
}

//compares two datalabels and returns true if they overlap


function isLabelOnLabel(a, b) {
  var al = a.x - (a.width / 2);
  var ar = a.x + (a.width / 2);
  var bl = b.x - (b.width / 2);
  var br = b.x + (b.width / 2);

  var at = a.y;
  var ab = a.y + a.height;
  var bt = b.y;
  var bb = b.y + b.height;

  if (bl > ar || br < al) {
    return false;
  } //overlap not possible
  if (bt > ab || bb < at) {
    return false;
  } //overlap not possible
  if (bl > al && bl < ar) {
    return true;
  }
  if (br > al && br < ar) {
    return true;
  }

  if (bt > at && bt < ab) {
    return true;
  }
  if (bb > at && bb < ab) {
    return true;
  }

  return false;
}