import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 获取讨论列表
const getDiscussList = (req, res) => {
  pool.query('SELECT * FROM Discussion;', (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 获取指定的讨论列表
const getDiscussDetail = (req, res) => {
  const idDiscussion = req.params.idDiscussion;
  pool.query('SELECT * FROM discussion WHERE belongId = ?;', [idDiscussion], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
}
// 点赞
const changeLike = (req, res) => {
  const { idDiscussion, like } = req.params
  pool.query('UPDATE discussion SET `like` = `like` + ? WHERE idDiscussion = ?;', [like, idDiscussion], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 新建讨论
const newDiscuss = (req, res) => {
  const { idDiscussion, idCourse, replayId, belongId, DisName, title, content, material } = req.body
  const queryText = `
  INSERT INTO discussion (
    idDiscussion, idCourse, replayId, belongId, DisName, title, content, file
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
  )`;
  const values = [idDiscussion, idCourse, replayId, belongId, DisName, title, content, material];
  pool.query(queryText, values, (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '新建成功' };
      res.status(200).json(data);
    }
  })
}
// 回复
const replayDiscuss = (req, res) => {
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
}
// 查找讨论
const findDiscuss = (req, res) => {
  const { DisName } = req.body
  pool.query(`SELECT * FROM discussion WHERE DisName = ? and replayId = 0;`, [DisName], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}
// 搜索讨论
const SearchDiscuss = (req, res) => {
  const { title } = req.params
  pool.query(`SELECT * FROM discussion WHERE title LIKE ? and replayId = 0;`, [`%${title}%`], (err, rows) => {
    if (err) {
      console.error('Error querying database:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.json(rows)
    }
  })
}

const discussApi = {
  getDiscussList,
  getDiscussDetail,
  changeLike,
  newDiscuss,
  replayDiscuss,
  findDiscuss,
  SearchDiscuss
};

export { discussApi };