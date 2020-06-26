$(function() {
    // 获取用户信息函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return;
                }
                renderAvatar(res.data);
            }
        })
    }
    getUserInfo();
    // 渲染用户头像函数

    function renderAvatar(user) {
        // 获取并添加名称
        var name = user.nickname || user.username;
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
            $('.layui-nav-img').hide();
        }
    }
    // 实现退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            // 跳转到登录页
            location.href = './login.html';
            // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})