$(function () {
    //调用getUserInfo获取用户信息
    getUserInfo()

    let layer = layui.layer
    $('#btnLogout').on('click',function() {
        //提示用户是否确认退出
        layer.confirm('确认退出？', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log('ok');
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = './login.html'
            //关闭confirm询问框
            layer.close(index);
          });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        //无论成功还是失败都会调用 complete 这个回调函数
        complete:function(res) {
            // console.log(res);
            //在回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
            // if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！') {
            //     //1.强制清空token
            //     localStorage.removeItem('token')
            //     //2.强制跳转到登录页
            //     location.href = './login.html'
            // }
            
        }
    })

}

//渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    let name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    //3.按需加载头像
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        //自己：toUpperCase转换为大写
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}