import { request } from 'umi';
import { get, post } from '@/common/api'

// 登录
/* 这里应该做token处理，暂时搁浅 */
export const login = async (params) => {
  return request(params.isTeacher ? '/api/user/login/teacher' : '/api/user/login/student', {
    method: 'post',
    params
  })
}
// 注册
export const registerApi = async (params) => {
  return request(params.isTeacher ? '/api/user/register/teacher' : '/api/user/register/student', {
    method: 'post',
    params
  })
}
// 创建课程
export const createCourse = (parmas) => post('/api/user/course/create', parmas)

// 获取全部课程
export const getCourseList = async () => {
  return request('/api/get/user/course', {
    method: 'get',
  })
}