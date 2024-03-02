<template>
    <div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   :collapse="iscollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3>{{iscollapse?'后台':'通用后台管理系统'}}</h3>
        <el-menu-item :index="item.label" v-for="item in nochildren" :key="item.name" @click="goto(item)">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu :index="item.label" v-for="item in haschildren " :key="item.label">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
          </template>
            <el-menu-item :index="child.name" v-for="child in item.children"   :key="child.name">{{child.name}}</el-menu-item>
        </el-submenu>
        
      </el-menu>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Cookie from 'js-cookie';
 export default {
    data() {
      return {
        
      };
    },
    methods: {
      goto(item){
        if(this.$route.path!=item.path){
          
          this.$router.push(item.path)
          this.$store.commit('selectMenu',item)
        }
      }
    },
    computed:{
      nochildren(){
        console.log('打印菜单');
        console.log(JSON.parse(Cookie.get('menus')));
        if(Cookie.get('menus')){//如果有缓存则用缓存
          return JSON.parse(Cookie.get('menus')).filter(item=>!item.children)   
        }
        return this.menu.filter(item=>!item.children)
      },
      haschildren(){
        if(Cookie.get('menus')){//如果有缓存则用缓存
          return JSON.parse(Cookie.get('menus')).filter(item=>item.children)  
        }
        return this.menu.filter(item=>item.children)
      },
       
      ...mapState(['iscollapse','menu'])
    }
  }
</script>
<style lang='less' scoped>
    .el-menu{
      height: 100vh;
      h3{
        color: #FFF;
        text-align:center;
        line-height:48px;
        font-size:16px;
        font-weight:400
      }
      border-right-width: 0;
    }
</style>