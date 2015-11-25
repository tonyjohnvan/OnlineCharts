/**
 * Created by fanzhang on 11/18/15.
 */

var jsonPath = 'data/gv39/data.json';
var dataToUse;

changeData(1);

$(window).load(function () {
    $('.data-point').delegate('point-label', 'dbclick', function(){
        $('.point-label').attr('contenteditable','true');
    })
});


function prepareChartWithData(json, callback) {
    dataToUse = json.data[0];
    var dataWrapper = $(".data-wrapper");
    dataWrapper.html('');

    // append rows
    for (var i = 0; i < dataToUse.rows.length; i++) {
        var row = i + 1;
        dataWrapper.append(
                '<li class="one-row" id="data_' + dataToUse.rows[i].id + '">' +
                '<h1 class="row-label" contenteditable="true">' +
                dataToUse.rows[i].title +
                '</h1>' +
                '<div class="color-meter" id="' + dataToUse.rows[i].id + 'Bar"></div>' +
                '<ul class="data-points-wrap" id="d' + dataToUse.rows[i].id + '">' +
                '</ul>' +
                '</li>'
        );
        var rowInner = $('#d' + dataToUse.rows[i].id);

        // append points
        for (var j = 0; j < dataToUse.rows[i].point.length; j++) {
            var acturalPos = dataToUse.rows[i].point[j].value;
            var color = acturalPos == 0 ? "yellow" : acturalPos < 0 ? "red" : "green";
            var adjustedPos = acturalPos * 3.5 + 436 - j * 30;
            var labelPos = j % 2 == 0 ? "up" : "down";
            rowInner.append(
                    '<li class="data-point ' + color + '" style="left: ' + adjustedPos + 'px;" id="d' + dataToUse.rows[i].id + 'p' + dataToUse.rows[i].point[j].id + '">' +
                    '<label for="d' + dataToUse.rows[i].id + 'p' + dataToUse.rows[i].point[j].id + '" class="point-label ' + labelPos + ' noselect"  contenteditable="true">' +
                    dataToUse.rows[i].point[j].Tag +
                    '</label>' +
                    '</li>'
            )
        }

        // rearrange the gradient bar
        // 1. the position and width of the bar
        var leftMost = dataToUse.rows[i].point[0].value * 3.5 + 436;
        var lastId = dataToUse.rows[i].point.length - 1;
        var rightMost = dataToUse.rows[i].point[lastId].value * 3.5 + 436 - lastId * 30;
        $('#' + dataToUse.rows[i].id + 'Bar').css({
            "margin-left": leftMost + 45,
            "width": rightMost - leftMost + lastId * 30
        });
        // 2. the gradient of the bar
        //      2.1 width with red
        //          2.1.1 find last red
        var firstRed, firstRedPos;
        var lastRed, lastRedPos;
        var widthRed;
        var RedPortion4Css;
        if (dataToUse.rows[i].point[0].value >= 0) {
            // there is no reds
            firstRed = -1;
            lastRed = -1;
            widthRed = 0;
            RedPortion4Css = 0;
        } else {
            // at least one red
            firstRed = 0;
            // find last red
            for (var m = 0; m < dataToUse.rows[i].point.length; m++) {
                if (dataToUse.rows[i].point[m].value >= 0) {
                    // find a non-red point, break
                    lastRed = m - 1;
                    break;
                }
            }
            if (firstRed == lastRed) {
                // only one red
                widthRed = 0;
                RedPortion4Css = 0;
            } else {
                // multiple reds
                firstRedPos = leftMost;
                lastRedPos = dataToUse.rows[i].point[lastRed].value * 3.5 + 436 - lastRed * 30;
                widthRed = lastRedPos - firstRedPos + 10 + lastRed * 30;
                RedPortion4Css = widthRed / (rightMost - leftMost + lastId * 30) * 100;
            }
        }

        //      2.2 find first green
        var firstGreen, firstGreenPos;
        var widthTillGreen;
        var greenPortionCss;
        for (var m = 0; m < dataToUse.rows[i].point.length; m++) {
            if (dataToUse.rows[i].point[m].value > 0) {
                firstGreen = m;
                break;
            }
        }
        firstGreenPos = dataToUse.rows[i].point[firstGreen].value * 3.5 + 436 - firstGreen * 30;
        widthTillGreen = firstGreenPos - leftMost + 10 + firstGreen * 30;
        greenPortionCss = widthTillGreen / (rightMost - leftMost + lastId * 30) * 100;


        //      2.3 find the 'zero' on the bar and mark as yellow
        //      2.4 find the previous and following point and mark as red/green
        var verticalZero = 436;
        var widthToYellow = verticalZero - leftMost + 10;
        var yellowPortion4Css = widthToYellow / (rightMost - leftMost + lastId * 30) * 100;


        $('#' + dataToUse.rows[i].id + 'Bar').css({
            'background': '-webkit-linear-gradient(360deg, red ' +
                RedPortion4Css + '%, yellow ' +
                yellowPortion4Css + '%, green ' +
                greenPortionCss + '%)'
        })

    }

    // rearrange the vertical zero line
    $('.vertical-zero').height(( 90 + 15 * 2 ) * dataToUse.rows.length);


    // call back function
    if (callback && typeof(callback) === "function") {
        callback();
    }
}

function changeData(num) {
    switch (num) {
        case 1 :
        {
            jsonPath = 'data/gv39/data.json';
        }
            break;
        case 2 :
        {
            jsonPath = 'data/gv39/data2.json';
        }
            break;
        default :
        {
            jsonPath = 'data/gv39/data2.json';
        }
    }
    $.getJSON(jsonPath)
        .done(function (json) {
            prepareChartWithData(json,function(){
                $('.point-label').draggable();
//                $('.point-label').resizable({
//                    handles: 'ne, se, sw, nw, s, w, e, n'
//                });
            })
        })
        .fail(function (error) {
            console.log(error);
        })
    ;
}

function changeToTheme(num){
    switch (num) {
        case 1 :
        {
            $('.one-row').css({
                'background': '#ffffff'
            });
            $('.row-label').css({
                'color':'#222'
            });
            $('.data-point label').css({
                'color':'#111'
            });
            $('.vertical-zero').css({
                'background':'rgba(0,0,0,0.1)'
            })
        }
            break;
        case 2 :
        {
            $('.one-row').css({
                'background': '#39424C'
            });
            $('.row-label').css({
                'color':'#222'
            });
            $('.data-point label').css({
                'color':'#111'
            });
            $('.vertical-zero').css({
                'background':'rgba(0,0,0,0.1)'
            })
        }
            break;
        default :
        {
        }
    }
}