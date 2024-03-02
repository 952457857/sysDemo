<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeCollapse"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabslist" :key="item.label"
          ><a @click="goback(item)">{{ item.label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="..//assets/images/head.png" alt="海贼王" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
export default {
  components: {},
  name: "CommonHeader",
  methods: {
    //退出
    handleClick(command) {
      if (command == "logout") {
        console.log("退出");
        //清除缓存
        Cookie.remove("token");
        Cookie.remove("menus");
        //清除路由
        this.$router.options.routes = [
          {
            path: "/",
            component: Main,
            name: "Main",
            redirect: "/home",
            children: [],
          },
          {
            path: "/login",
            component: Login,
            name: "登录",
          },
        ];
        //清除store中存储的数据
        this.$store.commit('init')
        console.log(this.$router);
        //跳转登录页面
        this.$router.push({ name: "登录" });
      }
    },
    changeCollapse() {
      //触发改变iscollapse的事件
      this.$store.commit("changeCollapse");
    },
    goback(item) {
      if (this.$route.path != item.path) {
        this.$router.push(item.path);
      }
    },
  },
  computed: {
    ...mapState(["tabslist"]),
  },
};
</script>
<style lang='less' scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .l-content {
    display: flex;
    justify-content: left;
    align-items: center;

    .el-breadcrumb {
      margin-left: 20px;
      font-size: 700;

      .el-breadcrumb__item {
        &:last-child {
          /deep/ .el-breadcrumb__inner {
            a {
              color: #fff;
            }
          }
        }
        .el-breadcrumb__inner a {
          color: #666;
        }
      }
    }
  }
}

.text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
</style>