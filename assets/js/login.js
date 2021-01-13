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
})