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
      const data = { data: rows, message: true, total: rows.length }
      res.status(200).json(data)
    }
  });
};

// 删除学院
const deleteDepart = (req, res) => {
  const { departId } = req.query
  pool.query('DELETE FROM Department WHERE departId = ?;', [departId], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { status: 200, msg: '删除成功' };
      res.status(200).json(data);
    }
  });
};

// 获取 课程
const getCourseList = (req, res) => {
  pool.query('SELECT * FROM Course;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { data: rows, message: true, total: rows.length }
      res.status(200).json(data)
    }
  });
};

// 搜索课程
const searchCourse = (req, res) => {
  const { searchValue } = req.query
  pool.query('SELECT * FROM Course WHERE name LIKE ?;', [`%${searchValue}%`], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows)
    }
  });
}

// 学生添加课程
const addCourse = (req, res) => {
  const { courseIdsList, Id } = req.query
  pool.query('UPDATE Student SET courseId = ? WHERE stuId = ?;', [courseIdsList, Id], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { status: 200, msg: '添加成功' };
      res.status(200).json(data);
    }
  });
};

// 删除 课程
const deleteCourse = (req, res) => {
  const { courseId } = req.query
  pool.query('DELETE FROM Course WHERE courseId = ?;', [courseId], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { status: 200, msg: '删除成功' };
      res.status(200).json(data);
    }
  });
};

// 获取 班级
const getClassList = (req, res) => {
  pool.query('SELECT * FROM Class;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows)
    }
  });
};

// 获取 专业
const getMajorList = (req, res) => {
  const { departId } = req.query
  pool.query('SELECT * FROM Major WHERE departId = ?;', [departId], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows)
    }
  });
}

const userApi = {
  getTeacherList,
  getStudentList,
  getDepartList,
  getCourseList,
  getClassList,
  getMajorList,
  deleteTeacher,
  deleteStudent,
  deleteCourse,
  deleteDepart,
  addCourse,
  searchCourse,
  // addDepart,
  // addMajor,
  // deleteMajor,
  // deleteClass,
}

export { userApi }