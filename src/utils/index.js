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

// 专业和班级的对应Options
export const ClassOptionTrans = (majorData, classData, departId) => {
  const majIdToName = majorData.reduce((acc, item) => {
    acc[item.majId] = item.name;
    return acc;
  }, {});
  const options = classData.filter(item => item.departId === departId).reduce((acc, item) => {
    const majIndex = acc.findIndex(option => option.value === item.majId);
    if (majIndex === -1) {
      acc.push({
        value: item.majId,
        label: majIdToName[item.majId] || '未知',
        children: [
          {
            value: item.classId,
            label: item.name
          }
        ]
      });
    } else {
      acc[majIndex].children.push({
        value: item.classId,
        label: item.name
      });
    }
    return acc;
  }, []);
  return options
}

