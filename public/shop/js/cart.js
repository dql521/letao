$(function () {
    function render() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (info) {
                if (info.error) {
                    location.href = 'login.html?form='+ location.href
                }
                $('#OA_task_1').html(template('tpl',{rows:info}))
            }
        })
    }
    render()

    // 注册删除点击事件
    $('#OA_task_1').on('click','.btn-delete',function () {
        var id = $(this).data('id')
        mui.confirm('你确定要删除该条记录吗？','温馨提示',['确定','取消'],function (e) {
            if (e.index === 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id:[id]
                    },
                    success: function (response) {
                        render() 
                    }
                })
            }
        })
    })
})