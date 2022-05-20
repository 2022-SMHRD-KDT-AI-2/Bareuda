function categorySort(category){
    $.ajax({
    url: "/product/test.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"category":category},
    success:
    function(data){ //ajax통신 성공시 넘어오는 데이터 통째 이름 =data
        alert("like:"+data.like)
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
}
