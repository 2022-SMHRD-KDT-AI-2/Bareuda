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
                        'rgba(153,167,203, 0.5)',
                        'rgba(167,191,254,0.5)',
                        'rgba(192,209,254,0.5)'],
                    borderColor: [
                         'rgba(255,255,255, 1)',
                         'rgba(255,255,255, 1)',
                         'rgba(255,255,255, 1)',
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
                        'rgba(	171,190,237, 0.5)',
                    ],
                    borderColor: [
                          'rgba(	171,190,237, 1)',
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
                        'rgba(	187,203,240, 0.5)',
                        'rgba(	240, 239, 239, 0.5)'
                    ],
                    borderColor: [
                         'rgba(	187,203,240, 1)',
                         'rgba(	240, 239, 239, 1)'
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
                keywordlist[5],keywordlist[6],keywordlist[7],keywordlist[8],keywordlist[9],
            ],
            datasets: [
                { //데이터

                    label: '빈도수', //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: [datalist[0],datalist[1],datalist[2],datalist[3],datalist[4],
                           datalist[5],datalist[6],datalist[7],datalist[8],data[9],
                                      ],
                    backgroundColor: [
                        'rgba(	162,183,235, 0.5)',
                        'rgba(	171,190,237, 0.5)',
                        'rgba(	187,203,240, 0.5)',
                        'rgba(	193,208,241, 0.5)',
                        'rgba(	199,212,242, 0.5)',
                        'rgba(	204,216,243, 0.5)',
                        'rgba(	209,219,244, 0.5)',
                        'rgba(	213,222,245, 0.5)',
                        'rgba(	217,225,246, 0.5)',
                        'rgba(	240,244,251, 0.5)',
                    ],
                    borderColor: [
                         'rgba(	162,183,235, 1)',
                         'rgba(	171,190,237, 1)',
                         'rgba(	187,203,240, 1)',
                         'rgba(	193,208,241, 1)',
                         'rgba(	199,212,242, 1)',
                         'rgba(	204,216,243, 1)',
                         'rgba(	209,219,244, 1)',
                         'rgba(	213,222,245, 1)',
                         'rgba(	217,225,246, 1)',
                         'rgba(	240,244,251, 1)',
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
            [keylist[9], valuelist[9]],
            [keylist[10], valuelist[10]],
            [keylist[11], valuelist[11]],
            [keylist[12], valuelist[12]],
            [keylist[13], valuelist[13]],
            [keylist[14], valuelist[14]],
            [keylist[15], valuelist[15]],
            [keylist[16], valuelist[16]],
            [keylist[17], valuelist[17]],
            [keylist[18], valuelist[18]],
            [keylist[19], valuelist[19]],
          ];

       // create a tag (word) cloud chart
        var chart = anychart.tagCloud(data);

//        chart.title('긍정 워드클라우드')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');

        // display the word cloud chart
        chart.container(chartName);
        chart.normal().fill("#609efa");
        chart.getCredits().setEnabled(false);
        chart.draw();
      });
}

var myChart8 = drawWord(['토너', '사용', '피부','스킨', '마녀', '공장','잘', '구매', '좋아요','너무','토너', '사용', '피부','스킨', '마녀', '공장','잘', '구매', '좋아요','너무'],
[100,90,80, 70, 60,50,40,30,20,10,100,90,80, 70, 60,50,40,30,20,10],'myChart8' );
var myChart9 = drawWord(['토너', '사용', '피부','스킨', '마녀', '공장','잘', '구매', '좋아요','너무','토너', '사용', '피부','스킨', '마녀', '공장','잘', '구매', '좋아요','너무'],
[100,90,80, 70, 60,50,40,30,20,10,100,90,80, 70, 60,50,40,30,20,10],'myChart9' );



