<template>
  <div class="Box_login">
    <el-form ref="form" :model="form" label-width="70px" :rules="rules" >
      <h3 style="text-align:center">系统登录</h3>
       <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"  placeholder="请输入用户名" clearable></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
       </el-form-item>
    </el-form>
    <div style="width:100%;text-align:center" class="login_A">
      <el-button type="primary" @click="handleOk">登录</el-button>
      <span @click="getcode" class="login_B">扫一扫</span>
      <div  id="qrcode" ref="qrcode" class="login_C"></div>
      <span v-if="Flag" class="login_D" @click="getLogin">x</span>
    </div>
  </div>
</template>
<script>
import QRcode from 'qrcodejs2'
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../../api/index'
export default {
  name:'Login',
  data(){
    return{
        form:{
          username:'',
          password:''
        },
        Flag:false,
        rules:{
           username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
   }
  },
  methods: {
    handleOk(){
        this.$refs.form.validate((valid)=>{
          if (valid) {
            getMenu({...this.form}).then(res=>{
              console.log(res)
              if(res.data.code===20000){
                //菜单存入vuex
                this.$store.commit('setMenu',res.data.data.menu)
                this.$store.commit('addMenu',this.$router)
                 // 利用mock创建
                const token=Mock.Random.guid()
                // 将token存入Cookie
                Cookie.set('token',token)
                this.$router.push({name:'Home'})
              }else{
                 this.$message.error(res.data.data.message);
              }
            })        
         }
       })
    },
    getcode(){
      this.Flag=true
      this.$refs.qrcode.innerHTML=''
       new QRcode('qrcode',{
        width:100,
        height:100,
        text:'https://www.baidu.com/',
        colorDark: '#000000', //前景色   
        colorLight: '#ffffff', //后景色    
      })
    },
    getLogin(){
      this.$refs.qrcode.innerHTML=''
      this.Flag=false
    }
  },
}
</script>
<style lang="less" scope>
  .Box_login{
    width:350px;
    border:1px solid #eaeaea;
    margin:220px auto;
    padding:15px 35px 25px 35px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_A{
    position:relative ;
    .login_B{
      position:absolute ;
      top:10px;
      right:10px;
      font-size:14px;
    }
    .login_C{
      position:absolute ;
      top:-125px;
      right:36%;
      
    }
    .login_D{
      position:absolute ;
      top:-140px;
      right:31%;
      border: 1px solid #ccc;
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 12px;
    }
    
  }
</style>