import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
//使用vuex共享组件数据
import store from './store/'
//mock
import './api/mock'

//清除默认样式
import '../public/reset.css'
//导入cookie信息
import Cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI)

//添加全局的前置导航守卫

router.beforeEach((to,from,next)=>{
  //拿到token
  const token=Cookie.get('token')
  //判断token信息是否存在
  if(!token&&to.name!=='登录'){
    //当token不存在时 不能访问其他的路由
    next({name:'登录'})
  }else if(token&&to.name=='登录'){//如果token存在 并且 要跳转 的时登录页面时 跳转到首页 也就是登录状态下不能访问登录页面
    next({name:'首页'})

  }else{
    next()//放行导航
  }
  //
  
})

new Vue({
  router,
  store,
  created(){
      store.commit('addMenu',router)
  },
  render: h => h(App),
}).$mount('#app')
