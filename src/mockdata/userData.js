import Mock from 'mockjs'
const time=['周一','周二','周三','周四','周五','周六','周日']

const userData=[]
for(let i=0;i<time.length;i++){
    userData.push(Mock.mock({
        'date|+1':time,
        'new|0-100':100,
        'active|200-1000':200
    }))
}
console.log(userData);
export default userData