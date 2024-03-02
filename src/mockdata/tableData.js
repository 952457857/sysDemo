import Mock from 'mockjs'
const phone=['华为P8','魅蓝Note2','华为Mate7','vivo X5Pro','OPPO R7','魅族Pro 5']
var tableData = Mock.mock({
    'tableData|6':[{
        'name|+1':phone,
        'todayBuy|50-150':100,
        'monthBuy|250-300':300,
        'totalBuy|750-900':800,
    }]
})
// 输出结果
export default tableData.tableData