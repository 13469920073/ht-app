<template>
  <div class="header_left">
    <div class="l-cont">
       <el-button icon="el-icon-menu" @click="getbut" style="margin-right:20px"></el-button>
       <!-- 面包屑 -->
       <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tagsList" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-cont">
      <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../assets/_20221029155807.jpg" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'
export default {
  name:'Header',
  data(){
    return {
    }
  },
  computed:{
    ...mapState({
      tagsList:state =>state.tab.tableList
    })
  },
  methods: {
    getbut(){
      this.$store.commit('getisCollapse')
    },
    handleCommand(command){
      if(command==='2'){
      Cookie.remove('token')
      localStorage.removeItem('menu')
      this.$router.push({name:'Login'})
      }
    }
  },
}
</script>
<style lang="less" scoped>
.header_left{
  background-color: #333;
  height:60px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  .r-cont{
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-cont{
    display: flex;
    align-items: center;
  /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner{
          font-weight: 400;
           &.is-link {
              color: #666 ;
           }
        }
        &:last-child{
           .el-breadcrumb__inner{
            color: #fff;
           }
        }
    }
    
  }
}
</style>