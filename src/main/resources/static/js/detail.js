function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var p_id = getParameterByName('p_id');
console.log(p_id);
$(function() {
    $.ajax({
    url: "http://211.227.114.104:5023/",
    type: "POST",
    cache: false,
    dataType: "json",
    data: {"p_id":p_id},
    success:
    function(data){
        var pos_rate = data.pos_rate;
        var neg_rate = data.neg_rate;
        var pos_words = data.pos_words;
        var neg_words = data.neg_words;
        console.log(pos_rate);
        console.log(neg_rate);
        console.log(pos_words);
        console.log(neg_words);
    },
    error:
    function (request, status, error){
    alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
    }
    });
});