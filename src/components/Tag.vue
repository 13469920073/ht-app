<template>
  <div class="tabs">
     <el-tag
     size="small"
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name!=='Home'"
      :effect="$route.name==item.name?'dark':'plain'"
      @click="changeMenu(item)"
      @close="hanleclose(item,index)"
      >
      {{ item.label }}
   </el-tag>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex'

export default {
  name:'Tag',
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tableList
    })
  },
  methods:{
    ...mapMutations(['closeTag']),
    changeMenu(item){ //点击跳转
      this.$router.push({...item})
    },
    hanleclose(item,index){//  点击删除
     this.closeTag(item)
     // 所有的条数
     const length=this.tags.length
     // 删除之后的跳转逻辑
     if(item.name!==this.$route.name){
      return
     }
     // 表示的是删除的最后一项
     if(index===length){
      this.$router.push({name:this.tags[index-1].name})
     }else{
      this.$router.push({name:this.tags[index].name})
     }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>