// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Admin = {
    id: number;
    username: string;
    created_at: number;
    updated_at: number;
  };

  /** 获取用户列表查询参数 */
  type GetAdminsParams = {
    page?: number;
    page_size?: number;
    username_like?: string;
    created_at_min?: number;
    order_by?: string;
    order?: 'asc' | 'desc';
  };

  /** 创建管理员参数 */
  type CreateAdminParams = {
    username: string;
    password: string;
  };
}
