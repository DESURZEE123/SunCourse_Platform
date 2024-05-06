import { request } from 'umi';

// 获取树形结构
export const getTreeData = async (params) => {
  return request('/api/tree', {
    method: 'post',
    params
  })
}

// 改变树形结构
export const changeTreeData = async (params) => {
  return request('/api/tree/change', {
    method: 'post',
    params
  })
}

// 初始化树形结构
export const initTreeData = async (params) => {
  return request('/api/tree/init', {
    method: 'post',
    params
  })
}