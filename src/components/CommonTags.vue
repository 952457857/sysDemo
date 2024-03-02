<template>
    <div>
        <el-tag v-for="tag in tabslist" :key="tag.name" :closable="tag.label!='首页'" size="mini" @click="selectTags(tag)"
            @close="handleClose(tag)">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        components: {},
        name: 'my-tags',
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['tabslist'])
        },
        methods: {
            selectTags(tag) {
                //路由跳转
                //判断点击的tags是否是当前路由
                if (tag.path != this.$route.path) {
                    this.$router.push(tag.path)
                }
            },
            handleClose(tag) {
                console.log(this.tabslist);
                let index = this.tabslist.findIndex(item => item.label == tag.label)
                console.log(index);
                this.$store.commit('deleteTags', index)
                //删除时跳转路由
                // if(this.tabslist[index].path!==this.$route.path){
                //     return
                // }
                if (index == this.tabslist.length) {
                    if(this.$route.path==this.tabslist[this.tabslist.length - 1].path){//当前要跳转的路由和现在的路由相等时不用跳转
                        return
                    }
                    this.$router.push(this.tabslist[this.tabslist.length - 1].path)//最后一个
                } else {
                    if(this.$route.path==this.tabslist[index].path){
                        return
                    }
                    this.$router.push(this.tabslist[index].path)//中间
                }
            }
        }
    }
</script>
<style lang='less' scoped>
    .el-tag {
        margin-right: 20px;
    }
</style>