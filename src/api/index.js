import  http from '../utils/request'
export const getData=()=>{// 首页数据
    return http.get('/home/getData')
}
export const getInfo=(data)=>{// 个人数据
  return http.post('/home/getInfo',data)
}

export const getUser=(params)=>{
  console.log(params,'---')
  return http.get('/user/getUser',params)
}
export const Useradd=(data)=>{ //新增
  return http.post('/user/add',data)
}
export const Useredit=(data)=>{
  return http.post('/user/edit',data)
}
export const Userdel=(data)=>{
  return http.post('/user/del',data)
}
export const MoveUser=(data)=>{
  return http.post('/user/moveUser',data)
}
//登录
export const getMenu=(data)=>{
  return http.post('/permission/getMenu',data)
}