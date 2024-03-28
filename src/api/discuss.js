import { get, post } from '@/common/api'

// 获取讨论列表
export const getDiscussList = () => get('/api/discuss')
// 获取指定的讨论列表
export const getDiscussDetail = (parmas) => post(`/api/discuss/detail/idDiscussion=${parmas.idDiscussion}`, parmas)
// 点赞
export const changeLike = (parmas) => post(`/api/discuss/like/idDiscussion=${parmas.idDiscussion}&like=${parmas.like}`, parmas)
// 新建讨论
export const newDiscuss = (parmas) => post(`/api/discuss/new`, parmas)
// 回复
export const replayDiscuss = (parmas) => post(`/api/discuss/replay`, parmas)
// 查找讨论
export const findDiscuss = (params) => post(`/api/discuss/id=${params.id}`, params)
// 搜索讨论
export const SearchDiscuss = (params) => post(`/api/discuss/search/title=${params.title}`, params)

