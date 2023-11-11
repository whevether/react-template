import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import AutoImport from "unplugin-auto-import/vite";
import viteCompression from "vite-plugin-compression2";
import atImport from 'postcss-import';
// import { cdn } from 'vite-plugin-cdn2';
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
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
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
    // cdn({modules: [{ name: 'react', relativeModule: './umd/react.production.min.js' },{ name: 'react-dom', relativeModule: './umd/react-dom.production.min.js', aliases: ['client'] },'react-helmet', 'react-router-dom','axios','echarts','redux','react-redux'] }),
    AutoImport({
      imports: ["react", "react-router-dom"]
    }),
    (modeEnv === 'production') && viteCompression({
      include: /^(?!.*min\.js$).*\.(js|json|css|scss)$/i,
      threshold: 10240,
      algorithm: "gzip",
      deleteOriginFile: true,
      // ext: ".gz",
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
      // external: [
      //   'react',
      //   'react-dom',
      //   'react-router-dom',
      //   'react-helmet',
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
          var extType = 'assets';
          if (
            /\.(css|scss|sass|less)(\?.*)?$/i.test(assetInfo.name)
          ) {
            extType = 'css'
          }
          return `${extType}/[name]-[hash][extname]`
        },
        // 静态资源拆分打包
        manualChunks(id) {
          let _manualChunks = ''
          switch (true) {
            case id.includes('node_modules'):
              _manualChunks = 'vendor'
              break
            case id.includes('svg-icons-register'):
              _manualChunks = 'svg-icons-register'
              break
          }
          if (_manualChunks) {
            return _manualChunks
          }
        }
      },
    },
  },
});
