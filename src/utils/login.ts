/**
 * 登录函数
 */

import { history } from '@umijs/max';

/**
 * 登录函数类型
 *
 * @param loginPath 路径对象 (登录页面)
 * @param gotoLogin 跳转登录
 */
export type LoginFuncType = {
  loginPath: {
    login: string;
  };
  gotoLogin: () => void;
};

export const loginFunc: LoginFuncType = {
  /**
   * 登录路径对象
   */
  loginPath: {
    login: '/login',
  },

  /**
   * 跳转登录
   */
  gotoLogin: () => {
    history.push(loginFunc.loginPath.login);
  },
};
