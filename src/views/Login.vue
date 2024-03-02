<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="70px" :rules="rules">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "@/api/index.js";
import Cookie from "js-cookie";
export default {
  components: {},
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      //拿到表单中的用户名和密码
      //发起登录请求
      console.log("用户登录");
      this.$refs.form.validate().then((val) => {
        console.log(val);
        if (val) {
          //表单校验成功
          userLogin(this.form).then((res) => {
            console.log(res);
            //
            if (res.data.code == 2000) {
              //登录成功
              //存储token
              Cookie.set("token", res.data.data.token);
              //把数据存在cookie里面进行缓存 防止页面刷新导致菜单数据消失
              Cookie.set('menus',JSON.stringify(res.data.data.menu))
              //把菜单值存储到vuex的共享数据里
              this.$store.commit('setMenu',res.data.data.menu)
              //生成动态路路由
              this.$store.commit('addMenu',this.$router)
              //路由跳转到首页
              this.$router.push({ name: "首页" });
            } else
              {
                this.$message({
                  type: 'error',
                  message: res.data.data.message,
                })
              }
               
              
          });
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-button {
    margin-left: 50px;
  }
}
</style>