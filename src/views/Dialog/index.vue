<template>
  <div>
    <el-dialog
      :title="titleValue==='add'?'新增信息':'修改信息'"
      :visible.sync="dialogVisible"
       width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" :inline="true" :rules="rules">
       <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"  placeholder="请输入姓名"></el-input>
       </el-form-item>
       <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
       </el-form-item>
          <el-form-item label="性别"   prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option v-for="item in sexList" :label="item.label" :value="item.value" :key="item.balue"></el-option>
          </el-select>
       </el-form-item>
        <el-form-item label="出生日期" prop="birth" >
          <el-form-item >
            <el-date-picker type="date" placeholder="请选择日期" v-model="form.birth" value-format="yyyy-MM-DD" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
         <el-form-item label="地址"  prop="addr" >
        <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
       </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
    <div class="disflex">
      <el-button @click="getadd" type="primary">新增</el-button>
      <el-form ref="formValue" :model="formValue" label-width="100px"  :inline="true">
          <el-form-item label="" prop="name" style="display: flex;">
            <el-input v-model="formValue.name" placeholder="请输入名称"></el-input>
            <el-button @click="query()" type="primary" style="margin-left:15px">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%" height="630">
        <el-table-column
          v-for="(item,index) in tableList" :key="index" :prop="item.value" :label="item.label"  :min-width="item.width">
             <template slot-scope="scope">
                <span v-if="item.value==='sex'">{{scope.row[item.value]==1?'男':(scope.row[item.value]===0?'女':'')}}</span>
               <span v-else>{{scope.row[item.value]}}</span>
             </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="scope">
         <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <div class="footer">
      <el-pagination
        background
        :page-size="pageSize"
        :page-sizes="[10]"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
        >
    </el-pagination>
    </div>
  </div>
</template>
<script>
import {getUser,Useredit,Useradd,Userdel} from '../../api/index'
export default {
  name:'Dialog',
  data(){
    return{
      dialogVisible:false,
      titleValue:'add',
      form:{
        name:'',
        age:'',
        sex:'',
        birth:'',
        addr:'',      
      },
      formValue:{
        name:''
      },
      sexList:[{label:'男',value:1},{label:'女',value:0}],
      rules:{
           name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
           age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birth: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
      },
      tableData:[],
      tableList:[
        {label:'姓名',value:'name',width:'120px'},
        {label:'年龄',value:'age',width:'120px'},
        {label:'性别',value:'sex',width:'120px'},
        {label:'出生日期',value:'birth',width:'120px'},
        {label:'地址',value:'addr',width:'180px'},
      ],
      total:0,//总条数
      page:1,//页数
      pageSize:11//每一页的条数
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
     getUser({params:{...this.formValue,page:this.page,limit:this.pageSize}}).then(res=>{
      if(res.data.list&&res.data.list.length){
       this.tableData= res.data.list
        this.total=res.data.count?res.data.count:0
      }
     })
    },
    geyvalue(item){
      console.log(item)
    },
    handleClose(){
      this.$refs.form.resetFields();
      this.dialogVisible=false
     
    },
    handleOk(){
    this.$refs.form.validate((valid)=>{
      if (valid) {
          this.dialogVisible=false
          if(this.titleValue==='add'){// 新增
              Useradd({...this.form}).then(res=>{
                  this.getList()
                  this.$refs.form.resetFields();
              })
          } else{ //修改
              Useredit({...this.form}).then(res=>{
                  this.getList()
                  this.$refs.form.resetFields();
              })
          }
       }
    })
    },
    getadd(){
    this.titleValue='add'
    this.dialogVisible=true
    },
    // 编辑
    handleEdit(index,item){
      this.titleValue='Edit'
      this.dialogVisible=true
      this.form=Object.assign({},item)
    },
    // 删除
    handleDelete(index,item){
        this.$confirm('您确认要继续删除吗？', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            Userdel({...item}).then(res=>{
              this.getList()
              this.$message({
                  type: 'success',
                  message: '删除成功'
                });
            })
           
          })
          .catch(action => {
            this.$message({
              type: 'info',
               message: '取消删除'
            })
          });
    },
    //切换分页
    currentChange(val){
      this.page=val
      this.getList()
    },
    //列表查询
    query(){
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner{
  width: 270px !important;
}
.footer{
    padding-top: 30px;
    padding-right: 80px;
    text-align: right;
}
/deep/.disflex{
  display: flex;
  height:40px;
  justify-content: space-between;
  .el-form--inline .el-form-item__content{
    display: flex;
  }
}
</style>