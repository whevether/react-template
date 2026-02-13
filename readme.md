# React Template

> React 19.x 脚手架，支持 **Webpack 5.x** 与 **Vite 7.x** 双构建方案。

[![示例](./screen/1.gif)](https://react.zytravel.shop "示例")  
**[在线演示](https://react.zytravel.shop)**

---

## 环境要求

- **Node.js** ≥ 20
- **npm** ≥ 10

---

## 快速开始

### 安装依赖

```bash
npm i
```

若遇依赖冲突，可使用：

```bash
npm i --legacy-peer-deps
```

### 开发

| 命令 | 说明 |
|------|------|
| `npm run dev` | 使用 **Vite** 启动开发环境（推荐，带热更新并自动打开浏览器） |
| `npm run start` | 使用 **Webpack** 启动开发环境（会先执行 lint 与 test:watch） |

### 构建

| 命令 | 说明 |
|------|------|
| `npm run buildvite` | Vite 生产环境构建 |
| `npm run buildvite:test` | Vite 测试环境构建 |
| `npm run build:prod` | Webpack 生产环境构建并打开 dist 预览 |
| `npm run build:test` | Webpack 测试环境构建并打开 dist 预览 |

### 其他脚本

| 命令 | 说明 |
|------|------|
| `npm run lint` | ESLint 检查并自动修复 |
| `npm run test` | 运行单元测试 |
| `npm run test:watch` | 单元测试并监听文件变化 |
| `npm run remove-dist` | 删除 `dist` 目录 |
| `npm run clean-dist` | 清空并重建 `dist` 目录 |

---

## 脚本说明（与 package.json 对应）

安装或启动前会自动执行：

- **preinstall**：检查 Node 版本（需 ≥ 20）
- **prestart** / **predev**：启动前输出提示并执行 `remove-dist`
- **prebuild** / **prebuildvite**：构建前执行 `clean-dist` 与 `lint`

内部脚本（一般无需直接执行）：

- `open:src`：Webpack 开发服务器
- `open:dist`：启动 dist 静态预览服务
- `start-message`：启动时打印提示信息

---

## 路由与页面结构

项目使用 **React Router v7** 的 `createBrowserRouter` + `RouterProvider`，采用嵌套路由与布局。

### 路由一览

| 路径 | 布局 | 说明 |
|------|------|------|
| `/` | DefaultLayout | 首页（Home） |
| `/redbull` | DefaultLayout | RedBull 页 |
| `/snacks` | DefaultLayout | Snacks 父级（含子路由） |
| `/snacks/one` | DefaultLayout | Snacks / One |
| `/snacks/two` | DefaultLayout | Snacks / Two |
| `/keep` | DefaultLayout | Keep 页 |
| `/login` | LoginLayout | 登录页 |
| `/401` | 无布局 | 无权限页 |
| `*` | 无布局 | 404 未找到 |

### 布局说明

- **RootLayout**：根布局，仅提供 `<Outlet />`
- **DefaultLayout**：需登录 + 权限校验；包含顶部导航与页脚，未登录跳 `/login`，无权限跳 `/401`
- **LoginLayout**：登录相关页面布局

### 权限与路径映射（`src/utils/permission.js`）

路径与权限标识对应关系：

- `/` → `dash`
- `/redbull` → `redbull`
- `/snacks` → `snacks`
- `/snacks/one` → `snacks.one`
- `/snacks/two` → `snacks.two`
- `/keep` → `keep`

---

## 环境变量

根目录下按环境使用不同 `.env` 文件：

| 文件 | 使用场景 |
|------|----------|
| `.env.development` | `npm run dev` / Webpack 开发 |
| `.env.production` | Vite/Webpack 生产构建（默认） |
| `.env.test` | `buildvite:test` / `build:test` 测试构建 |

常用变量（Vite 需以 `VITE_` 开头才会注入前端）：

| 变量名 | 说明 |
|--------|------|
| `VITE_APP_ENV` | 环境标识：development / production / test |
| `VITE_APP_API_BASE_URL` | 默认 API 基础地址 |
| `VITE_APP_PAYMENT_API_BASE_URL` | 支付/账户类 API 基础地址 |

开发时 Vite 会按 `vite.config.js` 中的 `server.proxy` 将 `/api`、`/api/payment` 代理到对应后端。

---

## 常见问题

### 1. 刷新或直接访问子路由出现 404

项目使用 **BrowserRouter**（HTML5 History），路由由前端维护，无真实对应服务器路径。  
部署时需在 **Nginx**（或其它 Web 服务器）中把所有请求回退到入口 HTML，例如：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

这样任意路径都会由 `index.html` 加载，再由 React Router 接管。

### 2. 请求接口怎么写？

项目在 Redux 中封装了基于 **axios** 的请求，在 **action** 中通过封装的 API 方法（如 `api.get`、`api.post`）调用即可，无需在业务组件里直接引入 axios。

---

## 项目结构简述

- `src/router/`：路由配置与布局（`app.jsx`、`rootLayout`、`defaultLayout`、`loginLayout`）
- `src/components/`：页面与公共组件
- `src/store/`：Redux store、reducers、actions
- `src/utils/`：工具与权限配置（如 `permission.js`）
- `src/style/`：全局样式
- `tools/`：构建与检查脚本（Node 版本、dist 服务等）

---

## 构建产物说明（Webpack）

若使用 Webpack 构建，入口会拆成：

- `dist/js/vendor.js`：第三方依赖
- `dist/js/app.js`：业务代码

HTML 中按顺序引用即可。

---

## 更新记录

| 日期 | 内容 |
|------|------|
| 2025.02.10 | 升级依赖；环境变量编译；全局路由跳转与配置；文档与脚本调整 |
| 2025.07.17 | 升级依赖；统一 Webpack 与 Vite 行为；Vite 压缩配置；文档与脚本 |
| 2025.05.08 | 全量依赖升级；示例更新；统一 ESM，强制 `type: 'module'` |
| 2024.08.05 | ESLint 升级至 9.x |
| 2023.12.22 | 优化移除 Redux 过时 API 后的跳转与报错 |
| 2023.12.04 | Redux 依赖升级 |
| 2023.07.22 | 新增并完善 Vite 配置 |
| 2022.04.12 | 升级至 React 18 |
| 2021.12.24 | ESLint 8；Node 最低 14 |
| 2021.11.11 | React Router v6，history v5，路由改为 Hooks 写法 |
| 2021.08.12 | 使用 Webpack 5 自带资源加载 |
| 2020.11.20 | 移除过期依赖，升级 Webpack 5 |
| 2019.06.10 | 移除多余依赖，升级依赖，优化 Webpack 与嵌套路由 |

---

## License

MIT · Author: keep_wan
