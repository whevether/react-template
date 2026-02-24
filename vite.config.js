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
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const modeEnv = mode;
  return {
  root: "./src/",
  base: "/",
  publicDir: "public",
  resolve: {
    alias: [{ find: "components", replacement: pathResolve("src/components/") },
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
    "process.env": {
    }
  },
  server: {
    // test 环境不使用反向代理，直接请求 VITE_APP_API_BASE_URL
    proxy: mode === "test" ? {} : {
      "/api": {
        target: env.VITE_APP_PROXY_TARGET || "http://localhost:5900",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    target: "es2015",
    outDir: "../dist",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900000,
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