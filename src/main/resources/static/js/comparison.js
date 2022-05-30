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
            //console.log(ui.item.p_id);
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
    if($('#search2').val() == ""){
        alert("상품을 선택하세요.");
        return false;
    }else if($('#search1').val() == ""){
        alert("상품을 선택하세요.");
        return false;
    }else{
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
                //alert("1단 ajax 성공-3");
                // 사진 변경
                // 브랜드, 이름, 가격, 타입
                var product1 = JSON.parse(data.product1);
                var product2 = JSON.parse(data.product2);
                $(".img1 img").attr("src", "/img/products/"+product1["p_img"]);
                $(".img2 img").attr("src", "/img/products/"+product2["p_img"]);
                $(".p_name1").text(product1["p_name"]);
                $(".p_name2").text(product2["p_name"]);
                $(".p_brand1").text(product1["p_brand"]);
                $(".p_brand2").text(product2["p_brand"]);
                $(".p_price1").text(product1["p_price"]+"원");
                $(".p_price2").text(product2["p_price"]+"원");
                $(".productsType1").text(product1["p_result"]);
                $(".productsType2").text(product2["p_result"]);
                var detail1 = JSON.parse(data.detail1);
                var detail2 = JSON.parse(data.detail2);
                var myChart = drawRadar([detail1["type_o"],detail1["type_d"],detail1["type_n"],detail1["type_t"],detail1["type_c"]], 'myChart');
                var myChart1 = drawRadar([detail2["type_o"],detail2["type_d"],detail2["type_n"],detail2["type_t"],detail2["type_c"]], 'myChart1');
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
                    //alert("2단 ajax 성공");
                    var pos_rate1 = parseInt(data.pos_rate1);
                    var neg_rate1 = parseInt(data.neg_rate1);
                    var words1 = data.words1;
                    var weights1 = data.weights1;
                    var words2 = data.words2;
                    var weights2 = data.weights2;

                    var pos_rate2 = parseInt(data.pos_rate2);
                    var neg_rate2 = parseInt(data.neg_rate2);

//                    console.log(pos_rate1);
//                    console.log(neg_rate1);
//                    console.log(pos_rate2);
//                    console.log(neg_rate2);

                    var myPie = drawPie([pos_rate1,neg_rate1], 'myPie'); // 왼쪽 긍부정
                    var myPie1 = drawPie([pos_rate2,neg_rate2], 'myPie1'); // 오른쪽 긍부정
                    var container = drawWord(words1, weights1,'container'); // 왼쪽 워드 클라우드
                    var container2 = drawWord(words2, weights2,'container2'); // 오른쪽 워드 클라우드
                },
            error:
            function (request, status, error){
            alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
            }
        });
    }); }

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

        chart.title()
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');

        // display the word cloud chart
        chart.container(chartName);
         chart.normal().fill("#609efa");
        chart.draw();
      });
}


