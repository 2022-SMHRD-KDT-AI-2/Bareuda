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
