const tab = {
  state: {
    isCollapse: false, //控制左侧字段的收起,
    menu: [],//菜单
    //  面包屑
    tableList: [
      {
        path: '/',
        name: 'Home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ]
  },
  mutations: {
    //控制左侧字段的fangfa
    getisCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    //
    setdropdown(state, val) {
      console.log(val)
      // 判断是否是首页
      if (val.name !== 'Home') {
        // 判断是否存在
        const Index = state.tableList.some(item => { return item.name === val.name })
        // 不存在
        if (Index === false) {
          state.tableList.push(val)
        }
      }
    },
    // 删除指定的tag数据
    closeTag(state, item) {
      const Index = state.tableList.findIndex(val => val.name === item.name)
      state.tableList.splice(Index, 1)
    },
    //设置menu数据
    setMenu(state, list) {
      state.menu = list
      localStorage.setItem('menu', JSON.stringify(list))
    },
    //动态注册路由
    addMenu(state, router) {
      // 缓存中没有
      if (!localStorage.getItem('menu')) return
      // 缓存中有数据
      let Menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = Menu
      let Arry = []
      Menu.map(item => {
        if (item.children && item.children.length) {
          item.children.map(val => {
            val.component = () => import(`../views/${val.name}/index.vue`)
          })
          Arry.push(...item.children)
        } else {
          item.component = () => import(`../views/${val.name}/index.vue`)
          Arry.push(item)
        }
      })
      console.log(Arry, router)
      router.addRoutes([
        {
          path:'/',
          name:'Main',
          redirect:'/home',
          component:()=>import('../views/Main/index.vue'),
          children:Arry
        }
      ])
      // Arry.map(item => {
      //   router.addRoutes('Main', item)
      // })

    }
  }




}

export default tab