$(function () {
    // 拿到搜索字段并放入搜索框
    var key = decodeURI(location.href).split('=')[1]
    $('.search input').val(key)
   

    // 获取列表
    function render() {
        var option = {
            proName: key,
            page: 1,
            pageSize: 1000,
        }

        // 判断是否有now
        var now = $('.now')
        if (now.length === 1) {
            var name = now.data('name')
            var value = now.children('i').hasClass('fa-angle-down') ? 1 : 2
            option[name] = value
        }

        // 发送ajax请求
        $.ajax({
            type: "get",
            url: '/product/queryProduct',
            data: option,
            beforeSend: function () {
                $('.lt_product').html('<div class="loading"></div>')
            },
            success: function (info) {
                
                setTimeout(function () {
                    $('.lt_product').html(template('tpl',info))
                },1000)
            }
        })
    }
    render()

    // 排序功能
    $('.sort li[data-name]').on('click',function () {

        if ($(this).hasClass('now')) {
            $(this).children('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }else{
            $(this).addClass('now').siblings().removeClass('now')
        }
        render()
    })

    // 搜索功能
    $('.btn-search').on('click',function () {
        var content = $('.search input').val().trim()
    if (!content) {
        mui.toast('搜索内容不能为空')
        return
    }else{
        location.href = 'searchList.html?key=' + content
    }
    })
})