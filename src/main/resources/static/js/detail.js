$(function() {
    $.ajax({
    url: "플라스크 주소",
    type: "GET",
    cache: false,
    dataType: "json",
    data: {"p_id":p_id},
    success:
    function(data){
        var pos_rate = data.pos_rate;
        var neg_rate = data.neg_rate;
        var pos_words = data.pos_words;
        var neg_words = data.neg_words;
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
});