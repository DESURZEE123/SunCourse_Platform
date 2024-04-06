// import { doLoign } from '@/service/login';
// import { Subscription, Effect } from 'dva'
// import { setCookie } from '@/utils/cookie'

// interface UserModeType {
//   namespace: String,
//   state: {},
//   reducers: {},
//   effects: {},
//   subscriptions: {
//     setup: Subscription
//   }
// }

// const UserMode: UserModeType = {
//   namespace: 'users',
//   // state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
//   state: {
//     token: "",
//     username: '',
//   },
//   // reducers: Action 处理器，处理同步动作，用来算出最新的 State
//   reducers: {
//     save(state, { payload: { token, username } }) {
//       return { ...state, token, username };
//     },
//   },
//   // effects，处理异步动作 call：执行异步函数 put：发出一个 Action，类似于 dispatch到reducers
//   effects: {
//     * fetch({ payload: { resolve, reject, userInfo } }, { call, put }) {
//       try {
//         const { data, code } = yield call(doLoign, { userInfo });
//         setCookie("TOKEN", data.token)
//         yield put({ type: 'save', payload: { token: data.token, username: userInfo.username } });
//         resolve(code);
//       }
//       catch (error) {
//         reject(error);
//       }

//     },
//   },
//   //改管理暂未用到，只是研究下用法
//   // subscriptions: {
//   //   setup({ dispatch, history }) {
//   //     return history.listen(({ pathname, values }) => {
//   //       if (pathname === '/user/login') {
//   //         values = { userInfo: { name: 'admin', password: '111' } }
//   //         dispatch({ type: 'fetch', payload: values });
//   //       }
//   //     });
//   //   },
//   // },
// };
// export default UserMode;
