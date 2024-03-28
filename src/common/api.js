import { request } from 'umi';

export const get = async (url, params = {}, options = {}) => {
  return request(url, { method: 'GET', params, ...options })
    .catch((err) => {
      return Promise.reject(err?.info || err);
    })
    .finally(() => {
    });
};

export const post = async (url, data = {}, options = {}) => {
  return request(url, { method: 'POST', data, ...options })
    .catch((err) => {
      return Promise.reject(err?.info || err);
    })
    .finally(() => {
    });
};

export const put = async (url, data = {}, options = {}) => {
  return request(url, { method: 'PUT', data, ...options })
    .catch((err) => {
      return Promise.reject(err?.info || err);
    })
    .finally(() => {
    });
};

export default {
  get,
  post,
  put,
};
