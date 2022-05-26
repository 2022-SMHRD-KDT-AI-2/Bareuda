$(function() {    //화면 다 뜨면 시작
    $(".searchInput").autocomplete({
        source : function( request, response ) {
             $.ajax({
                    type: 'get',
                    url: "/product/search.do",
                    dataType: "json",
                    data : {search: request.term},
                    success: function(data) {
                    var products = JSON.parse(data.products);
                        response(
                            $.map(products, function(item) { //json[i] 번째 에 있는게 item 임.
                                return {
                                    label: item.p_name,// 자동 완성으로 보여주려는 값 (상품 이름)
                                    value: item.p_name,
                                    p_id : item.p_id
                                }
                            })
                        );
                    }
               });
            }, // source를 ajax로 받아온 거임. source 끝.
        select : function(event, ui) {
//            console.log(ui);
//            console.log(ui.item.label);
//            console.log(ui.item.value);
            console.log(ui.item.p_id);
            if($(this).attr('class').match("search1")){
                $("#search1").val(ui.item.p_id);
            }else{
                $("#search2").val(ui.item.p_id);
            }

        },
        focus : function(event, ui) {
            return false;
        },
        minLength: 1
    });
});

function comparison(){
    new Promise( (succ, fail)=>{

        $.ajax({
            url: "/product/comparison.do",
            type: "POST",
            cache: false,
            dataType: "json",
            data: {"search1":$('#search1').val(),"search2":$('#search2').val()},
            success:
            function(data){
                succ(data);
                alert("1단 ajax 성공-3");
                // 사진 변경
                // 브랜드, 이름, 가격, 타입
                var product1 = JSON.parse(data.product1);
                var product2 = JSON.parse(data.product2);
                $(".img1 img").attr("src", "/img/products/"+product1["p_img"]);
                $(".img2 img").attr("src", "/img/products/"+product2["p_img"]);
                var detail1 = JSON.parse(data.detail1);
                var detail2 = JSON.parse(data.detail2);
                // var myChart1 = drawRadar([detail1["type_o"],detail1["type_d"],detail1["type_n"],detail1["type_t"],detail1["type_c"]], 'myChart1');
                // var myChart2 = drawRadar([detail2["type_o"],detail2["type_d"],detail2["type_n"],detail2["type_t"],detail2["type_c"]], 'myChart2');
            },
            error:
            function (request, status, error){
            alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
            }
        });

    }).then((arg) =>{    // 두번째 ajax를 실행한다.
        $.ajax({
            url: "http://222.102.43.36:5023/comparison",
            type: "POST",
            cache: false,
            dataType: "json",
            data: {"p_id1":$('#search1').val(),"p_id2":$('#search2').val()},
            success:
                function(data){
                    alert("2단 ajax 성공");
                    var pos_rate1 = parseInt(data.pos_rate1);
                    var neg_rate1 = parseInt(data.neg_rate1);
                    var pos_words1 = data.pos_words1;
                    var neg_words1 = data.neg_words1;
                    var pos_weights1 = data.pos_weights1;
                    var neg_weights1 = data.neg_weights1;

                    var pos_rate2 = parseInt(data.pos_rate2);
                    var neg_rate2 = parseInt(data.neg_rate2);
                    var pos_words2 = data.pos_words2;
                    var neg_words2 = data.neg_words2;
                    var pos_weights2 = data.pos_weights2;
                    var neg_weights2 = data.neg_weights2;

                    console.log(pos_rate1);
                    console.log(neg_rate1);
                    console.log(pos_rate2);
                    console.log(neg_rate2);

                    //var myPie1 = drawPie([pos_rate1,neg_rate1], 'myPie1'); // 왼쪽 긍부정
                    //var myPie2 = drawPie([pos_rate2,neg_rate2], 'myPie2'); // 오른쪽 긍부정
                    //var cloud1 = drawWord(words1, weights1,'cloud1'); // 왼쪽 워드 클라우드
                    //var cloud2 = drawWord(words2, weights2,'cloud2'); // 오른쪽 워드 클라우드
                },
            error:
            function (request, status, error){
            alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
            }
        });
    });
}

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

/* word */
function drawWord(keylist,valuelist,chartName){
    anychart.onDocumentReady(function() {

        var data = [
            [keylist[0], valuelist[0]],
            [keylist[1], valuelist[1]],
            [keylist[2], valuelist[2]]
          ];

       // create a tag (word) cloud chart
        var chart = anychart.tagCloud(data);

        chart.title('전체 워드클라우드')
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




