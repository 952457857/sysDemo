<template>
  <div class="manage">
    <div class="manage-header">
      <div class="header">
        <div>
          <el-button type="primary" @click="adduser">新增</el-button>
        </div>
        <div class="search">
          <el-input v-model="search" placeholder="请输入要查找的姓名">
            <template slot="prepend">
              <el-button type="primary" icon="el-icon-search" @click="onSearch"
                >搜索</el-button
              >
            </template>
          </el-input>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="住址"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              style="
                 {
                  margin-right: 20px;
                }
              "
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :total="count"
        :page-size.sync="pageParam.pageSize"
        :current-page.sync="pageParam.page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser ,getUserByName} from "@/api/index.js";
export default {
  components: {},
  name: "my-user",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      search:'',//搜索的名字
      nextid: 10000,
      tableData: [], //表格数据展示
      modetype: 0, //是编辑还是新增
      count: 0, //数据总数
      pageParam: {
        //页面数据
        page: 1,
        pageSize: 10,
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        birth: [
          { required: true, message: "出生日期不能为空", trigger: "blur" },
        ],
        addr: [{ required: true, message: "地址不能为空", trigger: "blur" }],
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getUserLists(this.pageParam);
  },
  methods: {
    onSearch(){//搜索
      console.log('查询');
      console.log(this.search);
      //发送请求 把名字传递过去 拿到查询结果 放在表单中
      getUserByName(this.search).then((res)=>{
        if(res.status==200){//响应成功
          this.tableData=res.data
        }
      })
      
    },
    handleCurrentChange(val) {
      //页面改变时触发事件
      this.pageParam.page = val;
      this.getUserLists(this.pageParam);
    },
    async getUserLists(pageval) {
      //获取用户数据
      const res = await getUserList(pageval);
      console.log(res);
      if (res.status == 200) {
        //响应成功
        this.tableData = res.data.userListm;
        this.count = res.data.count; //数据总数
      }
    },
    adduser() {
      this.modetype = 0; //新增
      this.dialogVisible = true;
    },
    handleEdit(val) {
      //编辑用户数据
      this.modetype = 1; //编辑
      this.dialogVisible = true;
      this.form = val;
    },
    handleDelete(val) {
      //删除用户数据
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除用户的逻辑
          deleteUser(val).then((res) => {
            if (res.data.code == 200) {
              //删除成功
              //调用数据列表 刷新页面
              this.getUserLists(this.pageParam);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submit() {
      //表单提交
      //表单校验
      this.$refs.form.validate().then((data) => {
        if (data) {
          if (this.modetype == 0) {
            //新增
            console.log("新增");
            this.form.id = this.nextid; //唯一id
            this.nextid++; //id自增
            //发起新增的请求把表单的数据传递过去，然后重新请求页面
            addUser(this.form).then((res) => {
              if (res.data.code == 200) {
                this.$message({ message: "新增用户成功", type: "success" });
                //重新请求页面
                this.getUserLists(this.pageParam);
                //重置表单
                //关闭页面
                this.handleClose();
              }
            });
          } else {
            //编辑
            //发起编辑用户的请求
            console.log("编辑");
            console.log(this.form);
            editUser(this.form).then((res) => {
              if (res.data.code == 200) {
                //编辑成功
                this.$message({
                  type: "success",
                  message: "编辑成功!",
                });
                //调用获取数据刷新页面
                this.getUserLists(this.pageParam);
                //清空表单 关闭页面
                this.handleClose();
              }
            });
          }
        }
      });
    },
    handleClose() {
      //清空表单
      //关闭对话框
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //获取用户数据
    async getUsers() {
      console.log("数据测试");
      const res = await getUser();
      if (res.status == 200) {
        //请求成功
        //给tabledata数据
        this.tableData = res.data;
        console.log(this.tableData);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.page {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}

.manage-header {
  height: 90%;

  .header {
    display: flex;
    justify-content: space-between;
    /deep/ .el-input-group__prepend {
      background-color: #409eff;
      color: white;
    }
  }
}

.manage {
  height: 100vh;
}
</style>