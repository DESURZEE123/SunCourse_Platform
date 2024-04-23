import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 老师信息
const getTeacherList = (req, res) => {
  pool.query('SELECT * FROM Teacher;', (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { data: rows, message: true, total: rows.length }
      res.status(200).json(data)
    }
  })
}

// 学生信息
const getStudentList = (req, res) => {
  pool.query('SELECT * FROM Student;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { data: rows, message: true, total: rows.length }
      res.status(200).json(data)
    }
  })
}
// 删除老师
const deleteTeacher = (req, res) => {
  const { Id } = req.query
  pool.query('UPDATE course SET teaId = NULL WHERE teaId = ?;', [Id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      pool.query('DELETE FROM Teacher WHERE teaId = ?;', [Id], (err, rows) => {
        if (err) {
          console.error('Error querying database:', err)
          res.status(500).send('Internal Server Error')
        } else {
          const data = { status: 200, msg: '删除成功' }
          res.status(200).json(data)
        }
      })
    }
  })
}
// 删除学生
const deleteStudent = (req, res) => {
  const { Id } = req.query
  pool.query('DELETE FROM Student WHERE stuId = ?;', [Id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { status: 200, msg: '删除成功' };
      res.status(200).json(data);
    }
  });
};
// 获取 学院 全部数据
const getDepartList = (req, res) => {
  pool.query('SELECT * FROM Department;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows)
    }
  });
};


const userApi = {
  getTeacherList,
  getStudentList,
  deleteTeacher,
  deleteStudent,
  getDepartList,
  // addDepart,
  // deleteDepart,
  // getMajorList,
  // addMajor,
  // deleteMajor,
  // deleteClass,
}

export { userApi }