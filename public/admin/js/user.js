
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
            success: function( info ) {
              $('tbody').html(template( "tpl", info ))
              // 分页功能
              $('#page').bootstrapPaginator({
                // 指定bootstrap版本
                bootstrapMajorVersion: 3,
                // 当前页
                page: info.page,
                // 总页数
                totalPages: Math.ceil( info.total / info.size ),
                // 当页面被点击时触发
                onPageClicked: function(a,b,c,page) {
                  // page 当前点击的页码
                  pege = page;
                  render();
                }
            
        })
          }
        })
    }
    render()
})