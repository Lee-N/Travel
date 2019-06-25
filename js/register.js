$(function () {

    $("#form").validate({
        rules:{
            confirm:{
                equalTo:"#password"
            }
        }
    })
})

function register() {
    if($("#form").valid()){
            $.ajax({
                url:url,
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"callback",
                data:{
                    method:"register",
                    name:$("#name").val(),
                    username:$("#username").val(),
                    password:$("#password").val(),
                },
                success:function (data) {
                    if(data.error_code==0){
                        swal({
                                title:"注册成功",
                                type:"success"
                        },function (isConfirm) {
                            if(isConfirm) {
                                window.location.href = "login.html";
                            }
                        })

                    }
                    else{
                        swal(
                            "用户名已存在",
                            "",
                            "error"
                        )
                    }
                },
                error:function () {
                    swal(
                        "系统错误",
                        "",
                        "error"
                    )
                }
            })
        }
}

