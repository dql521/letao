$(function () {
    // 加载搜索历史
    function render() {
        var history = localStorage.getItem('history')
        var arr = JSON.parse(history) || []
        $('.history').html(template('tpl',{rows:arr}))
    }
    render()

    // 清空历史
    $('.history').on('click','.btn-clear',function () {
        mui.confirm('确定要删除所有搜索记录吗？',function (e) {
            if(e.index === 1){
                localStorage.removeItem('history')
                render()
            }
        })
    })

    // 删除记录
    $('.history').on('click','.btn-delete',function () {
        var that = $(this)
        mui.confirm('确定要删除该条搜索记录吗？',function (e) {
            if(e.index === 1){
            var index = that.data('index')
            var history = localStorage.getItem('history')
            var arr = JSON.parse(history) || []
            
            arr.splice(index,1)
            localStorage.setItem('history', JSON.stringify(arr))
            render()
            }
        })
        
    })

    // 添加记录
    $('.btn-search').on('click',function () {
        var txt = $('.search input').val().trim()
        if(!txt){
           return mui.toast('输入内容不能为空')
        }
        var history = localStorage.getItem('history')
        var arr = JSON.parse(history) || []
        var index = arr.indexOf(txt)
        if(index !== -1){
            arr.splice(index,1)
        }
        arr.unshift(txt)
        render()
        localStorage.setItem('history', JSON.stringify(arr))
        $('.search input').val('')
        location.href = 'searchList.html?key=' + txt
    })
})