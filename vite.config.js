import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression";
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const pathResolve = (dir) => fileURLToPath(new URL(dir, import.meta.url));
// const env = loadEnv(mode, process.cwd())
// 打包模式
const modeEnv = process.env.NODE_ENV;
// console.log(modeEnv)
// https://vitejs.dev/config/
export default defineConfig({
  root: './src/',
  base: '/',
  publicDir: 'public',
  resolve: {
    alias: [{ find: 'components', replacement: pathResolve('src/components/') },
    { find: 'constants', replacement: pathResolve('src/store/constants/') },
    { find: 'actions', replacement: pathResolve('src/store/actions/') },
    { find: 'reducers', replacement: pathResolve('src/store/reducers/') },
    { find: 'router', replacement: pathResolve('src/router/') },
    { find: 'style', replacement: pathResolve('src/style/') },
    { find: 'store', replacement: pathResolve('src/store/') },
    { find: 'utils', replacement: pathResolve('src/utils/') },
    { find: 'assets', replacement: pathResolve('src/public/assets/') },
    { find: '@', replacement: pathResolve('./src') }],
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false },
      css: { charset: false },
    },
    postcss: {
      plugins: [
        atImport({ path: path.join(__dirname, 'src`') }),
        autoprefixer({
          overrideBrowserslist: [
            '> 0.5%',
            'last 2 versions',
            'ie > 11',
            'iOS >= 10',
            'Android >= 5',
          ],
        }),
      ],
    },
  },
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve('src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    reactRefresh(),
    AutoImport({
      imports: ["react", "react-router-dom"]
    }),
    (modeEnv === 'production') && viteCompression({
      filter: /^(?!.*min\.js$).*\.(js|json|css|scss)$/i,
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      deleteOriginFile: true,
      // ext: ".gz",
    }),
    createHtmlPlugin({
      minify: true,
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: 'index.jsx',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'index.html',

      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        minify: true,
        // data: {
        // title: 'react 模版',
        // injectScript: `<script src="./index.js"></script>`,
        // },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'tag',
            },
          },
        ],
      },
    })],
  define: {
    'process.env': {
    }
  },
  build: {
    target: 'es2015',
    outDir: '../dist',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    reportCompressedSize: (modeEnv === 'production') ? false : true,
    sourcemap: (modeEnv === 'production') ? false : true,
    rollupOptions: {
      input: {
        app: pathResolve('src/index.html')
      },
      // external: ['react','react-dom'],
      output: {
        // globals: {
        //   react: "React",
        //   "react-dom": "ReactDOM",
        // },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        entryFileNames: `js/[name]-[hash].js`,
        chunkFileNames: `js/[name]-[hash].js`,
        assetFileNames: assetInfo => {
          let extType = 'assets';
          if (
            /\.(css|scss|sass|less)(\?.*)?$/i.test(assetInfo.name)
          ) {
            extType = 'css'
          }
          return `${extType}/[name]-[hash][extname]`
        },
      },
    },
  },
});