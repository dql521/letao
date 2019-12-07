$(function () {
  // ajax开始事件， 只要有ajax发送，就会触发
$(document).ajaxStart(function() {
  NProgress.start()
})

// ajax开始事件， 只要有ajax发送，就会触发
// $(document).ajaxSuccess(function() {
//   console.log('成功了呀')
// })
$(document).ajaxError(function() {
  alert('服务器繁忙')
})
// ajax开始事件， 只要有ajax发送，就会触发
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  }, 500)
})

// 隐藏侧边栏事件
$('.icon_menu').click(function () {
  console.log('哈哈');
  
  $('.aside, .topBar, .content-kind').toggleClass('change')
})

// 退出功能
$('.icon_logout').click(function () {
  $('.logoutModal').modal('show')
})
$('.btn-sure').click(function () {
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function (info) {
      if (info.success) {
        location.href = 'login.html'
      }
    }
  })
})

// 二级菜单功能
$('.clasify').click(function () {
  $('.second').slideToggle()
})
})
