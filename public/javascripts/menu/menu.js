$(document).ready(function () {

    $.post('/menu/menuOne', {}, function (data) {
        $.post('/menu/menuTwo', {}, function (data2) {
            //添加的时候先清除div中的数据
            $("#dlmenu").empty();
            //遍历向div中添加查询到的菜单
            for (var n = 0; n < data.length; n++) {
                var menuid = data[n].menu_id//子菜单div的动态id
                $("#dlmenu").append(
                    "<dl><dt><i class='Hui-iconfont'>&#xe616; </i>" + data[n].menu_name + "<i class='Hui-iconfont menu_dropdown-arrow'>&#xe6d5;</i></dt>" + "<dd><ul id=" + menuid + "></ul></dd>"
                )

                for (var i = 0; i < data2.length; i++) {
                    if (data[n].menu_id == data2[i].menu_parent_id) {
                        $("#" + menuid + "").append(
                            "<li><a data-href=\'" + data2[i].menu_path + "\' data-title=\'" + data2[i].menu_name + "\' href='javascript:void(0)'>"+ data2[i].menu_name +"</a></li>"
                        )
                    }
                }
                $("#dlmenu").append("</dl>");
            }
        });
    });



});