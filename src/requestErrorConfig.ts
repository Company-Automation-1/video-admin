import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { getIntl, history } from '@umijs/max';
import { message } from 'antd';
import { tokenManager } from '@/utils/token';

// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  success: boolean;
  data?: any;
  message: string;
  timestamp: number;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const {
        code,
        success,
        data,
        message: errorMessage,
      } = res as unknown as ResponseStructure;
      if (!success) {
        const intl = getIntl();
        const error: any = new Error(
          errorMessage ||
            intl.formatMessage({ id: 'pages.error.requestFailed' }),
        );
        error.name = 'BizError';
        error.info = { code, message: errorMessage, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      const intl = getIntl();
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo = error.info;
        // 如果是 401 未授权，清除 token 并跳转登录页
        if (errorInfo?.code === 401) {
          tokenManager.remove();
          message.error(intl.formatMessage({ id: 'pages.error.unauthorized' }));
          history.push('/user/login');
        } else if (errorInfo?.message) {
          message.error(errorInfo.message);
        } else {
          message.error(
            intl.formatMessage({ id: 'pages.error.requestFailed' }),
          );
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const status = error.response.status;
        if (status === 401) {
          // 清除 token
          tokenManager.remove();
          message.error(intl.formatMessage({ id: 'pages.error.unauthorized' }));
          // 跳转到登录页
          history.push('/user/login');
        } else if (status === 403) {
          message.error(intl.formatMessage({ id: 'pages.error.noPermission' }));
        } else if (status >= 500) {
          message.error(intl.formatMessage({ id: 'pages.error.serverError' }));
        } else {
          message.error(
            `${intl.formatMessage({
              id: 'pages.error.requestFailedWithStatus',
            })}: ${status}`,
          );
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error(intl.formatMessage({ id: 'pages.error.networkError' }));
      } else {
        // 发送请求时出了点问题
        message.error(intl.formatMessage({ id: 'pages.error.requestError' }));
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 从 token 管理工具获取 token
      const token = tokenManager.get();
      if (token) {
        // 将 token 添加到请求头
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      return response;
    },
  ],
};
