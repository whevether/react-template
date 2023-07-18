import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'

const path = require('path')
import { createHtmlPlugin } from 'vite-plugin-html'
const atImport = require('postcss-import')

const { resolve } = path

// process.env.NODE_ENV = 'production'; // 生产环境变量
// https://vitejs.dev/config/
export default defineConfig({
  root: './src/',
  base: '/',
  resolve: {
    alias: [{find: 'components',replacement: path.resolve(__dirname, 'src/components/')},
    {find: 'constants',replacement: path.resolve(__dirname, 'src/store/constants/')},
    {find: 'actions',replacement: path.resolve(__dirname, 'src/store/actions/')},
    {find: 'reducers',replacement: path.resolve(__dirname, 'src/store/reducers/')},
    {find: 'router',replacement: path.resolve(__dirname, 'src/router/')},
    {find: 'style',replacement: path.resolve(__dirname, 'src/style/')},
    {find: 'store',replacement: path.resolve(__dirname, 'src/store/')},
    {find: 'utils',replacement: path.resolve(__dirname, 'src/utils/')},
    {find: 'assets',replacement:  path.resolve(__dirname, 'src/assets/')},
    { find: '@', replacement: resolve(__dirname, './src') }],
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
        require('autoprefixer')({
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
    reactRefresh(),
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
      // data: {
      //   title: 'index',
      //   injectScript: `<script src="./index.js"></script>`,
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
  // define: {
  //   'process.env': {
  //     NODE_ENV: JSON.stringify('production')
  //   }
  // },
  build: {
    target: 'es2015',
    outDir: '../dist',
    cssCodeSplit: true,
    rollupOptions: {
      input:{
        app: path.resolve(__dirname, 'src/index.html')
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});