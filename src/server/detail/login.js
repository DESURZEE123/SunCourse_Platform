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
  const { teaId, password } = req.query
  pool.query('SELECT * FROM Teacher WHERE teaId = ? and password = ?;', [parseInt(teaId), password], (err, rows) => {
    if (rows.length === 0) {
      const data = { status: 404, msg: '账号或密码错误' };
      res.status(200).json(data)
    } else {
      const data = { status: 200, msg: '登录成功' };
      res.status(200).json(data);
    }
  })
}
// 学生登录
const loginStudent = (req, res) => {
  const { stuId, password } = req.query
  pool.query('SELECT * FROM Student WHERE stuId = ? and password = ?;', [parseInt(stuId), password], (err, rows) => {
    if (rows.length === 0) {
      const data = { status: 404, msg: '账号或密码错误' };
      res.status(200).json(data)
    } else {
      const data = { status: 200, msg: '登录成功' };
      res.status(200).json(data);
    }
  })
}
// 老师注册
const registerTeacher = (req, res) => {
  const { Id, name, departId, password } = req.query
  const sql = `INSERT INTO Teacher (teaId, name, departId, password ) VALUES (?, ?, ?, ?)`;
  const values = [Id, name, departId, password];
  pool.query(sql, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '注册成功', Id: Id };
      res.status(200).json(data)
    }
  })
}
// 学生注册
const registerStudent = (req, res) => {
  const { Id, name, classValue, password, classId, departId, courseId } = req.query
  const sql = `INSERT INTO Student
    (StuId, name, class, password, classId, departId, courseId ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [Id, name, classValue, password, classId, departId, courseId];

  pool.query(sql, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '注册成功', Id: Id };
      res.status(200).json(data)
    }
  })
}
// 获取教师个人信息
const getTeacherInfo = (req, res) => {
  const { Id } = req.query
  pool.query('SELECT * FROM Teacher WHERE teaId = ?;', [Id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, data: { ...rows[0], Id: rows[0].teaId } };
      res.status(200).json(data);
    }
  })
}
// 获取学生个人信息
const getStudentInfo = (req, res) => {
  const { Id } = req.query
  pool.query('SELECT * FROM Student WHERE stuId = ?;', [Id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, data: { ...rows[0], Id: rows[0]?.stuId } };
      res.status(200).json(data);
    }
  })
}

const loginApi = {
  loginTeacher,
  loginStudent,
  registerTeacher,
  registerStudent,
  getTeacherInfo,
  getStudentInfo,
}

export { loginApi }