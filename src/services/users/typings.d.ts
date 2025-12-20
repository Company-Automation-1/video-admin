// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User = {
    id: number;
    username: string;
    email: string;
    points: number;
    created_at: number;
    updated_at: number;
  };

  /** 获取用户列表查询参数 */
  type GetUsersParams = {
    page?: number;
    page_size?: number;
    username_like?: string;
    points_min?: number;
    order_by?: string;
    order?: 'asc' | 'desc';
  };
}
