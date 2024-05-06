import mysql from 'mysql'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '150029389wyy',
  database: 'platform_schema',
  connectionLimit: 10 // 连接池最大连接数
})

// 获取树形结构
const getTreeData = (req, res) => {
  const { courseId } = req.query
  pool.query('SELECT * FROM Treedata where courseId = ?;', [courseId], (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { data: rows[0], status: 200 }
      res.status(200).json(data)
    }
  })
}

// 改变树形结构
const changeTreeData = (req, res) => {
  const { courseId, treeContent } = req.query
  pool.query('UPDATE Treedata SET treeContent = ? WHERE courseId = ?;', [treeContent, courseId], (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '修改成功' }
      res.status(200).json(data)
    }
  })
}

// 初始化树形结构
const initTreeData = (req, res) => {
  const { courseId, treeData } = req.query
  pool.query('INSERT INTO Treedata (courseId, treeContent) VALUES (?, ?);', [courseId, treeData], (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '初始化成功' }
      res.status(200).json(data)
    }
  })
}

// 获取资料数据
const getMaterialData = (req, res) => {
  const { courseId } = req.query
  pool.query('SELECT * FROM DownloadFile where courseId = ?;', [courseId], (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { data: rows, status: 200 }
      res.status(200).json(data)
    }
  })
}

// 上传资料数据
const uploadMaterialData = (req, res) => {
  const { courseId, file, name, selectedId } = req.query
  pool.query('INSERT INTO DownloadFile (courseId, file, name, selectedId) VALUES (?, ?, ?, ?);', [courseId, file, name, selectedId], (err, rows) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      const data = { status: 200, msg: '上传成功' }
      res.status(200).json(data)
    }
  })
}

const downLoadApi = {
  getTreeData,
  changeTreeData,
  initTreeData,
  getMaterialData,
  uploadMaterialData
}

export { downLoadApi }