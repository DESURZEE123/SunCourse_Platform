import { request } from 'umi';

// 获取作业列表
export const getHomeworkList = async (params) => {
  return request('/api/homework/get', {
    method: 'get',
    params
  })
}

// 教师创建作业
export const createHomework = async (params) => {
  return request('/api/homework/create', {
    method: 'post',
    params
  })
}

// 学生完成作业
export const finishHomework = async (params) => {
  return request('/api/homework/finish', {
    method: 'post',
    params
  })
}