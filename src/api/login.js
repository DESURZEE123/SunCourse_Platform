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

// 获取个人信息
export const getUserInfoDetail = async (params) => {
  return request(params.isTeacher ? '/api/user/detail/teacher' : '/api/user/detail/student', {
    method: 'post',
    params
  })
}
