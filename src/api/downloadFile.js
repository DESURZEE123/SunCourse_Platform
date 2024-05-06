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

// 获取资料数据
export const getMaterialData = async (params) => {
  return request('/api/material', {
    method: 'post',
    params
  })
}

// 上传资料数据
export const uploadMaterialData = async (params) => {
  return request('/api/material/upload', {
    method: 'post',
    params
  })
}