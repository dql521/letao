$(function () {
  // 上传图片地址
  var picArr = []
  // 加载二级分类内容
  var page = 1
  var pageSize = 5
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {

        $('tbody').html(template('tpl', info))
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当按钮被点击的时候触发
          onPageClicked: function () {
            page = arguments[3]
            // 重新渲染
            render()
          }
        });
      }
    });
  }
  render()

  // 添加功能
  $('.addBtn').on('click', function () {
    $('.addModal').modal('show')
    // 加载下拉框列表
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {

        console.log(info);

        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })
  // 下拉框选择
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text()
    var id = $(this).data('id')
    $('#dropdownText').text(txt)
    $('[name="categoryId"]').val(id)
    $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })
  // 上传Logo
  $('#fileupload').fileupload({
    dataType: 'json',
    //上传完成回调函数。还有其他的回调函数，见文档
    done: function (e, data) {
      console.log(data);
      var picAddr = data.result.picAddr
      $('.imgBox img').attr('src', picAddr)
      $('[name="brandLogo"]').val(picAddr)
      $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  // 表单校验
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 校验一级菜单
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 校验表单
      brandName: {
        validators: {
          notEmpty: {
            message: '分类名称不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌Logo'
          }
        }
      }
    }
  })

  // 确认添加功能（校验成功事件）
  $('form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
      success: function (info) {
        $('.addModal').modal('hide')
        $('form').data('bootstrapValidator').resetForm(true)
        page = 1
        render()
        $('#dropdownText').text('请选择一级分类')
        $('.imgBox img').attr('src', 'images/none.png')
      }
    })
  })
})