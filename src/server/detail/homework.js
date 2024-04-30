import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 教师创建作业
const createHomework = (req, res) => {
  const { id, teaId, courseId, title, description, date, select, short } = req.query
  const homeworkDetail =
    `INSERT INTO Homework_Detail 
      (id, title, date_start, date_end, description, teaId, courseId) 
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `
  const selectQuestion =
    `INSERT INTO homework_selectquestion
      (selectId, homework_id, question, option_A, option_B, option_C, option_D, answer) 
      VALUES ?;
    `
  const shortQuestion =
  `INSERT INTO homework_shortquestion
    (shortId, homework_id, question, answer) 
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
    item.shortAnswer
  ]);
  pool.query(homeworkDetail, [id, title, date[0], date[1], description, teaId, courseId], (err, rows) => {
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
  createHomework
}

export { homeworkApi }