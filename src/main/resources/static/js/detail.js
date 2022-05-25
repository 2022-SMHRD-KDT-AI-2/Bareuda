function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var p_id = getParameterByName('p_id');
console.log(p_id);
$(function() {
    $.ajax({
    url: "http://222.102.43.36:5023/",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"p_id":p_id},
    success:
    function(data){
        var pos_rate = parseInt(data.pos_rate);
        var neg_rate = parseInt(data.neg_rate);
        var pos_words = data.pos_words;
        var neg_words = data.neg_words;
        var pos_weights = data.pos_weights;
        var neg_weights = data.neg_weights;

        var myChart5 = drawPie([pos_rate,neg_rate], 'myChart5');

        var myChart6 = drawHorizontal(pos_words,pos_weights, 'myChart6');
        var myChart7 = drawHorizontal(neg_words,neg_weights, 'myChart7');

        console.log(pos_rate);
        console.log(neg_rate);
        console.log(pos_words);
        console.log(neg_words);
        console.log(pos_weights);
        console.log(neg_weights);
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

/* pie */
function drawPie(reviewlist, chartName) {

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




/* word */
function drawWord(keylist,valuelist,chartName){
    anychart.onDocumentReady(function() {

        var data = [
            [keylist[0], valuelist[0]],
            [keylist[1], valuelist[1]],
            [keylist[2], valuelist[2]],
            [keylist[3], valuelist[3]],
            [keylist[4], valuelist[4]],
            [keylist[5], valuelist[5]],
            [keylist[6], valuelist[6]],
            [keylist[7], valuelist[7]],
            [keylist[8], valuelist[8]],
            [keylist[9], valuelist[9]]
          ];

       // create a tag (word) cloud chart
        var chart = anychart.tagCloud(data);

        chart.title('긍정 워드클라우드')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');

        // display the word cloud chart
        chart.container(chartName);
        chart.draw();
      });
}

var myChart8 = drawWord(['Hello', 'world', 'normally','Hello', 'world', 'normally','Hello', 'world', 'normally','yaho'],[100,90,80, 70, 60,50,40,30,20,10],'myChart8' );
var myChart9 = drawWord(['Hello', 'world', 'normally','Hello', 'world', 'normally','Hello', 'world', 'normally','yaho'],[100,90,80, 70, 60,50,40,30,20,10],'myChart9' );



