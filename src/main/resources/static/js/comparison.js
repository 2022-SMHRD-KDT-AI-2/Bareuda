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
            console.log(ui);
            console.log(ui.item.label);
            console.log(ui.item.value);
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
    data: $('#form').serialize(),
    success:
    function(data){
        //alert("like 성공");
        // 사진 변경
        // 브랜드, 이름, 가격, 타입
        var product1 = JSON.parse(data.product1);
        var product2 = JSON.parse(data.product2);
        console.log(product1);
        console.log(product2);
//        // ------ 2단 ajax ------
//            $.ajax({
//            url: "플라스크 주소",
//            type: "POST",
//            cache: false,
//            dataType: "json",
//            data: {"p_id1": data.p_id1, "p_id2":data.p_id2},
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