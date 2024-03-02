<template>
    <div>
        <!-- <CommonTags style="margin-bottom:20px"></CommonTags>
        <router-view></router-view> -->
        <el-container>
            <el-aside width="auto">
                <CommonAside></CommonAside>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader></CommonHeader>
                </el-header>
                <el-main>
                    <CommonTags style="margin-bottom: 20px"></CommonTags>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonTags from "@/components/CommonTags.vue";
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
    components: {
        CommonTags,
        CommonAside,
        CommonHeader
    },
    name: "my-main",
};
</script>
<style lang='less' scoped>
.el-header {
    padding: 0;
  }
  .el-aside{
    background-color: #545c64;
  }
</style>