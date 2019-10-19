var registerView={
    register : function() {
        $('.btn').click(function(){
            var us_account = $('#us_account').val();
            var us_pwd = $('#us_pwd1').val();
            var us_pwd2 = $('#us_pwd3').val();
            var us_name = $('#us_name').val();
            var us_sex = $("input[name='us_name']:checked").val();
            var us_phone = $('#us_phone').val();
            var us_email = $('#us_email').val();
            var team_id = $('#department').val();
            var us_position = $('#us_position').val();
            var err1 = $('#err1').val();
            var err2 = $('#err2').val();
            var err3 = $('#err3').val();
            var err4 = $('#err4').val();
            var err5 = $('#err5').val();
            if($.trim(us_account)==""||us_account=="用户名"){
                $('#err1').val("×");$('#err1_info').val("请填写用户名");
            };
            if ($.trim(us_pwd)==""||us_pwd=="密码" ) {
                $('#err2').val("×");$('#err2_info').val("请填写密码");
            };
            if ($.trim(us_pwd2)==""||us_pwd2=="确认密码" ) {
                $('#err3').val("×");$('#err3_info').val("请填写确认密码");
            };
            if ($.trim(us_name)==""||us_name=="姓名" ) {
                $('#err4').val("×");$('#err4_info').val("请填写姓名");
            };
            if ($.trim(us_position)==""||us_position=="职位" ) {
                $('#err5').val("×");$('#err5_info').val("请填写职位");
            };
            if(us_phone=="联系电话"){
                us_phone = null;
            };
            if(us_email=="电子邮箱"){
                us_email = null;
            };
            if($.trim(us_account)==""|| $.trim(us_pwd)=="" || $.trim(us_pwd2)==""||$.trim(us_name)==""||$.trim(team_id)==""||$.trim(us_position)==""||us_account=="用户名" ||us_pwd=="密码"||us_pwd2=="确认密码" ||us_name=="姓名" ||us_position=="职位" || err1!="√" || err2!="√" || err3!="√" || err4!="√" ||err5!="√"){
               $('.eorr').html('<span style="width:20px;height:18px;" class="tipserror">&nbsp;&nbsp;</span><span style="font-size: 16px">您填写的信息有错误，请确认!</span>');
                    return;
            }else{
                $.post(basePath+'/users/register',{us_account:us_account,us_psw:us_pwd,us_name:us_name,us_sex:us_sex,us_phone:us_phone,us_email:us_email,team_id:team_id,us_position:us_position},function(data){
                    if(data.code == 200){
                        swal({
                            title:"注册成功！",
                            text:"页面将跳转到登录界面",
                        },function (inputValue) {
                            if(inputValue == true){
                                location.href = basePath+"/login";
                            };
                        });
                    }else{
                        swal({
                            title:"注册失败！",
                            text:"恭喜你，中奖了！发生一次异常情况，赶紧联系信息部。",
                        },function (inputValue) {
                            if(inputValue == true){
                                location.href = basePath+"/register";
                            };
                        });
                    }
                },'json');
            }
        });
    },
    keyDown:function(){
        $('body').bind('keydown',function(event){
            if(event.keyCode==13){
                $('.btn').trigger('click');
            }
        });
    },
    clearText:function(){
        $('#us_account').focus(function(){
            $("#us_account").addClass("account2focus");
            if($('#us_account').val()=="用户名"){
                $('#us_account').val('');
            }
        });
        $('#us_account').blur(function(){
            $("#us_account").removeClass("account2focus");
            if($('#us_account').val()==null|| $.trim($('#us_account').val())==""){
                $('#us_account').val("用户名");
                $('#err1').val('×');
                $('#err1_info').val('请填写用户名');
            }else{
                $.ajax({
                    type:"get",
                    url:"/users/have",
                    data:{"us_account":$('#us_account').val()},
                    //async:false;
                    dataType:"json",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success:function (data) {
                        if(data.code=="YES"){
                            $('#err1').val('√');
                            $('#err1_info').val('该用户名可用');
                        }else{
                            $('#err1').val('×');
                            $('#err1_info').val('该用户名已被注册');
                        }
                    },
                    // error:function (data) {
                    //     console.log("异常！");
                    // },
                });
            }
        });
        $('#us_pwd').focus(function(){
            if($('#us_pwd').val()=="密码"){
                $('#us_pwd').hide();
                $('#us_pwd1').show();
                //$('.btn').focus();
                $('#us_pwd1').focus();
            }
        });
        $('#us_pwd1').focus(function(){
            $("#us_pwd1").addClass("pwd2focus");
            if($('.pwd1').val()=="密码"){
                $('.pwd1').val('');
            }
        });
        $('#us_pwd1').blur(function(){
            $("#us_pwd1").removeClass("pwd2focus");
            if($('#us_pwd1').val()==null|| $.trim($('#us_pwd1').val())==""){
                $('#us_pwd1').hide();
                $('#us_pwd').show();
                $('#us_pwd').val("密码");
                $('#err2').val("×");
                $('#err2_info').val("请填写密码");
            }else{
                if($('#us_pwd').val() != $('#us_pwd2').val()){
                    $('#err2').val("×");
                    $('#err2_info').val("两次密码不一致");
                }else{
                    $('#err2').val("√");
                    $('#err3').val("√");
                    $('#err2_info').val("");
                    $('#err3_info').val("");
                }
            }
        });
        $('#us_pwd2').focus(function(){
            if($('#us_pwd2').val()=="确认密码"){
                $('#us_pwd2').hide();
                $('#us_pwd3').show();
                //$('.btn').focus();
                $('#us_pwd3').focus();
            }
        });
        $('#us_pwd3').focus(function(){
            $("#us_pwd3").addClass("pwd2focus");
            if($('.pwd2').val()=="确认密码"){
                $('.pwd2').val('');
            }
        });
        $('#us_pwd3').blur(function(){
            $("#us_pwd3").removeClass("pwd2focus");
            if($('#us_pwd3').val()==null|| $.trim($('#us_pwd3').val())==""){
                $('#us_pwd3').hide();
                $('#us_pwd2').show();
                $('#us_pwd2').val("确认密码");
                $('#err3').val("×");
                $('#err3_info').val("请填写确认密码");
            }else{
                if($('#us_pwd').val() != $('#us_pwd2').val()){
                    $('#err3').val("×");
                    $('#err3_info').val("两次密码不一致");
                }else{
                    $('#err2').val("√");
                    $('#err3').val("√");
                    $('#err2_info').val("");
                    $('#err3_info').val("");
                }
            }
        });
        $('#us_name').focus(function(){
            $("#us_name").addClass("name2focus");
            if($('#us_name').val()=="姓名"){
                $('#us_name').val('');
            }
        });
        $('#us_name').blur(function() {
            $("#us_name").removeClass("name2focus");
            if ($('#us_name').val() == null || $.trim($('#us_name').val()) == "") {
                $('#us_name').val("姓名");
                $('#err4').val("×");
                $('#err4_info').val("请填写姓名");
            }else{
                $('#err4').val("√");
                $('#err4_info').val("");
            }
        });
        $('#us_phone').focus(function(){
            $("#us_phone").addClass("phone2focus");
            if($('#us_phone').val()=="联系电话"){
                $('#us_phone').val('');
            }
        });
        $('#us_phone').blur(function() {
            $("#us_phone").removeClass("phone2focus");
            if ($('#us_phone').val() == null || $.trim($('#us_phone').val()) == "") {
                $('#us_phone').val("联系电话");
            }
        });
        $('#us_email').focus(function(){
            $("#us_email").addClass("email2focus");
            if($('#us_email').val()=="电子邮箱"){
                $('#us_email').val('');
            }
        });
        $('#us_email').blur(function() {
            $("#us_email").removeClass("email2focus");
            if ($('#us_email').val() == null || $.trim($('#us_email').val()) == "") {
                $('#us_email').val("电子邮箱");
            }
        });
        $('#us_position').focus(function(){
            $("#us_position").addClass("position2focus");
            if($('#us_position').val()=="职位"){
                $('#us_position').val('');
            }
        });
        $('#us_position').blur(function() {
            $("#us_position").removeClass("position2focus");
            if ($('#us_position').val() == null || $.trim($('#us_position').val()) == "") {
                $('#us_position').val("职位");
                $('#err5').val("×");
                $('#err5_info').val("请填写职位");
            }else{
                $('#err5').val("√");
                $('#err5_info').val("");
            }
        });
    }
};
$(document).ready(function() {
    registerView.register();
    registerView.keyDown();
    registerView.clearText();
});