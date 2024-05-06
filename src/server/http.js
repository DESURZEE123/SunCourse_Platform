import { discussApi } from './detail/discussion.js';
import { loginApi } from './detail/login.js';
import { userApi } from './detail/user.js';
import { homeworkApi } from './detail/homework.js';
import { downLoadApi } from './detail/downloadFile.js';
// const http = require('http');//用于搭建服务器
import express from 'express';

// const mysql = require('mysql')
const app = express()

app.use(express.json());

//设置跨域访问  
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 登录
app.post('/user/login/teacher', loginApi.loginTeacher)
app.post('/user/login/student', loginApi.loginStudent)

// 注册
app.post('/user/register/teacher', loginApi.registerTeacher)
app.post('/user/register/student', loginApi.registerStudent)

// 获取个人信息
app.post('/user/detail/teacher', loginApi.getTeacherInfo)
app.post('/user/detail/student', loginApi.getStudentInfo)

// 获取老师 全部数据
app.get('/user/get/teacher', userApi.getTeacherList)
// 获取学生 全部数据
app.get('/user/get/student', userApi.getStudentList)
// 删除老师
app.post('/user/delete/teaId', userApi.deleteTeacher)
// 删除学生
app.post('/user/delete/stuId', userApi.deleteStudent)
// 获取学院 全部数据
app.get('/user/depart', userApi.getDepartList)
// // 创建学院
// app.post('/user/depart/create', userApi.addDepart)
// // 删除学院
// app.post('/user/depart/delete', userApi.deleteDepart)
// // 获取专业
app.post('/user/major/departId=:departId', userApi.getMajorList)
// // 创建专业班级
// app.post('/user/major/create', userApi.addMajor)
// // 删除专业
// app.post('/user/major/delete', userApi.deleteMajor)
// 获取班级
app.get('/user/class', userApi.getClassList)
// // 删除班级
// app.post('/user/class/delete', userApi.deleteClass)
// 搜索课程
app.post('/user/course/search', userApi.searchCourse)
// 学生添加课程
app.post('/user/course/add', userApi.addCourse)
// 创建课程
app.post('/user/course/create', userApi.createCourse)
// 删除课程
app.post('/user/course/delete', userApi.deleteCourse)
// 获取课程
app.get('/user/course', userApi.getCourseList)

// 获取讨论列表
app.get('/discuss', discussApi.getDiscussList)

// 获取讨论详情
app.post('/discuss/detail/idDiscussion=:idDiscussion', discussApi.getDiscussDetail);
// 讨论点赞
app.post('/discuss/like/idDiscussion=:idDiscussion&like=:like', discussApi.changeLike)
// 新建讨论
app.post('/discuss/new', discussApi.newDiscuss)
// 回复
app.post('/discuss/replay', discussApi.replayDiscuss)
// 查找讨论
app.post('/discuss/my', discussApi.findDiscuss)
// 查找讨论，有bug，应该查询出对应IdDiscuss，再去查找；否则会不显示回复数量
app.post('/discuss/search/title=:title', discussApi.SearchDiscuss)

// 教师获取作业列表
app.post('/homework/get', homeworkApi.getHomeworkList)
// 教师获取作业详情（含答案）
app.post('/homework/detail', homeworkApi.getHomeworkDetail)
// 教师获取学生作业详情
app.post('/homework/detail/student/finish', homeworkApi.getHomeworStudentFinish)
// 教师批改作业
app.post('/homework/mark', homeworkApi.markHomework)
// 学生获取作业详情（不含答案）
app.post('/homework/detail/student', homeworkApi.getHomeworkDetailStudent)
// 学生提交作业
app.post('/homework/submit', homeworkApi.submitHomework)
// 教师创建作业
app.post('/homework/create', homeworkApi.createHomework)

// 获取树形结构
app.post('/tree', downLoadApi.getTreeData)
// 改变树形结构
app.post('/tree/change', downLoadApi.changeTreeData)
// 初始化树形结构
app.post('/tree/init', downLoadApi.initTreeData)
// 获取资料数据
app.post('/material', downLoadApi.getMaterialData)
// 上传资料数据
app.post('/material/upload', downLoadApi.uploadMaterialData)
const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
