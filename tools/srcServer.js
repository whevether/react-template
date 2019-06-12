const browserSync =  require('browser-sync');
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  // server: {
  //   baseDir: 'src',

  //   middleware: [
  //     historyApiFallback(),

  //     webpackDevMiddleware(bundler, {
  //       publicPath: config.output.publicPath,

  //       noInfo: true,
  //       quiet: false,
  //       stats: {
  //         assets: false,
  //         colors: true,
  //         version: false,
  //         hash: false,
  //         timings: false,
  //         chunks: false,
  //         chunkModules: false
  //       },
  //     }),
  //     webpackHotMiddleware(bundler)
  //   ]
  // },
  proxy: {
    target: 'https://api.douban.com', 
    middleware: [
      historyApiFallback(),

      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,

        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },
      }),
      webpackHotMiddleware(bundler)
    ],
    ws: false
  },
  https: false,
  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});