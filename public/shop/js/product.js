$(function () {
    // 渲染详情页数据
    var id = location.search.split('=')[1]
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function (info) {
            console.log(info);
            var arrSize = []
            var temp = info.size.split('-')
            for (var i = +temp[0]; i <= temp[1]; i++) {
                arrSize.push(i)
            }
            info.sizeArr = arrSize
            $('.mui-scroll').html(template('tpl', info))
            mui('.mui-slider').slider({
                interval: 5000
            })
            mui('.mui-numbox').numbox()
        }
    })

    // 尺码点击事件
    $('.mui-scroll').on('click', '.size span', function () {
        $(this).addClass('now').siblings().removeClass('now')
    })

    // 加入购物车事件
    $('.btn-add').on('click', function () {
        var num = $('.mui-numbox-input').val()
        var size = $('.now').text()
        if (!size) {
            mui.toast('请选择尺码')
            return
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (info) {
                if (info.error) {
                    location.href = 'login.html?from=' + location.href
                } else {
                    mui.confirm('恭喜你，加入购物车成功', '温馨提示', ['去购物车', '继续逛逛'], function (e) {
                        if (e.index === 0) {
                            location.href = 'cart.html'
                        }
                    })
                }
            }

        })
    })
})