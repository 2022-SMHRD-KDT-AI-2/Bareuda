$('#mem_id').focusout(function() {
    $.ajax({
        url :'/member/idCheck.do',
        type : 'POST',
        data : {'mb_id':$('#mem_id').val()},
        dataType : 'json',
        success : function(res) {
            if(res['idCheck'] == 1){
                $("#result").text('사용할 수 없는 아이디입니다.');
                $("#result").css('color', 'red');
                $("#btnJoin").attr("disabled","disabled");
            }else{
                $("#result").text('사용할 수 있는 아이디입니다.');
                $("#result").css('color', 'green');
                $("#btnJoin").removeAttr("disabled");
            }
        },
        error:
        function (request, status, error){
        alert("ajax실패. code:"+request.status+"\n"
            +"message:"+request.reponseText+"\n"
            +"error:"+error);
        }
    })
})