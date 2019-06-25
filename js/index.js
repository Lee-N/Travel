$(function () {

    //设置用户姓名
    let name=decodeURI(getQueryVariable("name"));
    $("#name").append(" "+name);

    //设置天气
   $("#weather").weather({tips:true});

   //加载历史记录
    getRecord();

   //绑定历史记录开关
   $(".toggle").click(function () {
       $("#history").toggleClass("toggled");
       if($("#history").hasClass("toggled")){
           $(".toggle").text("收起←")
       }
       else{
           $(".toggle").text("历史→")
       }
   })

})



//获取url参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

//获取天气
function getWeather() {
    $.ajax({
        url:"https://www.tianqiapi.com/api",
        dataType:"jsonp",
        success:function (data) {
            console.log(data)
        }
    })
}

//添加表单项目
function addItem() {
    let html=`<div class="form-group">
                    <label class="control-label col-sm-2">名称</label>
                    <div class="col-sm-4">
                        <input name="name" class="form-control" required/>
                    </div>
                    <label class="control-label col-sm-2">金额</label>
                    <div class="col-sm-3">
                        <input name="money" class="form-control"  required/>
                    </div>
                      <label class="control-label col-sm-1">元</label>
               </div>
    `
    $("#form").append(html);
}


//获取历史记录
function getRecord() {
    $.ajax({
        url:url,
        dataType: "jsonp",
        callback:"callback",
        data:{
            method:"getRecord"
        },
        success:function (data) {

            var data=data.data;
            console.log(data)
            let html=``;
            for(let i=0;i<data.length;i++){
                html+=`<div>`
                let list=data[i].record.split("#")
                let length=list.length;
                for(let j=0;j<length-1;j++){
                    html+=`<div class="row">`;
                    html+=`<span class="col-sm-6">${list[j++]}</span>`;
                    if(j<length-1)html+=`<span class="col-sm-6">${list[j]}</span>`;
                    html+=`</div>`
                }
                html+=`<p><strong>${list[length-1]}</strong></p>`;
                html+=`</div>
                <hr>`
            }
            $("#history").append(html);
        }
    })
}

function save() {
    if($("#form").valid()){
        let record="";
        let count=0;
        let name=new Array();
        let money=new Array();
        $("input[name='name']").each(function () {
            name.push($(this).val())
        });
        $("input[name='money']").each(function () {
            money.push($(this).val())
        });
        console.log(name);
        console.log(money)
        for(let i=0;i<name.length;i++) {
            record+=name[i]+":"+money[i]+"元#";
            count+=parseFloat(money[i]);
        }
        record+="共计:"+count+"元";
       console.log(record);
       console.log(count)
        $.ajax({
            url:url,
            dataType:"jsonp",
            callback:"callback",
            data:{
                method:"saveRecord",
                record:record
            },
            success:function (data) {
                if(data.error_code==0){
                    swal(
                        "保存成功",
                        "",
                        "success"
                    )
                }
                else{
                    swal(
                        "保存失败",
                        "",
                        "error"
                    )
                }
            },
            error:function () {
                swal(
                    "保存失败",
                    "",
                    "error"
                )
            }
        })
    }

}