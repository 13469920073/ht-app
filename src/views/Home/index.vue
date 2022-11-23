<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right:20px">
        <el-card class="box-card">
         <div class="user">
              <img src="../../assets/_20221029155807.jpg" alt="">
              <div >
                <p>{{Name}}</p>
                <p>{{Memver}}</p>
              </div>
         </div>
         <div class="info">
           <p>上次登录时间：<span>{{Time}}</span></p>
          <p>上次登录地点：<span>{{Address}}</span></p>
         </div>
        </el-card>
        <el-card style="height:460px;margin-top:20px">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  v-for="(item,index) in tableDataName"
                  :key="index"
                  :prop="item.value"
                  :label="item.label"
                 >
                   <template slot-scope="scope">
                    <span>{{scope.row[item.value]}}</span>
                   </template>
                </el-table-column>
              </el-table>
           </el-card>
      </el-col>
      <el-col :span="16">
          <div class="num">
             <el-card v-for="item in countData" :key="item.icon" :body-style="{display:'flex' ,padding:'0px'}">
              <i :class="`el-icon-${item.icon}`" class="icon" :style="{ background:item.color}"></i>
              <div class="detail">
                <p>￥{{item.value}}</p>
                <p>{{item.name}}</p>
              </div>
             </el-card>
          </div>
          <el-card style="height:280px;margin-top: 20px;">
            <!-- 折线图 -->
              <div id="main" style="height:280px;"></div>
          </el-card>
          <div class="set_card">
            <el-card style="height:260px;" >
              <!-- 柱状图 -->
              <div id="bar" style="height:260px;"></div>
          </el-card>
           <el-card >
             <!-- 饼状图 -->
              <div id="pie" style="height:260px;"></div>
          </el-card>
          </div>
      </el-col>
  </el-row>
  </div>
</template>
<script>
import {getData,getInfo} from '../../api/index'
import * as echarts from 'echarts';
export default {
  name:"Home",
  data(){
    return {
      Name:'',
      Memver:'',
      Time:'',
      Address:'',
      List:[],
      tableData:[],
      tableDataName:[
       {label:'课程',value:'name'},
       {label:'今日购买',value:'todayBuy'},
       {label:'本月购买',value:'monthBuy'},
       {label:'总购买',value:'totalBuy'},
      ],
      countData:[
        {
          name:"今日支付订单",
          value:123,
          icon:"success",
          color:"#2ec7c9"
        },
              {
          name:"今日支付订单",
          value:456,
          icon:"star-on",
          color:"#2ec7c9"
        },
              {
          name:"今日支付订单",
          value:789,
          icon:"star-off",
          color:"#2ec7c9"
        },
              {
          name:"今日支付订单",
          value:222,
          icon:"s-goods",
          color:"#2ec7c9"
        },
              {
          name:"今日支付订单",
          value:123,
          icon:"goods",
          color:"#2ec7c9"
        },
              {
          name:"今日支付订单",
          value:123,
          icon:"s-help",
          color:"#2ec7c9"
        }
      ]
    }
  },
  mounted() {
    getInfo({}).then(({data})=>{
      this.Name=data.data.Name
      this.Memver=data.data.Memver
      this.Address=data.data.Address
      this.getNewDate(data.data.Time)
    })
    getData({}).then(res=>{
      this.tableData=res.data.data.tableData
     // 折线图
      this.initline(res.data.data)
     // 柱状图
      this.initbar(res.data.data)
     // 饼状图
      this.initpie(res.data.data)

    })
  },
  methods:{
    getNewDate(time){
     const data=new Date(time)
      let y=data.getFullYear()
      let m=data.getMonth()+1
      let d=data.getDate()
      this.Time=`${y}-${m}-${d}`
    },
    // 折线图
    initline(item){
      let {orderData}=item
      // x轴数据
      let aAxis=Object.keys(orderData.data[0])
      // series 的数据
      let series=[]
      aAxis.map(key=>{
        series.push({
           name:key,
           type:'line',
           data:orderData.data.map(item=>item[key]) // map 返回 新的数组
              
        })
      })
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);
      let option={
            legend:{
               data: aAxis
            },
            xAxis: {
             data: aAxis
           },
            yAxis: {},
            series:series
      };
    option && myChart.setOption(option);
    },
    // 柱状图
    initbar(item){
       let {userData}=item
      let chartDom = document.getElementById('bar');
      let myChart = echarts.init(chartDom);
       let option={
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['新增用户', '活跃用户']
            },
          
            xAxis: [
             {
                type: 'category',
                // prettier-ignore
                data: userData.map(item=>item.date)
              }
            ],
            yAxis: [
               {
                type: 'value'
              }
            ],
            series:[
                  {
                  name: '新增用户',
                  type: 'bar',
                  data: userData.map(item=>item.new),
             
                },
                 {
                  name: '活跃用户',
                  type: 'bar',
                  data: userData.map(item=>item.active),
               
                },
            ]
      };
    option && myChart.setOption(option);
   },
   // 饼状图
    initpie(item){
      let {videoData}=item
      let chartDom = document.getElementById('pie');
      let myChart = echarts.init(chartDom);
      let option={
         tooltip: {
            trigger: 'item'
          },
         legend: {
          left: 'center'
        },
         series: [

            {
              // name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: videoData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      }
      option && myChart.setOption(option);
    }
  }
}
</script>
<style lang="less" scoped>
 .user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    width: 160px;
    height: 160px;
    border-radius:50% ;
    margin-right: 40px;
  }
  div{
      :nth-child(1){
        font-size: 32px;
        margin-bottom: 10px;
      }
      :nth-child(2){
        color: #999999;
      }
    
  }
 }
 .info{
    p{
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span{
        color: #666666;
        margin-left:60px ;
      }
    }
 }
 .num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 15px;
  }
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
     :nth-child(1){
        font-size: 30px;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
      }
      :nth-child(2){
        color: #999999;
        font-size: 14px;
        text-align: center;
      }
  }
 }
 .set_card{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    height: 260px;
    width: 48%;
  }
 }
</style>