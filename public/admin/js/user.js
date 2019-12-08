
$(function () {
  // 加载数据
  var page = 1
  var pageSize = 5
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template("tpl", info))
        // 分页功能
        $('#page').bootstrapPaginator({
          // 指定bootstrap的版本，如果是3版本必须指定
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 当分页的按钮被点击的时候，会触发的事件, 关注第四个参数： 第几页
          onPageClicked: function () {
            page = arguments[3]
            render()
          }
        })
      }
    })
  }
  render()

  // 启用/禁用用户功能
  var id, isDelete
  $('tbody').on('click', '.btn', function () {
    $('.upUserModal').modal('show')
    id = $(this).data('id')
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
  })
  $('.upUserBtn').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        if (info.success) {
          $('.upUserModal').modal('hide')
          render()
        }
      }
    })
  })
})