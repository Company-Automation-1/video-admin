// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/v1/admin/profile */
export async function profile(options?: { [key: string]: any }) {
  return request<API.Response<API.Profile>>('/api/v1/admin/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/v1/auth/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.Response<null>>('/api/v1/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/v1/auth/user/login */
export async function login(data: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.Response<API.LoginResult>>('/api/v1/auth/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  });
}