import { request } from 'umi';

// 教师获取作业列表
export const getHomeworkList = async (params) => {
  return request('/api/homework/get', {
    method: 'post',
    params
  })
}

// 教师获取作业详情（含答案）
export const getHomeworkDetail = async (params) => {
  return request('/api/homework/detail', {
    method: 'post',
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