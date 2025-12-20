// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取管理员列表 GET /api/v1/admin/admins */
export async function getAdmins(params?: API.GetAdminsParams) {
  return request<API.Pagination<API.Admin>>('/api/v1/admin/admins', {
    method: 'GET',
    params,
  });
}

/** 创建管理员 POST /api/v1/admin/admins */
export async function createAdmin(data: API.CreateAdminParams, options?: { [key: string]: any }) {
  return request<API.Response<API.Admin>>('/api/v1/admin/admins', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}