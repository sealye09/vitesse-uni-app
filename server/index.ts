import type { NextFunction, Request, Response } from "express";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const PORT = 3001;

// 模拟用户数据
const users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    name: "管理员",
    avatar: "https://picsum.photos/200",
  },
];

// 模拟 token 存储（内存中）
const tokens = new Map<string, { userId: number; expireTime: number }>();
const refreshTokens = new Map<string, { userId: number; expireTime: number }>();

// 生成随机 token
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 模拟延迟 (2-5秒)
function delay(ms?: number) {
  const randomMs = ms || Math.floor(Math.random() * 1500) + 1000;
  return new Promise((resolve) => setTimeout(resolve, randomMs));
}

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 验证 token 的中间件
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // 确保 req.body 存在
  if (!req.body) {
    req.body = {};
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(200).json({
      code: 401,
      msg: "未授权，请先登录",
      data: null,
    });
  }

  const token = authHeader.substring(7);
  const tokenData = tokens.get(token);

  if (!tokenData) {
    return res.status(200).json({
      code: 401,
      msg: "Token 无效",
      data: null,
    });
  }

  if (Date.now() > tokenData.expireTime) {
    tokens.delete(token);
    return res.status(200).json({
      code: 401,
      msg: "Token 已过期",
      data: null,
    });
  }

  (req as any).body.userId = tokenData.userId;
  next();
}

// ------------------- 公共接口 -------------------

// 登录
app.post("/api/login", async (req: Request, res: Response) => {
  await delay();
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.json({
      code: 400,
      msg: "用户名或密码错误",
      data: null,
    });
  }

  const token = generateToken();
  const refreshToken = generateToken();

  // token 10s
  tokens.set(token, {
    userId: user.id,
    expireTime: Date.now() + 10 * 1000,
  });
  // refreshToken 30s后过期
  refreshTokens.set(refreshToken, {
    userId: user.id,
    expireTime: Date.now() + 30 * 1000,
  });

  res.json({
    code: 200,
    msg: "登录成功",
    data: {
      token,
      refreshToken,
      userInfo: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    },
  });
});

// 刷新 Token
app.post("/api/auth/refresh", (req: Request, res: Response) => {
  // 从 header 获取 refreshToken（实际应该从 body 或 cookie 获取）
  const refreshToken = req.headers["x-refresh-token"] as string;

  if (!refreshToken) {
    return res.status(200).json({
      code: 401,
      msg: "刷新 token 失败",
      data: null,
    });
  }

  const tokenData = refreshTokens.get(refreshToken);

  if (!tokenData) {
    return res.status(200).json({
      code: 401,
      msg: "刷新 token 无效",
      data: null,
    });
  }

  if (Date.now() > tokenData.expireTime) {
    refreshTokens.delete(refreshToken);
    return res.status(200).json({
      code: 401,
      msg: "刷新 token 已过期",
      data: null,
    });
  }

  // 生成新 token
  const newToken = generateToken();
  const newRefreshToken = generateToken();

  // token 10s
  tokens.set(newToken, {
    userId: tokenData.userId,
    expireTime: Date.now() + 10 * 1000,
  });
  // refreshToken 30s后过期
  refreshTokens.set(newRefreshToken, {
    userId: tokenData.userId,
    expireTime: Date.now() + 30 * 1000,
  });

  // 删除旧的 refreshToken
  refreshTokens.delete(refreshToken);

  res.json({
    code: 200,
    msg: "刷新成功",
    data: {
      token: newToken,
      refreshToken: newRefreshToken,
    },
  });
});

// 退出登录
app.post("/api/logout", authMiddleware, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.substring(7);

  if (token) {
    tokens.delete(token);
  }

  res.json({
    code: 200,
    msg: "退出成功",
    data: null,
  });
});

// 获取用户信息（需要授权）
app.get(
  "/api/user/info",
  authMiddleware,
  async (req: Request, res: Response) => {
    await delay();
    const userId = (req as any).body.userId;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(200).json({
        code: 404,
        msg: "用户不存在",
        data: null,
      });
    }

    res.json({
      code: 200,
      msg: "获取成功",
      data: {
        id: user.id,
        name: user.name,
        email: "admin@example.com",
        avatar: user.avatar,
        phone: "13800138000",
      },
    });
  },
);

// 访客接口（无需授权）
app.get("/api/public/posts", (_req: Request, res: Response) => {
  res.json({
    code: 200,
    msg: "获取成功",
    data: [
      { id: 1, title: "欢迎使用", content: "这是公开的访客接口" },
      { id: 2, title: "功能介绍", content: "无需登录即可访问" },
      { id: 3, title: "测试数据", content: "这是模拟的数据" },
    ],
  });
});

// 需要授权的接口
app.get(
  "/api/private/posts",
  authMiddleware,
  async (_req: Request, res: Response) => {
    await delay();
    res.json({
      code: 200,
      msg: "获取成功",
      data: [
        { id: 1, title: "私有文章1", content: "这是需要登录才能访问的内容" },
        { id: 2, title: "私有文章2", content: "只有授权用户才能查看" },
      ],
    });
  },
);

// 模拟 token 过期
app.get(
  "/api/expire-token",
  authMiddleware,
  async (_req: Request, res: Response) => {
    await delay();
    res.status(200).json({
      code: 401,
      msg: "Token 已过期，请刷新",
      data: null,
    });
  },
);

app.listen(PORT, () => {
  console.log(`\n🟢 Test server running at http://localhost:${PORT}`);
  console.log(`\n📋 API 列表:`);
  console.log(
    `   POST /api/login          - 登录 (username: admin, password: 123456)`,
  );
  console.log(`   POST /api/auth/refresh   - 刷新 Token`);
  console.log(`   POST /api/logout         - 退出登录`);
  console.log(`   GET  /api/user/info     - 获取用户信息 (需要授权)`);
  console.log(`   GET  /api/public/posts   - 访客接口 (无需授权)`);
  console.log(`   GET  /api/private/posts  - 私有接口 (需要授权)`);
  console.log(`   GET  /api/expire-token  - 模拟 token 过期`);
  console.log(`\n`);
});
