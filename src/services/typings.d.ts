// @ts-ignore
/* eslint-disable */

declare namespace API {
  /** 后端响应数据格式 */
  type Response<T> = {
    code: number;
    success: boolean;
    message: string;
    data?: T;
    timestamp: number;
  };

  /** 后端分页数据格式 */
  type Pagination<T> = Response<{
    list: T[];
    pagination: {
      page: number;
      page_size: number;
      total: number;
      pages: number;
    };
  }>;
}