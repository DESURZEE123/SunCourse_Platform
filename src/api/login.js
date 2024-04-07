import { get, post } from '@/common/api'

// 登录以及注册
/* 这里应该做token处理，暂时搁浅 */
export const login = (parmas) => {
  if (parmas.isTeacher) post('/api/user/login/teacher', parmas)
  if (!parmas.isTeacher) post('/api/user/login/student', parmas)
}
// 登录
export const registerApi = (parmas) => {
  if (parmas.isTeacher) post('/api/user/register/teacher', parmas)
  if (!parmas.isTeacher) post('/api/user/register/student', parmas)
}