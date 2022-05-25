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
    $.ajax({
    url: "/product/comparison.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"search1":$('#search1').val(),"search2":$('#search2').val()},
    success:
    function(data){
        alert("like 성공");
        // 사진 변경
        // 브랜드, 이름, 가격, 타입
        var product1 = JSON.parse(data.product1);
        var product2 = JSON.parse(data.product2);
        $(".img1 img").attr("src", "/img/products/"+product1["p_img"]);
        $(".img2 img").attr("src", "/img/products/"+product2["p_img"]);
//        // ------ 2단 ajax ------
//            $.ajax({
//            url: "http://222.102.43.36:5023/",
//            type: "POST",
//            cache: false,
//            dataType: "json",
//            data: {"search1":$('#search1').val(),"search2":$('#search2').val()},
//            success:
//                function(data){
//                    //alert("like 성공");
//                    // 긍정률, 부정률
//                    // 워드클라우드 (긍정+부정)
//                },
//                error:
//                function (request, status, error){
//                alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
//                }
//                });
//            // ------ /2단 ajax ------
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
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
//var myChart5 = drawPie([pos_rate,neg_rate], 'myChart5');
//var myChart6 = drawHorizontal(pos_words,pos_weights, 'myChart6');
//var myChart7 = drawHorizontal(neg_words,neg_weights, 'myChart7');
//var myChart8 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart8' );
//var myChart9 = drawWord(['Hello', 'world', 'normally'],[90, 70, 60],'myChart9' );
//


