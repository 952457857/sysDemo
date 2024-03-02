import Mock from 'mockjs'
var list=[]
var date=[]
for(var i=0;i<7;i++){
    list.push(
        Mock.mock({
            '苹果':Mock.Random.float(1000,8000,0,0),
            'vivo':Mock.Random.float(1000,8000,0,0),
            'oppo':Mock.Random.float(1000,8000,0,0),
            '魅族':Mock.Random.float(1000,8000,0,0),
            '三星':Mock.Random.float(1000,8000,0,0)           
        })
    )
}
for(var i=1;i<8;i++){
    date.push(`2022-${i}`)
}

export default {list,date}