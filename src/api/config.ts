import type { ApiResponse } from "./type";

/**
 * 响应结构配置
 */
export interface ResponseConfig {
  code: string; // 状态码字段名，如 "code", "status", "errno"
  message: string; // 消息字段名，如 "message", "msg", "error"
  data: string; // 数据字段名，如 "data", "result", "payload"
  success: number | string | number[] | string[]; // 成功状态码，如 200、"success" 或 [0, 200, "success"]
}

export const defaultResponseConfig: ResponseConfig = {
  code: "code",
  message: "msg",
  data: "data",
  success: [0, 200],
};

/**
 * 将后端响应转换为统一的 ApiResponse 格式
 * @param response 后端原始响应
 * @param config 响应字段配置
 */
export function transformResponse(
  response: any,
  config: Partial<ResponseConfig> = {},
): ApiResponse {
  const cfg = { ...defaultResponseConfig, ...config };

  const code = Number(response[cfg.code]) || 0;
  const successCodes = Array.isArray(cfg.success) ? cfg.success : [cfg.success];
  const isSuccess = successCodes.some((sc) => String(sc) === String(code));

  return {
    code,
    message: response[cfg.message] || "",
    data: response[cfg.data],
    isSuccess,
    _raw: response,
  };
}
