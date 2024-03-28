// const http = require('http');//用于搭建服务器
const express = require('express')
const mysql = require('mysql')
const app = express()

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

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
app.get('/discuss', (req, res) => {
  pool.query('SELECT * FROM Discussion;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})

// 获取讨论详情
app.post('/discuss/detail/idDiscussion=:idDiscussion', (req, res) => {
  pool.query('SELECT * FROM discussion WHERE belongId = ?;', [req.params.idDiscussion], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})

// 讨论点赞
app.post('/discuss/like/idDiscussion=:idDiscussion&like=:like', (req, res) => {
  const { idDiscussion, like } = req.params
  pool.query('UPDATE discussion SET `like` = `like` + ? WHERE idDiscussion = ?;', [like, idDiscussion], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})

// 新建讨论
app.post('/discuss/new', (req, res) => {
  const { idDiscussion, idCourse, replayId, belongId, DisName, title, content } = req.body
  const queryText = `
  INSERT INTO discussion (
    idDiscussion, idCourse, replayId, belongId, DisName, title, content
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?
  )`;
  const values = [idDiscussion, idCourse, replayId, belongId, DisName, title, content];
  
  pool.query(queryText, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})

// 回复
app.post('/discuss/replay', (req, res) => {
  const { idDiscussion, idCourse, replayId, belongId, DisName, title, content } = req.body
  const queryText = `
  INSERT INTO discussion (
    idDiscussion, idCourse, replayId, belongId, DisName, title, content
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?
  )`;
  const values = [idDiscussion, idCourse, replayId, belongId, DisName, title, content];
  
  pool.query(queryText, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.status(200).send('回复成功')
      // res.json(rows)
    }
  })
})

// 查找讨论
app.post('/discuss/id=:id', (req, res) => {
  const { id } = req.params
  pool.query(`SELECT * FROM discussion WHERE id = ? and replayId = 0;`, [id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})


// 查找讨论，有bug，应该查询出对应IdDiscuss，再去查找；否则会不显示回复数量
app.post('/discuss/search/title=:title', (req, res) => {
  const { title } = req.params
  console.log(title);
  pool.query(`SELECT * FROM discussion WHERE title LIKE ? and replayId = 0;`, [`%${title}%`], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
