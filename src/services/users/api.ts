// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户列表 GET /api/v1/admin/users */
export async function getUsers(params?: API.GetUsersParams) {
  return request<API.Pagination<API.User>>('/api/v1/admin/users', {
    method: 'GET',
    params,
  });
}