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

function checkForm(){
    if($('#mem_id').val() == ""){
        alert("아이디를 입력하세요");
        $('#mem_id').focus();
        return false;
    }else if($('#mem_pw').val() == ""){
        alert("비밀번호를 입력하세요");
        $('#mem_pw').focus();
        return false;
    }else if($('#mem_name').val() == ""){
        alert("이름을 입력하세요");
        $('#mem_name').focus();
        return false;
    }
     else if($('#mem_eamil').val() == ""){
        alert("이메일을 입력하세요");
        $('#mem_eamil').focus();
        return false;
    }else{
        return true;
    }
}