export * as storage from './storage'

// 讨论的数据处理
export const discussTrans = (data = []) => {
  const getReplies = (id) => {
    return data
      .filter((item) => item.replayId === id)
      .map((_item) => {
        return { ..._item, asList: getReplies(_item.idDiscussion) }
      })
  }

  const qsList = data.filter((item) => item.replayId === '0')
  const qsListWithAs = qsList.map((item) => {
    return { ...item, asList: getReplies(item.idDiscussion) }
  })
  return qsListWithAs
}

// 专业课程学院映射
export const createMap = (data, keyField, valueField) => {
  const map = new Map();
  data.forEach(item => {
    map.set(item[keyField], item[valueField]);
  });
  return map;
}