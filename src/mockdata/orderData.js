import Mock from 'mockjs'
const orderLables=['今日支付订单','今日收藏订单','今日未支付订单','本月支付订单','本月收藏订单','本月未支付订单']
const icons=['success','star-on','s-goods','success','star-on','s-goods']
const colors=['#2ec7c9','#ffb980','#5ab1ef','#2ec7c9','#ffb980','#5ab1ef']
var orders = Mock.mock({
    'orders|6':[{
        'id|+1':1,
        'name|+1':orderLables,
        'value|500-1000':500,
        'icon|+1':icons,
        'color|+1':colors,
    }]
})
console.log(orders);
// 输出结果
export default orders.orders