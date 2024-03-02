import Cookie from 'js-cookie'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router' 
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    iscollapse: false,
    tabslist:[
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home.vue'
      }
    ],//面包屑
    menu:[],//菜单数据
  },
  mutations: {
    //初始化state中的数据
    init(state){
        state.tabslist=[
          {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home.vue'
          }
        ]
        state.menu=[]
    },
    changeCollapse(state) {
      state.iscollapse = !state.iscollapse
    },
    selectMenu(state,val){//修改tabslist
      if(state.tabslist.findIndex(item=>item.path==val.path)===-1){
        state.tabslist.push(val)
      }
      
    },
    deleteTags(state,val){
        //拿到关闭标签在数组中的位置，然后删除
       
        //删除
        state.tabslist.splice(val,1)
    },
    setMenu(state,val){
      
      //把后端拿到的menu数据 放在state里面
      state.menu=val
    },
    addMenu(state,router){
      console.log(router);
      const routes=router.options.routes
      console.log('打印当前数组');
      console.log(routes);
      //判断缓存中是否有数据
      if(Cookie.get('menus')){
        const menus=JSON.parse(Cookie.get('menus'))
        state.menu=menus
        //组装动态路由的数据
        state.menu.forEach(item => {
        
            item.component=()=> import(`@/views/${item.url}`)
            routes[0].children.push(item)
       
          
        })
        //路由动态添加
          console.log('动态路由');
          console.log(routes);
          console.log('路由对象');
          console.log(router);
          const initRoutes=[{
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
          //添加路由前刷新match
          const as=new VueRouter({initRoutes})
          console.log('打印新路由');
          console.log(as);
          router.matcher=as.matcher//清除路由
          console.log(router.matcher);
          router.addRoutes(routes)
       
        
      }
    }
  }
})

export default store