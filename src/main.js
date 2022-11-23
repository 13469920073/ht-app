import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store/index.js'
import App from './App.vue'
import './api/mock.js'
import Cookie from 'js-cookie'

Vue.config.productionTip=false
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局路由守卫
router.beforeEach((to,form,next)=>{
  //判断token是否存在
   const token=Cookie.get('token')
   if(!token&&to.name!=='Login'){ // 不存在
    next({name:'Login'})
   }else if(token&&to.name==='Login'){//存在
    next({name:'Home'})
   }else{
    next()
   }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
