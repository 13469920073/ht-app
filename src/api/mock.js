import Mock from 'mockjs'
import homeapi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 1.定义mock请求拦截
Mock.mock('/api/home/getData','get',homeapi.getStatisticalData)
Mock.mock('/api/home/getInfo','post',homeapi.getInformation)


// 2. 定义用户列表数据
Mock.mock('/api/user/add','post',user.createUser) //新增
Mock.mock('/api/user/edit','post',user.updateUser) //修改
Mock.mock('/api/user/del','post',user.deleteUser) //删除
Mock.mock(/api\/user\/getUser/,'get',user.getUserList) //返回列表数据
Mock.mock('/api/user/moveUser','post',user.batchremove) //批量删除

// 登录
Mock.mock('/api/permission/getMenu','post',permission.getMenu) //批量删除




