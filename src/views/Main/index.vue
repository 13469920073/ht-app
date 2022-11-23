<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Left/>
      </el-aside>
   <el-container>
    <el-header style="padding:0px">
        <Header/>
    </el-header>
         <Tag/>
    <el-main>
      <router-view></router-view>
    </el-main>
   </el-container>
    </el-container>
  </div>
</template>
<script>
import Left from '../../components/Left.vue'
import Header from '../../components/Header.vue'
import Tag from '../../components/Tag.vue'

export default {
  name:'Main',
  data(){
    return {

    }
  },
  components:{
    Left,
    Header,
    Tag
  }
}
</script>