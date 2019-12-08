$(function () {
    // 一级分类加载功能
    var page = 1
    var pageSize = 5
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
                $('tbody').html(template('tpl',info))
                $('#page').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: page,
                    // 总页数
                    totalPages: Math.ceil(info.total/info.size),
                    // 当按钮被点击的时候触发
                    onPageClicked: function ( ) {
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
    $('.addBtn').on('click',function () {
        $('.addModal').modal('show')
    })

    // 表单校验
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            // 校验分类名字FF
            categoryName: {
              validators: {
                notEmpty: {
                  message: '分类名称不能为空'
                }
              }
            }
          }
    })

    // 校验成功事件
    $('form').on('success.form.bv',function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:{categoryName:$('[name=categoryName]').val()},
            success:function (info) {
                if (info.success) {
                 $('.addModal').modal('hide')
                $('form').data('bootstrapValidator').resetForm(true)
                page = 1
                render()
                }
            }
        })
    })
})