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

function generateClones(id){
    $.ajax({
    url: "/product/like.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"p_id":id},
    success:
    function(data){
        //alert("like 성공");
        $("#p"+data.p_id).toggleClass('liked');
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
}
