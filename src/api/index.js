import http from '@/utils/request'

//请求首页的数据
export const  getData=()=>{
    return http.get('/home/getData')
}

//请求用户的数据列表
export const getUserList=(params)=>{
    console.log('查询用户数据');
    return http.post('/user/userdata',{params})
}

//新增用户的数据
export const addUser=(params)=>{
    return http.post('/user/adduser',{params})
}

//编辑用户数据
//根据用户id查找到数据进行修改
export const editUser=(params)=>{
    return http.post('/user/editUser',{params})
}

//删除用户数据
export const deleteUser=(params)=>{
    return http.post('/user/deleteUser',{params})
}

//根据用户名字 查询用户数据 
export const getUserByName=(params)=>{
    return http.post('/user/getUserByName',{params})
}
//登录请求
export const userLogin=(params)=>{
    return http.post('/login',{params})
}