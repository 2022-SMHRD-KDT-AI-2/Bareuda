function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var p_id = getParameterByName('p_id');
console.log(p_id);
$(function() {
    $.ajax({
    url: "http://211.227.114.104:5023/",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"p_id":p_id},
    success:
    function(data){
        var pos_rate = data.pos_rate;
        var neg_rate = data.neg_rate;
        var pos_words = data.pos_words;
        var neg_words = data.neg_words;
        console.log(pos_rate);
        console.log(neg_rate);
        console.log(pos_words);
        console.log(neg_words);
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
});

function drawDoughnut(skinlist, datalist, chartName) {

    var context = document
        .getElementById(chartName)
        .getContext('2d');

    var myChartD = new Chart(context, {
        type: 'doughnut',
        elements:{
            point:{
                radius:0
            },
        },
        data: { // 차트에 들어갈 데이터
            labels: [
                //x 축
                  skinlist[0],skinlist[1],skinlist[2]
            ],
            datasets: [
                { //데이터
                    label: '분포도', //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: datalist,
                    backgroundColor: [
                        'rgba(	116, 187, 235, 0.5)',
                    ],
                    borderColor: [
                        'rgba(	116, 187, 235, 1)',
                    ],
                    borderWidth: 5
                }
            ]
        },
        options: {
            scale:{
                ticks:{
                    beginAtZero:true,
                    display: false,
                    min:0,
                    max:50,
                    stepSize:10
                }
            }
        }
    })

    return myChartD;
};

function drawRadar(datalist, chartName) {
    var context = document
        .getElementById(chartName)
        .getContext('2d');
    var myChartR = new Chart(context, {
        type: 'radar',
        elements:{
            point:{
                radius:0
            },
        },
        data: { // 차트에 들어갈 데이터
            labels: [
                //x 축
                '지성','건성','중성','민감성','복합성'
            ],
            datasets: [
                { //데이터
                    label: '분포도', //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: datalist,
                    backgroundColor: [
                        'rgba(	116, 187, 235, 0.5)',
                    ],
                    borderColor: [
                        'rgba(	116, 187, 235, 1)',
                    ],
                    borderWidth: 5
                }
            ]
        },
        options: {
            scale:{
                ticks:{
                    beginAtZero:true,
                    display: false,
                    min:0,
                    max:50,
                    stepSize:10
                }
            }
        }
    })
    return myChartR;
};

/* 차트 추가 (pie, horizontal, word ) */
function drawRadar(reviewlist, chartName) {

    var context = document
        .getElementById(chartName)
        .getContext('2d');
    var myChartP = new Chart(context, {
        type: 'pie',
        elements:{
            point:{
                radius:0
            },
        },
        data: { // 차트에 들어갈 데이터
            labels: [
                //x 축
                '긍정율','부정율'
            ],
            datasets: [
                { //데이터
                    label: '분포도', //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: reviewlist,
                    backgroundColor: [
                        'rgba(	116, 187, 235, 0.5)',
                    ],
                    borderColor: [
                        'rgba(	116, 187, 235, 1)',
                    ],
                    borderWidth: 5
                }
            ]
        },
        options: {
            scale:{
                ticks:{
                    beginAtZero:true,
                    display: false,
                    min:0,
                    max:50,
                    stepSize:10
                }
            }
        }
    })
    return myChartP;
};



var myChart5 = drawRadar([80,20], 'myChart5');


/* horizontal */

function drawHorizontal(keywordlist, datalist, chartName) {
    var context = document
        .getElementById(chartName)
        .getContext('2d');
    var myChartH = new Chart(context, {
        type: 'horizontalBar',
        elements:{
            point:{
                radius:0
            },
        },
        data: { // 차트에 들어갈 데이터
            labels: [
                //x 축
                keywordlist[0],keywordlist[1],keywordlist[2],keywordlist[3],keywordlist[4],
                keywordlist[5],keywordlist[6],keywordlist[7],keywordlist[8],keywordlist[9]
            ],
            datasets: [
                { //데이터

                    label: '빈도수', //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: datalist,
                    backgroundColor: [
                        'rgba(	116, 187, 235, 0.5)',
                    ],
                    borderColor: [
                        'rgba(	116, 187, 235, 1)',
                    ],
                    borderWidth: 5,
                }
            ]
        },
        options: {

            scale:{
                ticks:{
                    beginAtZero:true,
                    display: false,
                    min:0,
                    max:50,
                    stepSize:10
                }
            }
        }
    })

    return myChartH;
};

var myChart6 = drawHorizontal(['가','나','다','라','마','바','사','아','자','차'],[10,9,8,7,6,5,4,3,2,1], 'myChart6');
var myChart7 = drawHorizontal(['가','나','다','라','마','바','사','아','자','차'],[10,9,8,7,6,5,4,3,2,1], 'myChart7');


/* word */

function drawWord(keylist, valuelist, chartName) {
    var context = document.getElementById(chartName).getContext('2d');
    var myChartW = new Chart(context, {
        type: 'wordCloud',
        data: {
            labels: [
              keylist[0],keylist[1],keylist[2]
            ],
            datasets: [
                {
                label: '',
                data: valuelist,
                },
            ],
        },
        options: {
            title: {
              display: false,
              text: "Chart.js Word Cloud"
            },
            plugins: {
              legend: {
                display: false
              }
            }

}})
        return myChartW;
  };

  var myChart8 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart8' );
  var myChart9 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart9' );