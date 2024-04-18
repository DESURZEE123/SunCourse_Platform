import { get, post } from '@/common/api'

// 获取 学生/老师 全部数据
export const getUserList = (parmas) => {
  if (parmas.isTeacher === 'true') post('/api/user/get/teacher', parmas)
  if (parmas.isTeacher === 'false') post('/api/user/get/student', parmas)
}
// 删除 学生/老师
export const deleteUser = (parmas) => {
  if (parmas.isTeacher) post(`/api/user/delete/teaId`, parmas)
  if (!parmas.isTeacher) post(`/api/user/delete/stuId`, parmas)
}

// 获取 学院 全部数据
export const getDepartList = () => get('/api/user/depart')
// 创建学院
export const addDepart = (parmas) => post('/api/user/depart/create', parmas)
// 删除 学院 
export const deleteDepart = (parmas) => post('/api/user/depart/delete', parmas)

// 获取专业
export const getMajorList = (parmas) => post(`/api/user/major/departId=${parmas.departId}`, parmas)