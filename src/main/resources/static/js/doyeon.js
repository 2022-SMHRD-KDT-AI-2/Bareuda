function categorySort(category){
    $.ajax({
    url: "/product/category.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"category":category},
    success:
    function(data){
        alert("products:"+data.products)
        var products = JSON.parse(data.products);

        //$('.item').remove();
        alert("products:"+products.length)
        $('.item').hide();
        $('.'+data.category).show();
//        if(data.category == ''){
//            $('.item').hide();
//            $('.'+data.category).show();
//        }else{
//            $('.item').show();
//        }
//        alert("products:"+products.length)
//        for (var i = 0; i <products.length; i++) {
//            $('.container2').append('<div class="item">');
//            $('.container2').append('<a href="#" class="prd_img">');
//            $('.container2').append('<img src="/img/products/'+products[i].p_img+'">');
//            $('.container2').append('</a>');
//            $('.container2').append('<div class="prd_content">');
//            $('.container2').append('<div class="prd">');
//            $('.container2').append('<a>');
//            $('.container2').append('<div class="c_brand"><p><span class="tx_barnd">'+products[i].p_brand+'</span></p></div>');
//            $('.container2').append('<div class="c_name"><p><span class="tx_name">'+products[i].p_name+'</span></p></div>');
//            $('.container2').append('<div class="c_type"><p><span class="type_result">'+products[i].p_result+'</span></p></div>');
//            $('.container2').append('</a>');
//            $('.container2').append('</div>');
//            $('.container2').append('</div>');
//            $('.container2').append('</div>');
//        };

    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
}

function categorySort2(category){
    if(category != '전체'){
        $('.item').hide();
        $('.'+category).show();
    }else{
        $('.item').show();
    }
}


  $(function() {    //화면 다 뜨면 시작
    $("#searchInput").autocomplete({
        source : function( request, response ) {
             $.ajax({
                    type: 'get',
                    url: "/product/search.do",
                    dataType: "json",
                    success: function(data) {
                        response(
                            $.map(data, function(item) {    //json[i] 번째 에 있는게 item 임.
                                return {
                                    label: item,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    //value: item.p_name,    //선택 시 input창에 표시되는 값
                                    //p_id: item.p_id
                                }
                            })
                        );
                    }
               });
            },
        select : function(event, ui) {    //아이템 선택시
            console.log("전체 data: " + JSON.stringify(ui));//
            console.log("검색 데이터 : " + ui.item.value);

        },
        focus : function(event, ui) {    //포커스 가면
            return false;//한글 에러 잡기용도로 사용됨
        },
        minLength: 1,// 최소 글자수
        autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
        delay: 500,    //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
//            disabled: true, //자동완성 기능 끄기
        close : function(event){    //자동완성창 닫아질때 호출
            console.log(event);
        }
    });

});
