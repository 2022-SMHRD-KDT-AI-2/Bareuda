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

var myChart2 = drawDoughnut(['건성에 좋아요','복합성에 좋아요','지성에 좋아요'],[20,30,50], 'myChart2');
var myChart3 = drawDoughnut(['보습에 좋아요','진정에 좋아요','주름/미백에 좋아요'],[50,20,30], 'myChart3');
var myChart4 = drawDoughnut(['자극없이 순해요','보통이에요','자극이 느껴져요'],[30,20,50], 'myChart4');


