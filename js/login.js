$(function () {

})




//登录
function login() {
    if($("#form").valid()){
        $.ajax({
            url:url,
            dataType: "jsonp",
            callback:"callback",
            jsonpCallback: "callback",
            data:{
                method:"login",
                username:$("#username").val(),
                password:$("#password").val(),
            },
            success:function (data) {
                console.log(data);
                if(data.error_code==0){
                   window.location.href="index.html?name="+encodeURI(data.name);
                }
                else {
                    swal(
                        "用户名或密码错误",
                        "",
                        "error"
                    )
                }
            }
        })
    }

}