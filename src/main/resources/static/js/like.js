/*
백업
function generateClones(id){
    let button = document.querySelector("#p"+id);
    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
    } else {
        button.classList.add("liked");
    }
}
*/

function like(p_id){
    $.ajax({
    url: "/product/like.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"p_id":p_id},
    success:
    function(data){
//        alert("like 성공");
        $("#likebtn").toggleClass('liked');
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
