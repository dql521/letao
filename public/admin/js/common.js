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
