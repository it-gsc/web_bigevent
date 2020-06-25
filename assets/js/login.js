$(function() {
    // 登录注册跳转功能
    $('.loginAndRegBox a').eq(0).on('click', function() {
        $(this).parent().hide().next().show();
        // $('.login-box').hide();
        // $('.reg-box').show();
    });
    $('.loginAndRegBox a').eq(1).on('click', function() {
        $(this).parent().hide().prev().show();
        // $('.login-box').show();
        // $('.reg-box').hide();
    });
    // 表单验证
    var form = layui.form;
    // 提示框
    var layer = layui.layer;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            yz: function(res) {
                if (res != $('.pwd-1').val()) {
                    return '两次密码输入不一致';
                }
            }
        })
        // 注册事件
    $('#reg-form').on('submit', function(e) {
        e.preventDefault();
        var regData = { username: $('#reg-username').val(), password: $('.pwd-1').val() };
        $.post('/api/reguser', regData, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);;
            }
            layer.msg('注册成功请登录');
            localStorage.setItem('regData', regData.username);
            $('#reg-qh').click();
            $('#login-form [name=username]').val(regData);
        })
    });
    // 登录事件
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        // 获取当前输入的登录框内容
        var loginData = {};
        loginData.username = $(this).find("input[name = username]").val();
        loginData.password = $(this).find("input[name = password]").val();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: loginData,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                // 存储登录成功得到的token
                localStorage.token = res.token;
                // 跳转到首页
                location.href = './index.html';
            }
        });
    })
})