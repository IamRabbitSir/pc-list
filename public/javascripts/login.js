var loginView={
    txt1:false,
    txt2:false,
    login : function() {
        //初始化页面时验证是否记住了密码
        user = $.cookie('userName');
        password = $.cookie('passWord');
        $('#formyCheckBox').html("");
        if(user!=null){
            $('#mima').hide();
            $('#pwd').show();
            $('.css_userName').val(user);
            $('#pwd').val(password);
            $('#formyCheckBox').html("√");
        }
        $('.btn').click(function(){
            var userName = $('.css_userName').val();
            var password = $('#pwd').val();
            var iscookie=1;
            if($("#formyCheckBox").html()==null|| $.trim($("#formyCheckBox").html())==""){
                iscookie=0;
            }
            if( $.trim(userName)==""|| $.trim(password)==""||userName==null|| password==null){
                $('.eorr').html('<span style="width:20px;height:18px;" class="tipserror">&nbsp;&nbsp;</span><span style="font-size: 16px">用户名和密码都不能为空!</span>');
                return;
            }else{
                $.post('/users/login',{us_account:userName,us_psw:password,iscookie:iscookie},function(data){
                    var login = data;
                    if(login.code == 1){
                        if(iscookie==1){
                            //判断是否选择记住密码，并存到cookie中
                            $.cookie("us_info", "true", { expires: 7 });
                            $.cookie("userName", userName , { expires: 7 });
                            $.cookie("passWord", password , { expires: 7 });
                        }else{
                            $.cookie("us_info", "false", { expires: -1 });
                            $.cookie("userName", '', { expires: -1 });
                            $.cookie("passWord", '', { expires: -1 });
                        };
                        swal({
                            title:"登录成功！",
                            text:"欢迎["+login.us_name+"]使用会议室预订系统",
                        },function (inputValue) {
                            location.href = basePath+"/meet/gqsMeet";
                        });
                    }else{
                        $('.eorr').html('<span class="tipserror"  style="width:20px;height:18px;">&nbsp;&nbsp;</span><span style="font-size: 16px">'+  login.msg+'</span>');
                    }
                });
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
        $('.css_userName').focus(function(){
            $(".css_userName").addClass("x-cmminilogin-userNamefocus");
            if($('.css_userName').val()=="用户名"){
                $('.css_userName').val('');
            }
        });
        $('.css_userName').blur(function(){
            $(".css_userName").removeClass("x-cmminilogin-userNamefocus");
            if($('.css_userName').val()==null|| $.trim($('.css_userName').val())==""){
                $('.css_userName').val("用户名");
            }
        });

        $('#mima').focus(function(){
            if($('#mima').val()=="密码"){
                $('#pwd').show();
                $('#mima').hide();
                //$('.btn').focus();
                $('#pwd').focus();
                $('#pwd').css('margin-top','20px');
            }
            if($('.css_userName').val()==null|| $.trim($('.css_userName').val())==""){
                $('.css_userName').val('用户名');
            }
        });
        $('#pwd').focus(function(){
            $(".css_password2").addClass("x-cmminilogin-password2focus");
        });
        $('#pwd').blur(function(){
            $(".css_password2").removeClass("x-cmminilogin-password2focus");
            if($('#pwd').val()==null|| $.trim($('#pwd').val())==""){
                $('#pwd').hide();
                $('#mima').show();
            }
        });

    }
};
$(document).ready(function() {
    loginView.login();
    loginView.keyDown();
    loginView.clearText();
});