import Mock from 'mockjs'
import { config } from 'vue/types/umd'

//get 请求从config.url获取参数，post 从config.body中获取数据
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        //为空不做任何操作
        return
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}"')
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        console.log('name' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
            if (name && user.name.indexof(name) === -1 && user.addr.indexof(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    },
    //修改用户
    updateUser: config => {
        const {
            id,
            name,
            addr,
            age,
            birth,
            sex
        } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.addr = addr
                u.age = age
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }
}
