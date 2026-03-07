/**
 * 响应数据基础结构
 */
export interface ApiResponse<T = any> {
  code: number | string;
  message?: string;
  data: T;
  isSuccess: boolean;
  _raw: any;
}
