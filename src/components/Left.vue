<template >
  <div>
    <el-menu 
    default-active="1-4-1"
     class="el-menu-vertical-demo"
     @open="handleOpen"
     @close="handleClose"
     :collapse="isCollapse"  
     background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3> {{!isCollapse?'通用后台管理系统':'后台'}}</h3>
     <el-menu-item @click="getMenu(item)" :index="item.name" v-for="item in OneChildren" :key="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu :index="item.icon" v-for="item in TwoChildren" :key="item.icon">
        <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group  v-for="val in item.children" :key="val.name" >
             <el-menu-item @click="getMenu(val)" :index="val.name">{{val.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
 </div>
</template>

<script>

  export default {
    data() {
      return {
        menuData:[]
        
      };
    },
    created() {
     
      this.menuData=localStorage.getItem('menu')?JSON.parse(localStorage.getItem('menu')) : this.$store.state.tab.menu
    },
    computed:{
      OneChildren(){
        return this.menuData.filter(item=>{
          return !item.children
        })
      },
      TwoChildren(){
        return this.menuData.filter(item=>{
          return item.children
        })
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getMenu(item){
        // 在同一页面就不需要跳转
        if(this.$route.path!==item.path&&!(this.$route.path==='/home'&&item.path==='/')){
          this.$router.push({
          path:item.path
        })
        }
        // 点击左侧修改 面包屑
        this.$store.commit('setdropdown',item)
      },
   
    }
  }
</script>
<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100vh;
    border-right: none;
    h3{
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
      font-style:400 ;
    }
  }
</style>