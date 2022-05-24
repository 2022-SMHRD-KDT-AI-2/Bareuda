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



var myChart = drawRadar([10,15,30,40,5], 'myChart');
