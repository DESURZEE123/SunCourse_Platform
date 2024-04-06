import { discussApi } from './detail/discussion.js';
// const  getDiscussionDetail  = require('./detail/discussion.js');
// const http = require('http');//用于搭建服务器
import express from 'express';

// const express = require('express')
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

// 获取讨论列表
app.get('/discuss',discussApi.getDiscussList)

// 获取讨论详情
app.post('/discuss/detail/idDiscussion=:idDiscussion', discussApi.getDiscussDetail);

// 讨论点赞
app.post('/discuss/like/idDiscussion=:idDiscussion&like=:like', discussApi.changeLike)

// 新建讨论
app.post('/discuss/new',discussApi.newDiscuss)

// 回复
app.post('/discuss/replay', discussApi.replayDiscuss)

// 查找讨论
app.post('/discuss/id=:id', discussApi.findDiscuss)

// 查找讨论，有bug，应该查询出对应IdDiscuss，再去查找；否则会不显示回复数量
app.post('/discuss/search/title=:title',discussApi.SearchDiscuss )

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
