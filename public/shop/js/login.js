$(function () {
   $('.btn-login').on('click',function () {
       
    var userName = $('[name="username"]').val().trim()
    var passWord = $('[name="password"]').val().trim()
    if(!userName){
        mui.toast('用户名不能为空')
        return
    }
    if (!passWord) {
        mui.toast('密码不能为空')
        return
    }
    $.ajax({
        type:'post',
        url:'/user/login',
        data:$('form').serialize(),
        success: function (info) {
            if (info.success) {
                if (location.search.indexOf('?form') !== -1) {
                    location.href = location.search.replace('?form=','')
                }else{
                    location.href = 'index.html'
                }
            }else{
                mui.toast('用户名或密码错误')
            }
        }
    })
   })
   
})