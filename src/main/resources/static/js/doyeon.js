//let product_num = 12; // 제품번호
function myajax(product_num){
$.ajax({
      type : 'post',
      url : 'http://211.227.114.104:5023/test', // 플라스크 주소
      data : product_num,
      dataType : 'json',
      success : function(res) {
        $("#result").text(res);
      },
      error:
      function (request, status, error){
      alert("ajax실패. code:"+request.status+"\n"+"message:"+request.reponseText+"\n"+"error:"+error);
      }
    })
}
