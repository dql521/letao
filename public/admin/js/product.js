$(function () {
  // 上传图片地址
  var picArr = []
  // 加载二级分类内容
  var page = 1
  var pageSize = 5
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
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
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })

  // 下拉框选择
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text()
    var id = $(this).data('id')
    $('#dropdownText').text(txt)
    $('[name="brandId"]').val(id)
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  // 上传产品图
  $('#fileupload').fileupload({
    done: function (e, data) {
      var picAddr = data.result.picAddr
      $('.imgBox').append($('<img src="' + picAddr + '" width="100">'))
      picArr.push(data.result)
      if (picArr.length >= 3) {
        $('[name="picArr"]').val(JSON.stringify(picArr))
        $('form').data('bootstrapValidator').updateStatus('picArr', 'VALID')
      }
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
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 校验分类名字
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入正确的库存'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的商品尺码，例如：32-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品现价不能为空'
          }
        }
      },
      picArr: {
        validators: {
          notEmpty: {
            message: '请上传至少3张图片'
          }
        }
      }
    }
  })

  // 表单校验成功事件
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: $('form').serialize(),
      success: function(info) {
        if (info.success) {
          $('.addModal').modal('hide')
          $('form').data('bootstrapValidator').resetForm(true)
          page = 1
          render()
          $('#dropdownText').text('请选择二级分类')
          $('.imgBox img').remove()
          arr = []
        }
      }
    })
  })
})