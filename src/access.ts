export default (initialState: API.UserInfo) => {
  console.log('权限：',initialState);
  
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  return {
    // canSeeAdmin,
    // initialState
    canAccess: initialState.password,
    isTeacher: initialState?.isTeacher,
    isAdmin:initialState?.admin
  };
};
