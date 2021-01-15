$(function() {
    // 注册事件 当点击去注册账号 登录盒子隐藏  注册盒子显示
    $("#link_reg").on("click", function() {
        $('.loginBox').hide()
        $('.regBox').show()
    });
    // 注册事件 当点击去登录 登录盒子显示  注册盒子隐藏
    $("#link_login").on("click", function() {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    // 自定义表单验证规则
    var form = layui.form; // 从layui中获取form对象
    form.verify({ // 通过form.verify()函数自定义校验规则
        // 自定义了一个pwd的密码校验规则
        pwd: [
            /^[\S]{6,16}$/, '密码必须是6-16位,且不能输入空格'
        ],
        repwd: function(value) { // 通过形参拿到确认密码框中的内容
            // 获得到密码框中的内容
            var pwd = $(".regBox input[name=password").val().trim();
            // 进行比较判断
            if (value !== pwd) {
                // 如果不一致 返回提示消息 输入不一致
                return "两次密码输入不一致"
            }
        }
    });

    // 注册功能
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        e.preventDefault(); // 阻止表单提交
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".regBox [name=username]").val(),
                password: $(".regBox [name=password]").val(),
            },
            success: function(res) {
                // 返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后处理
                layer.mas('注册成功');
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置form表单
                $("#form_reg")[0].reset();
            }
        })
    });
    // 登录功能
    $("#form_login").submit(function(e) {
        // 阻止默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.mag(res.message)
                }
                // 提示信息,保存token 跳转页面
                layer.msg('恭喜您,登录成功');
                // 保存token  未来的接口需要使用token
                location.href = "/index.html";
                // 跳转页面
                localStorage.setItem("token", res.token)

            }
        })
    })
})