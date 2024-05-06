// 运行时配置
import { storage } from '@/utils'

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  const userInfo = storage.getItem('userInfo1')
  return userInfo;
}

export const layout = () => {
  return {
    logo: 'https://img.ixintu.com/upload/jpg/20210623/f085942092a377ba0b8c89baa2b23fc0_57124_800_800.jpg!con',
    menu: {
      locale: false,
    }
  };
};
