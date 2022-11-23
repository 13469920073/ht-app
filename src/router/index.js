import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes=[
    {
      path:'/',
      name:'Main',
      redirect:'/home',
      component:()=>import('../views/Main/index.vue'),
      children:[
        {
          path:'/home',
          name:'Home',
          component:()=>import('../views/Home/index.vue'),//首页
        },
        {
          path:'/mall',
          name:'Mall',
          component:()=>import('../views/Mall/index.vue'),//商品管理
        },
        {
          path:'/user',
          name:'User',
          component:()=>import('../views/User/index.vue'),//用户管理
        },
        {
          path:'/pageone',
          name:'PageOne',
          component:()=>import('../views/PageOne/index.vue'),//
        },
        {
          path:'/pagetwo',
          name:'PageTwo',
          component:()=>import('../views/PageTwo/index.vue'),//
        },
      ]
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import('../views/Login/index.vue'),
    }

]
const  router=new VueRouter({
  routes
})
export default router