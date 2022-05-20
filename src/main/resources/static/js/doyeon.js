function like(post){
    $.ajax({
    url: "/product/test.do",
    type: "POST",
    cache: false,
    dataType: "json",
    data: $('#like_form12').serialize(), //아이디가 like_form인 곳의 모든 정보를 가져와 파라미터 전송 형태(표준 쿼리형태)로 만들어줌
    success:
    function(data){ //ajax통신 성공시 넘어오는 데이터 통째 이름 =data
    alert("post_seq:"+data.post_seq+"// like:"+data.like)
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
}