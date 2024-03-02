import Vue from 'vue'
import VueRouter from 'vue-router' 
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'



Vue.use(VueRouter)
//路由匹配规则
const routes=[{
    path:'/',
    component:Main,
    name:'Main',
    redirect:'/home',
    children:[]
},{
    path:'/login',
    component:Login,
    name:'登录' ,
}]

const router =new VueRouter({
    routes
})

export default router