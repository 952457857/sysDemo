import Mock from 'mockjs'
const phone=['华为P8','魅蓝Note2','华为Mate7','vivo X5Pro','OPPO R7','魅族Pro 5']

const pieData= Mock.mock({
    'pieData|6':[{
        'name|+1':phone,
        'value|1000-5000':1000
    }]
})
export default pieData.pieData