import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 教师获取作业列表
const getHomeworkList = (req, res) => {
  const { courseId } = req.query
  pool.query('SELECT * FROM Homework_Detail WHERE courseId = ?;', [courseId], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { data: rows, message: true, total: rows.length }
      res.status(200).json(data)
    }
  })
}

// 教师获取作业详情（含答案）
const getHomeworkDetail = (req, res) => {
  const { homework_id } = req.query
  pool.query('SELECT * FROM Homework_Detail WHERE homework_id = ?;', [homework_id], (err, rows1) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      pool.query('SELECT * FROM homework_selectquestion WHERE homework_id = ?;', [homework_id], (err, rows2) => {
        if (err) {
          console.error('Error querying database:', err)
          res.status(500).send('Internal Server Error')
        } else {
          pool.query('SELECT * FROM homework_shortquestion WHERE homework_id = ?;', [homework_id], (err, rows3) => {
            if (err) {
              console.error('Error querying database:', err)
              res.status(500).send('Internal Server Error')
            } else {
              const data = { data: rows1[0], select: rows2, short: rows3 }
              res.status(200).json(data)
            }
          })
        }
      })
    }
  })
}

// 教师获取学生作业详情
const getHomeworStudentFinish = (req, res) => {
  const { courseId, isFinish, isMark, stuId } = req.query;

  let query = 'SELECT * FROM Homework_Answer WHERE courseId = ? and isFinish = ?';
  let params = [courseId, isFinish];

  if (isMark) {
    query += ' and isMark = ?';
    params.push(isMark);
  }

  if (stuId) {
    query += ' and stuId = ?';
    params.push(stuId);
  }

  query += ';';

  pool.query(query, params, (err, rows1) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const data = { data: rows1, status: 200, msg: '查询成功' };
      res.status(200).json(data);
    }
  });
};

// 教师批改作业
const markHomework = (req, res) => {
  const { homework_id, stuId, markSelect, markShort, scoretotal, courseId, isFinish, isMark } = req.query
  const AnswerSql =
    `UPDATE homework_answer 
      SET  markSelect = ?,  markShort= ?, isFinish = ?, isMark = ?, scoretotal = ? 
      WHERE homework_id = ? and stuId = ? and courseId = ?;
    `
  const AnswerValues = [markSelect, markShort, isFinish, isMark, scoretotal, homework_id, stuId, courseId]
  pool.query(AnswerSql, AnswerValues, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '批改成功' }
      res.status(200).json(data)
    }
  })
}

// 学生获取作业详情（不含答案）
const getHomeworkDetailStudent = (req, res) => {
  const { homework_id } = req.query
  pool.query('SELECT * FROM Homework_Detail WHERE homework_id = ?;', [homework_id], (err, rows1) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      pool.query('SELECT id, question, option_A, option_B, option_C, option_D FROM homework_selectquestion WHERE homework_id = ?;', [homework_id], (err, rows2) => {
        if (err) {
          console.error('Error querying database:', err)
          res.status(500).send('Internal Server Error')
        } else {
          pool.query('SELECT id, question, file FROM homework_shortquestion WHERE homework_id = ?;', [homework_id], (err, rows3) => {
            if (err) {
              console.error('Error querying database:', err)
              res.status(500).send('Internal Server Error')
            } else {
              const data = { data: rows1[0], select: rows2, short: rows3 }
              res.status(200).json(data)
            }
          })
        }
      })
    }
  })
}

// 学生提交作业
const submitHomework = (req, res) => {
  const { homework_id, stuId, courseId, select, short, isFinish, isMark, title, finishDate } = req.query
  const AnswerSql =
    `INSERT INTO homework_answer 
      (homework_id, stuId, courseId, selectAnswer, shortAnswer, isFinish, isMark, title, finishDate) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
  const AnswerValues = [homework_id, stuId, courseId, select, short, isFinish, isMark, title, finishDate]
  pool.query(AnswerSql, AnswerValues, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '提交成功' }
      res.status(200).json(data)
    }
  })
}

// 教师创建作业
const createHomework = (req, res) => {
  const { id, teaId, courseId, title, description, date, select, short, select_score, short_score, status } = req.query
  const homeworkDetail =
    `INSERT INTO Homework_Detail 
      (homework_id, title, date_start, date_end, description, teaId, courseId, select_score, short_score, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
  const selectQuestion =
    `INSERT INTO homework_selectquestion
      (selectId, homework_id, question, option_A, option_B, option_C, option_D, answer) 
      VALUES ?;
    `
  const shortQuestion =
    `INSERT INTO homework_shortquestion
    (shortId, homework_id, question, answer, file) 
    VALUES ?;
  `
  const selectTrans = select.map(item => JSON.parse(item));
  const shortTrans = short.map(item => JSON.parse(item));
  const selectValues = selectTrans.map(item => [
    item.selectId,
    id,
    item.selectQusition,
    item.selectOption?.A,
    item.selectOption?.B,
    item.selectOption?.C,
    item.selectOption?.D,
    item.selectAnswer
  ]);
  const shortValues = shortTrans.map(item => [
    item.shortId,
    id,
    item.shortQuestion,
    item.shortAnswer,
    item.file
  ]);
  pool.query(homeworkDetail, [id, title, date[0], date[1], description, teaId, courseId, select_score, short_score, status], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      pool.query(selectQuestion, [selectValues], (err, rows) => {
        if (err) {
          console.error('Error querying database:', err)
          res.status(500).send('Internal Server Error')
        } else {
          pool.query(shortQuestion, [shortValues], (err, rows) => {
            if (err) {
              console.error('Error querying database:', err)
              res.status(500).send('Internal Server Error')
            } else {
              res.status(200).json({ status: 200, msg: '新建成功' })
            }
          })
        }
      })
    }

  })
}
// 学生完成作业，这里的逻辑是，老师发布完作业，有courseId的学生就都有作业，学生表加一个作业Id？

const homeworkApi = {
  getHomeworkList,
  getHomeworkDetail,
  getHomeworStudentFinish,
  markHomework,
  getHomeworkDetailStudent,
  submitHomework,
  createHomework
}

export { homeworkApi }