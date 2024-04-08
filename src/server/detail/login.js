import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 老师登录
const loginTeacher = (req, res) => {
  const { teaId, password } = req.body
  pool.query('SELECT * FROM Teacher WHERE teaId = ? and password = ?;', [parseInt(teaId), password], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '登录成功' }
      console.log(data, '~~~~~~~~~~~~~~~');
      res.status(200).json(
        data
      )
      // res.json(rows)
    }
  })
}
// 学生登录
const loginStudent = (req, res) => {
  const { stuId, password } = req.body
  pool.query('SELECT * FROM Student WHERE stuId = ? and password = ?;', [parseInt(stuId), password], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 老师注册
const registerTeacher = (req, res) => {
  const { stuId, password } = req.body
  pool.query('SELECT * FROM Teacher WHERE stuId = ? and password = ?;', [teaId, password], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 学生注册
const registerStudent = (req, res) => {
  const { stuId, password } = req.body
  pool.query('SELECT * FROM Student WHERE stuId = ? and password = ?;', [teaId, password], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 创建课程
const createCourse = (req, res) => {
  const { courseId, name, teaId, classId, departId, content } = req.body
  const queryText = `
  INSERT INTO course (
    courseId, name, teaId, classId, departId, content
  ) VALUES (
    ?, ?, ?, ?, ?, ?
  )`;
  const values = [courseId, name, teaId, classId, departId, content];

  pool.query(queryText, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}

const loginApi = {
  loginTeacher,
  loginStudent,
  registerTeacher,
  registerStudent,
  createCourse
}

export { loginApi }