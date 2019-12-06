$(function(){
  // 表单校验
  $('form').bootstrapValidator({
    feedbackIcons:{
      valid:'glyphicon glyphicon-thumbs-up',
      invalid:'glyphicon glyphicon-thumbs-down',
      validating:'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:3,
            max:9,
            message:'用户名长度必须3-9位'
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须6-12位'
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })
  // 登录请求
  $('form').on("success.form.bv",function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('form').serialize(),
      dataType: "json",
      success: function (info) {
        if(info.success){
          location.href = 'index.html'
        }else if (info.error === 1000) {
          $('form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }else{
          $('form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })
  })

  // 重置功能
  $('[type="reset"]').click(function () { 
    $('form').data("bootstrapValidator").resetForm()
  })
})