import { isArray, isString, merge } from "lodash-es";

import type { IApiResponse } from "./types";

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
  response: string | ArrayBuffer | AnyObject,
  config: Partial<ResponseConfig> = {},
): IApiResponse {
  if (isString(response)) {
    return {
      code: 0,
      message: "",
      data: response,
      isSuccess: true,
      _raw: response,
    };
  }

  // check is array buffer
  if (response instanceof ArrayBuffer) {
    return {
      code: 0,
      message: "",
      data: response,
      isSuccess: true,
      _raw: response,
    };
  }

  const mergedConfig = merge(defaultResponseConfig, config);

  const code = Number(response[mergedConfig.code]) || 0;
  const successCodes = isArray(mergedConfig.success)
    ? mergedConfig.success
    : [mergedConfig.success];
  const isSuccess = successCodes.some((sc) => String(sc) === String(code));

  return {
    code,
    message: response[mergedConfig.message] || "",
    data: response[mergedConfig.data],
    isSuccess,
    _raw: response,
  };
}
