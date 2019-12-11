$(function () {
    // 获取分类列表
$.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (info) {
        $('.cat_nav ul').html(template('tpl',info))
        var id = info.rows[0].id
        second(id)
    }
})


// 获取二级分类
function second(id) {
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
            id:id
        },
        success:function (info) {
            $('.cat_content ul').html(template('tpl2',info))
        }
    })
}

// 给分类导航注册点击事件
$('.cat_nav ul').on('click','li',function () {
    $(this).addClass('now').siblings().removeClass('now')
    var id = $(this).data('id')
    second(id)
})
})