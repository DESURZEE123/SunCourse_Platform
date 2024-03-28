/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/',
    redirect: '/home',
    layout: false
  },
  {
    name: '首页',
    icon: 'SmileOutlined',
    path: '/home',
    // layout: false,  // 不使用layout配置
    routes: [
      { path: '/home', component: './home' },
      { path: '/home/edit', component: './home/edit' }
    ]
  },
  {
    name: '资料查询',
    path: '/material',
    icon: 'FolderOutlined',
    component: './material'
  },
  {
    name: '课后作业',
    path: '/homework',
    icon: 'FileDoneOutlined',
    // access: 'canRoute',
    routes: [
      { path: '/homework/my', name:'我的作业', component: './homework/my' },
      { path: '/homework/new', name: '发布作业', component: './homework/new' },
      { path: '/homework/details/StuWork', component: './homework/details/StuWork' },
      { path: '/homework/details/TeaPubWork', component: './homework/details/TeaPubWork' }
    ]
  },
  {
    name: '讨论区域',
    path: '/discuss',
    icon: 'TeamOutlined',
    // component: './discuss'
    routes: [
      { path: '/discuss', component: './discuss' },
      { path: '/discuss/detail', component: './discuss/detail' },
    ]
  },
  {
    name: '权限演示',
    path: '/access',
    component: './access'
  },
  {
    path: '/*',
    layout: false,
    component: './404'
  }
]
