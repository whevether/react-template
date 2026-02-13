###React version 19.X 版本脚手架
> 包含客户端，使用了最新的react,并实现version 19.X;
> 同时支持 webpack 5.X 与vite 7.X来编译
```html
<!-- 分离的第三方依赖 -->
<script src="../dist/js/vendor.js"></script>

<!-- react -->
<script src="../dist/js/app.js"></script>
```
##### 安装命令和一些常用的npm脚本;
- npm i    (安装脚手架依赖)
- npm run preinstall    (检查node版本,最低20.0以上版本)
- npm run prestart    (删除dist 编译打包文件 webpack)
- npm run predev    (删除dist 编译打包文件 vite)
- npm run start (启动客户端的开发环境 webpack)
- npm run dev (启动客户端的开发环境 vite)
- npm run build (打包编译客户端环境,并启动 webpack)
- npm run buildvite (打包编译客户端环境 vite)
- npm run lint (检查代码规范)
- npm run test (启动单元测试)
- npm run test:watch (启动单元测试并监听)
- npm run remove-dist (删除dist文件夹)
- npm run clean-dist (清空dist文件夹)
##### 一些常见问题
1. 刷新之后 404 或者子路由报错；是使用了 BrowserRouter这个路由或者分割了代码。这个路由会开启h5 的history 模式;所以需要nginx的支持; nginx uri 定向到例如是打包文件是通过index.html 就重定向到index.html; 原理就是react vue 这类框架并不是真实dom节点。而是虚拟dom.所有的跳转以及dom节点渲染都是在js内部完成的。所以需要配置nginx;
2. 这个脚手架是封装了axios 这个ajax库到redux中；所以不用在调用的地方引入axios;只需要在redux的action中使用我在redux中封装的axios 中间件的别名  例如: api.get api.post等就好了;action中也符合redux的方式;
##### (2019.06.10)
1. 移除多余依赖。升级依赖。优化webpack配置
2. 优化嵌套路由写法
##### (2020.11.20)
1. 移除过期依赖。
2. 升级webpack 5
##### (2021.08.12)
1. 移除过时依赖。使用webpack 5自带资源加载
##### (2021.11.11)
1. 升级react-router 为v6.history为 v5.并修改router为hooks写法.
##### (2021.12.24)
1. 升级eslint到8
2. 最低只支持node 14
##### (2022.04.12)
1. 升级为react v18.0
##### (2023.07.22)
1. 添加vite 配置
2. 完善vite 配置
##### (2023.12.04)
1. 升级redux 依赖
#### (2023.12.22)
1. 优化移除redux过时路由之后跳转问题。 以及部分报错问题
#### (2024.08.05)
1. 升级eslint 到9.X以上版本
#### (2025.05.08)
1. 升级全部依赖，
2. 更新例子
3. 全部更新为ems写法。强制使用type: 'module'; 
### (2025.07.17)
1. 升级全部依赖
2. 统一webpack 与vite 行为一致
3. vite 压缩配置改写
4. 修改文档与脚本

### (2025.02.10)
1. 升级全部依赖
2. 增加环境变量编译
3. 修改全局路由跳转与配置
4. 修改文档与脚本

##### 示例图片
[![示例图片](./screen/1.gif) "示例图片")](https://react.zytravel.shop "示例")
#演示
[演示](https://react.zytravel.shop "演示")
##### npm 兼容 安装命令
`npm i --legacy-peer-deps`
