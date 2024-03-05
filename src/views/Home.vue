<template>
    <div>
        <el-row>
            <el-col :span="8" style="padding-right:10px">
                <div class="grid-content bg-purple-dark">
                    <el-card class="box-card">
                        <div class="user">
                            <img src="../assets/images/head.png" alt="头像">
                            <div class="userinfo">
                                <p class="name">Admin</p>
                                <p class="access">超级管理员</p>
                            </div>
                        </div>
                        <div class="login-info">
                            <p>上次登录时间<span>{{nowDate}}</span></p>
                            <p>上次登录地点<span>武汉</span></p>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-top:20px;height:460px">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="name" label="手机品牌">
                            </el-table-column>
                            <el-table-column prop="todayBuy" label="今日购买">
                            </el-table-column>
                            <el-table-column prop="monthBuy" label="本月购买">
                            </el-table-column>
                            <el-table-column prop="totalBuy" label="总购买">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="16" style="padding-left:10px">
                <div class="num">
                    <el-card v-for="item in orders" :key="item.id" :body-style="{display:'flex',padding:0}">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></i>
                        <div class="detail">
                            <p class="price">￥{{item.value}}</p>
                            <p class="dec">{{item.name}}</p>
                        </div>
                    </el-card>


                </div>
                <el-card style="height:280px">
                    <!-- 折线图 -->
                    <div ref="lineChart" class="lineChart"></div>
                </el-card>
                <div class="graph">
                    <el-card>
                        <div ref="barChart" class="lineChart"></div>
                    </el-card>
                    <el-card>
                        <div ref="pieChart" class="pieChart"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { getData } from '@/api/index'
import * as echarts from 'echarts';
import {getNowFormatDate} from '@/utils/time.js'
export default {
    components: {},
    name: 'my-home',
    data() {
        return {
            tableData: [],
            orders: [],
            line: [],
            bar: [],
            pie: []
        }
    },
    computed:{
        nowDate(){
            return getNowFormatDate()
        }
    },
    methods: {
        async getDatas() {
            const res = await getData()
            console.log(res);
            if (res.status == 200) {
                this.tableData = res.data.tableData
                this.orders = res.data.orders
                this.line = res.data.line;
                this.bar = res.data.userData;
                this.pie=res.data.pieData;
                //折线图实例
                (() => {
                    var lineChart = echarts.init(this.$refs.lineChart);
                    //指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '折线图'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '8%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [

                        ]
                    };
                    option.xAxis.data = this.line.date
                    //每项的数据
                    const keys = Object.keys(this.line.list[0])
                    keys.forEach(item => {
                        option.series.push({
                            name: item,
                            type: 'line',

                            data: this.line.list.map(i => i[item])
                        })
                    })
                    lineChart.setOption(option);
                })();

                //柱状图
                (() => {
                    //得到echrts实例

                    var barChart = echarts.init(this.$refs.barChart);
                    console.log('打印barChart');
                    console.log(barChart);
                    //配置项
                    var option = {
                        title: {
                            text: '用户图表',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {

                        },


                        xAxis: [
                            {
                                type: 'category',
                                // prettier-ignore
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [

                        ]
                    };
                    //时间
                    const date = this.bar.map(item => item['date'])
                    option.xAxis[0].data = date
                    //获取条目名字
                    const keys = Object.keys(this.bar[0]).filter(item => item != 'date')
                    //新用户
                    const newuser = this.bar.map(item => item['new'])
                    //活跃用户
                    const active = this.bar.map(item => item['active'])
                    keys.forEach(key => {
                        option.series.push({
                            name: key,
                            type: 'bar',
                            data: key === 'new' ? newuser : active
                        })
                    })
                    //设置配置项
                    barChart.setOption(option);
                })();
                //饼图
                (() => {
                    //得到echarts的实例
                    var pieChart = echarts.init(this.$refs.pieChart);
                    //配置项
                    var option = {
                        title: {
                            text: '手机销售数量',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            itemWidth: 7,
                            itemHeight: 6.5
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: [
                                    { value: 1048, name: 'Search Engine' },
                                    { value: 735, name: 'Direct' },
                                    { value: 580, name: 'Email' },
                                    { value: 484, name: 'Union Ads' },
                                    { value: 300, name: 'Video Ads' }
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                width: "100%"
                            }
                        ]
                    };
                    console.log('pie');
                    console.log(this.pie);
                    option.series[0].data=this.pie
                    //设置配置项
                    pieChart.setOption(option)
                })();

                // 使用刚指定的配置项和数据显示图表。



            }
        }
    },
    mounted() {
        this.getDatas()




    }
}
</script>
<style lang='less' scoped>
.user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #999;
    padding-bottom: 20px;
    margin-bottom: 20px;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;

    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999;
        }
    }
}

.login-info {
    font-size: 14px;
    line-height: 28px;
    color: #999;

    p span {
        color: #666;
        margin-left: 60px;
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .el-card {
        width: 32%;
        margin-bottom: 10px;
    }

    .detail {
        display: flex;
        margin-left: 15px;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .dec {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }

}

.graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .el-card {
        width: 48%;
        height: 260px;

        .lineChart {
            width: 100%;
            height: 260px;
        }

        .pieChart {
            width: 100%;
            height: 260px;
        }
    }
}

.lineChart {
    width: 100%;
    height: 280px;
}
</style>