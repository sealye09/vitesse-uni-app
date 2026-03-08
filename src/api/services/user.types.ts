/** 登录参数 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录响应 */
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  userInfo: {
    id: number;
    name: string;
    avatar: string;
  };
}

/** 用户信息 */
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

/** 公开文章 */
export interface Post {
  id: number;
  title: string;
  content: string;
}
