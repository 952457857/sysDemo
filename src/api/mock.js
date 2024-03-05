import Mock from 'mockjs'
import tableData from '@/mockdata/tableData.js'
import orders from '@/mockdata/orderData.js'
import line from '@/mockdata/lineData.js'
import userData from '@/mockdata/userData.js'
import pieData from '@/mockdata/pieData'
import userList from '@/mockdata/userList'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'



console.log(line);
Mock.mock('/api/home/getData', 'get', function () {

    return {
        tableData,
        orders,
        line,
        userData,
        pieData
    }
})

let str = /\/api\/user\/userdata[\s\S]*/
//拦截表单的用户数据
Mock.mock(str, 'post', function (params) {
    console.log('用户数据测试');
    console.log(params);
    //把拿到的参数转化为json对象
    const pageObj = JSON.parse(params.body).params
    console.log(pageObj.page);
    //拿到当前页
    let curPage = pageObj.page
    //拿到每页显示条数
    let step = pageObj.pageSize
    //根据当前页计算传递需要截取的数组开始的位置
    let startIndex = (curPage - 1) * step
    let endIndex = curPage * step
    //返回的页面数据    
    const userListm = userList.slice(startIndex, endIndex)
    //总的数据条数
    let count = userList.length
    return { userListm, count }


})


//新增一个用户数据
Mock.mock('/api/user/adduser', 'post', function (params) {
    console.log('新增用户数据');
    console.log(params);
    //把拿到的参数转化为json对象
    const newUser = JSON.parse(params.body).params
    //把新增的数据添加到userList的开头
    userList.unshift(newUser)
    return {
        code: 200//添加成功
    }
})

//编辑用户数据
Mock.mock('/api/user/editUser', 'post', function (params) {
    console.log('编辑用户数据');
    console.log(params);
    //把拿到的参数转化为json对象
    const editUser = JSON.parse(params.body).params
    //通过要更改的用户id 查找在源数据中的索引 更改源数据 userList
    let index = userList.findIndex((item) => item.id == editUser.id)
    userList[index] = editUser
    return {
        code: 200//编辑成功
    }
})

//删除用户数据
Mock.mock('/api/user/deleteUser', 'post', function (params) {
    console.log('删除用户数据');
    console.log(params);
    //把拿到的参数转化为json对象
    const deleteUser = JSON.parse(params.body).params
    //通过要更改的用户id 查找在源数据中的索引 更改源数据 userList
    let index = userList.findIndex((item) => item.id == deleteUser.id)
    userList.splice(index, 1)
    return {
        code: 200//删除成功
    }
})

//根据用户姓名查找数据
Mock.mock('/api/user/getUserByName', 'post', function (params) {
    console.log('根据用户姓名查找用户数据');
    console.log(params);
    //把拿到的参数转化为json对象
    const name = JSON.parse(params.body).params
    //根据用户的名字查找数据 返回一个数组
    let users = [];//用来存储找到的对象
    userList.forEach((item) => {
        if (item.name.indexOf(name)>=0) {//满足条件放进数组
            users.push(item)
        }
    })
    return users

})
//用户登录
Mock.mock('/api/login', 'post', function (params) {
    //
    console.log('用户登录');
    //拿到前端登录的参数
    console.log(params);
    //查看是否满足需求 满足要求 就等登录成功 返回一个token认证信息
    //把拿到的参数转化为json对象
    const users = JSON.parse(params.body).params
    if (users.username == 'admin' && users.password == 'admin') {//判断为超级管理员
        return {
            code: 2000,
            data: {
                menu: [
                    {
                        path: '/home',
                        name: '首页',
                        label: '首页',
                        icon: 's-home',
                        url: 'Home.vue'
                    },
                    {
                        path: '/mall',
                        name: '商品管理',
                        label: '商品管理',
                        icon: 'goods',
                        url: 'Mall.vue'
                    },
                    {
                        path: '/user',
                        name: '用户管理',
                        label: '用户管理',
                        icon: 'user-solid',
                        url: 'User.vue'
                    },
                    // {
                    //     label: '其他',
                    //     lcon: 'zoom-in',
                    //     children: [
                    //         {
                    //             path: '/page1',
                    //             name: 'page1',
                    //             label: '首页',
                    //             icon: 'setting',
                    //             url: 'Other/PageOne'
                    //         },
                    //         {
                    //             path: '/page2',
                    //             name: 'page2',
                    //             label: '首页',
                    //             icon: 'setting',
                    //             url: 'Other/PageTwo'
                    //         }
                    //     ]
                    // },
                    // {
                    //     label: '关于',
                    //     lcon: 'lcoatlom',
                    //     children: [
                    //         {
                    //             path: '/about1',
                    //             name: 'about1',
                    //             label: '首页',
                    //             icon: 'setting',
                    //             url: 'Other/PageOne'
                    //         },
                    //         {
                    //             path: '/about2',
                    //             name: 'about2',
                    //             label: '首页',
                    //             icon: 'setting',
                    //             url: 'Other/PageTwo'
                    //         }
                    //     ]
                    // }
                ],
                token: Mock.Random.guid(),
                message: '登录成功'
            },

        }
    } else if (users.username == 'xiaoxiao' && users.password == '666') {//判断为普通用户
        return {
            code: 2000,
            data: {
                menu: [
                    {
                        path: '/home',
                        name: '首页',
                        label: '首页',
                        icon: 's-home',
                        url: 'Home.vue'
                    },
                    {
                        path: '/mall',
                        name: '商品管理',
                        label: '商品管理',
                        icon: 'goods',
                        url: 'Mall.vue'
                    },

                ],
                token: Mock.Random.guid(),
                message: '登录成功'
            },

        }

    }else{
        return{
            code: 400,//校验失败
            data:{
                message:'密码错误'
            }

        }
    }

})