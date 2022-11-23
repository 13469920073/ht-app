import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'mahao' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'Home',
              label: '首页',
              icon: 's-home',
              url: 'Home/Home'
            },
            {
              path: '/mall',
              name: 'Mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'MallManage/MallManage'
            },
            {
              path: '/user',
              name: 'User',
              label: '用户管理',
              icon: 'user',
              url: 'UserManage/UserManage'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/pageone',
                  name: 'PageOne',
                  label: '1',
                  icon: 'goblet-square-full',
                  url: 'Other/PageOne'
                },
                {
                  path: '/pagetwo',
                  name: 'PageTwo',
                  label: '2',
                  icon: 'goblet-square-full',
                  url: 'Other/PageTwo'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'wangjiaxin' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'Home',
              label: '首页',
              icon: 's-home',
              url: 'Home/Home'
            },
            {
              path: '/mall',
              name: 'Mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'MallManage/MallManage'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}