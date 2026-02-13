import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { join } from 'node:path';
import AutoImport from "unplugin-auto-import/vite";
import { compression, defineAlgorithm } from "vite-plugin-compression2";
import atImport from "postcss-import";
import postcssPxtorem from 'postcss-pxtorem';
// import { cdn } from 'vite-plugin-cdn2';
import autoprefixer from "autoprefixer";
const pathResolve = (dir) => fileURLToPath(new URL(dir, import.meta.url));
// 打包模式
const modeEnv = process.env.NODE_ENV;
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载 .env，用于 server.proxy 等（API 地址不注入前端代码）
  const env = loadEnv(mode, pathResolve("."), "");
  const apiBaseUrl = env.VITE_APP_API_BASE_URL || "http://192.168.2.100:28062";
  const paymentApiBaseUrl = env.VITE_APP_PAYMENT_API_BASE_URL || "http://192.168.2.100:28083";
  return {
  root: "./src/",
  base: "/",
  publicDir: "public",
  envDir: pathResolve("."),
  server: {
    // API 反向代理：/api/payment 走 28083，其余 /api 走 28062
    proxy: {
      "/api/payment": {
        target: paymentApiBaseUrl,
        changeOrigin: true,
      },
      "/api": {
        target: apiBaseUrl,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [    { find: "components", replacement: pathResolve("src/components/") },
    { find: "constants", replacement: pathResolve("src/store/constants/") },
    { find: "actions", replacement: pathResolve("src/store/actions/") },
    { find: "reducers", replacement: pathResolve("src/store/reducers/") },
    { find: "router", replacement: pathResolve("src/router/") },
    { find: "style", replacement: pathResolve("src/style/") },
    { find: "store", replacement: pathResolve("src/store/") },
    { find: "utils", replacement: pathResolve("src/utils/") },
    { find: "assets", replacement: pathResolve("src/public/assets/") },
    { find: "@", replacement: pathResolve("./src") }],
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false },
      css: { charset: false },
    },
    postcss: {
      plugins: [
        atImport({ path: join(__dirname, "src`") }),
        autoprefixer(),
        postcssPxtorem({
          rootValue: 16,
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        })
      ],
    },
  },
  plugins: [
    reactRefresh(),
    // cdn({modules: [{ name: 'react', relativeModule: './umd/react.production.min.js' },{ name: 'react-dom', relativeModule: './umd/react-dom.production.min.js', aliases: ['client'] }, 'react-router-dom','axios','echarts','redux','react-redux'] }),
    AutoImport({
      imports: ["react", "react-router-dom"]
    }),
    (modeEnv === "production") && compression({
      include: /^(?!.*min\.js$).*\.(js|json|css|scss)$/i,
      threshold: 10240,
       algorithms: [
        'gzip',
        'brotliCompress',
        defineAlgorithm('deflate', { level: 9 })
      ],
      deleteOriginalAssets: true,
      // ext: ".gz",
    })],
  define: {
    "process.env": {},
    // Vite 用 import.meta.env，此处占位避免 env.js 中 __APP_ENV__ 未定义报错
    __APP_ENV__: undefined,
  },
  build: {
    target: "es2015",
    outDir: "../dist",
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    reportCompressedSize: (modeEnv === "production") ? false : true,
    sourcemap: (modeEnv === "production") ? false : true,
    rollupOptions: {
      input: {
        app: pathResolve("src/index.html")
      },
      // external: [
      //   'react',
      //   'react-dom',
      //   'react-router-dom',
      //   'redux',
      //   'react-redux',
      //   'axios',
      //   'echarts'
      // ],
      output: {
        // 静态资源分类和包装
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js", // 主体文件不打hash，避免android环境更新
        assetFileNames: assetInfo => {
          let extType = "assets";
          if (
            /\.(css|scss|sass|less)(\?.*)?$/i.test(assetInfo.names[0])
          ) {
            extType = "css";
          }
          return `${extType}/[name]-[hash][extname]`;
        },
        // 静态资源拆分打包
        manualChunks(id) {
          let _manualChunks = "";
          switch (true) {
            case id.includes("node_modules"):
              _manualChunks = "vendor";
              break;
            case id.includes("svg-icons-register"):
              _manualChunks = "svg-icons-register";
              break;
          }
          if (_manualChunks) {
            return _manualChunks;
          }
        }
      },
    },
  },
};
});
