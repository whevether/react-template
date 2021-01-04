###React version 17.X 版本脚手架
> 包含客户端，使用了最新的react,并实现version 17.X;
> 移除服务端渲染。使用next.js来服务端渲染.另开一个模板
> 使用webpack 5.X 来编译
```html
<!-- 分离的第三方依赖 -->
<script src="../dist/js/vendor.js"></script>

<!-- react -->
<script src="../dist/js/app.js"></script>
```
##### 安装命令和一些常用的npm脚本;
- yarn    (安装脚手架依赖)
- yarn preinstall    (检查node版本,最低8.0以上版本)
- yarn prestart    (删除dist 编译打包文件)
- yarn start (启动客户端的开发环境)
- yarn build (打包编译客户端环境,并启动)
- yarn lint (检查代码规范)
- yarn lint:watch (检查代码规范并监听)
- yarn test (启动单元测试)
- yarn test:watch (启动单元测试并监听)
- yarn remove-dist (删除dist文件夹)
- yarn clean-dist (清空dist文件夹)
##### 一些常见问题
1. 部署到服务器上,需要nginx 反向代理启动node.js 的http 服务;
2. 刷新之后 404 或者子路由报错；是使用了 BrowserRouter这个路由或者分割了代码。这个路由会开启h5 的history 模式;所以需要nginx的支持; nginx uri 定向到例如是打包文件是通过index.html 就重定向到index.html;如果是放在index.php就重定向到index.php就不会有这个问题了；
3. 这个脚手架是封装了axios 这个ajax库到redux中；所以不用在调用的地方引入axios;只需要在redux的action中使用我在redux中封装的axios 中间件的别名  例如: api.get api.post等就好了;action中也符合redux的方式;
##### 更新日志(2019.06.10)
1. 移除多余依赖。升级依赖。优化webpack配置
2. 优化嵌套路由写法
##### 更新日志(2020.11.20)
1. 移除过期依赖。
2. 升级webpack 5
##### 示例图片
[![示例图片](./screen/1.gif) "示例图片")](https://react.keep-wan.me "示例")
#演示
[演示](https://react.keep-wan.me "演示")
##### npm 7 安装命令
`npm i --legacy-peer-deps`