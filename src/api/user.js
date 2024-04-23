import { request } from 'umi';
import { get, post } from '@/common/api'

// 获取 学生/老师 全部数据
export const getUserList = async (params) => {
  return request(params.isTeacher ? '/api/user/get/teacher' : '/api/user/get/student', {
    method: 'get',
  })
}

// 删除 学生/老师
export const deleteUser = async (params) => {
  return request(params.isTeacher ? '/api/user/delete/teaId' : '/api/user/delete/stuId', {
    method: 'post',
    params
  })
}

// 获取 学院 全部数据
export const getDepartList = async () => {
  return request('/api/user/depart', {
    method: 'get',
  })
}

// 创建 学院
export const addDepart = (parmas) => post('/api/user/depart/create', parmas)
// 删除 学院 
export const deleteDepart = (parmas) => post('/api/user/depart/delete', parmas)

// 获取 专业
export const getMajorList = (parmas) => post(`/api/user/major/departId=${parmas.departId}`, parmas)
// 创建 专业班级
export const addMajor = (parmas) => post('/api/user/major/create', parmas)
// 删除 专业
export const deleteMajor = (parmas) => post('/api/user/major/delete', parmas)

// 获取 班级
export const getClassList = async () => {
  return request('/api/user/class', {
    method: 'get',
  })
}
// 删除 班级
export const deleteClass = (parmas) => post('/api/user/class/delete', parmas)

// 获取 课程
export const getCourseList = async () => {
  return request('/api/user/course', {
    method: 'get',
  })
}