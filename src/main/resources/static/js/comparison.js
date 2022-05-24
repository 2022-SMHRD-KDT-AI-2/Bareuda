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