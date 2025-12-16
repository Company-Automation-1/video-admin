/**
 * Token 管理工具
 * 可在任何地方使用，包括非 React 上下文
 */

/**
 * Token 管理对象类型
 *
 * @param get 获取 token
 * @param set 设置 token
 * @param remove 删除 token
 * @param has 检查是否存在 token
 */
export type TokenManager = {
  get: () => string | null;
  set: (token: string) => void;
  setSession: (token: string) => void;
  remove: () => void;
  has: () => boolean;
  decode: () => object | null;
};

export const tokenManager = {
  /**
   * 获取 token
   */
  get: (): string | null => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  /**
   * 设置 token
   */
  set: (token: string): void => {
    sessionStorage.removeItem('token');
    localStorage.setItem('token', token);
  },

  /**
   * 设置 session token
   */
  setSession: (token: string): void => {
    localStorage.removeItem('token');
    sessionStorage.setItem('token', token);
  },

  /**
   * 删除 token
   */
  remove: (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  },

  /**
   * 检查是否存在 token
   */
  has: (): boolean => {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  },

  /**
   * 解码 token
   */
  decode: (): object | null => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return null;
    const b = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(b + '='.repeat((4 - (b.length % 4)) % 4)));
  },
};
