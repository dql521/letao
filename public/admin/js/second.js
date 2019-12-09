$(function () {
    // 加载二级分类内容
    var page = 1
    var pageSize = 5
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (info) {
              console.log(info);
              
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
})