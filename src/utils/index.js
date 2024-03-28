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
