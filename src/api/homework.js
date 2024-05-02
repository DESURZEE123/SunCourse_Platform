import { request } from 'umi';

// 教师获取作业列表，使用courseId查询（目前学生作业查询也用的这个接口）
// 大不了，提交作业之后，不可以再查看作业详情
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

// 教师获取学生作业详情
export const getHomeworStudentFinish = async (params) => {
  return request('/api/homework/detail/student/finish', {
    method: 'post',
    params
  })
}

// 教师批改作业
export const markHomework = async (params) => {
  return request('/api/homework/mark', {
    method: 'post',
    params
  })
}

// 学生获取作业详情（不含答案）
export const getHomeworkDetailStudent = async (params) => {
  return request('/api/homework/detail/student', {
    method: 'post',
    params
  })
}

// 学生提交作业
export const submitHomework = async (params) => {
  return request('/api/homework/submit', {
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