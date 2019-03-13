import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin"; //打包压缩css
import HtmlWebpackPlugin from 'html-webpack-plugin'; //生成html并注入
import CopyWebpackPlugin from 'copy-webpack-plugin'; //拷贝资源文件
import WebpackMd5Hash from 'webpack-md5-hash'; //hash文件名
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
/* eslint-disable  react/require-extension */
import path from 'path';
// 设置node.js生产环境变量
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  resolve: {
    //识别扩展文件名
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      helps: path.resolve(__dirname, 'src/helps/'),
      router: path.resolve(__dirname, 'src/router/'),
      style: path.resolve(__dirname, 'src/style/'),
      store: path.resolve(__dirname, 'src/store/')
    }
  },
  //开启调试

  entry: {
    app: path.resolve(__dirname, 'src/helps/index')
  },
  target: 'web', // 目标是web服务
  mode: "production",
  output: {
    //输出目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js?v=[chunkhash]',
    // chunkFilename: 'js/vendor.js?v=[chunkhash]',
  },
  optimization: {
    // 优化打包配置
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            properties: true
          },
          output: {
            comments: false
          },
          warnings: false,
          mangle: true,
          ie8: true
        },
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css|\.less$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {//node_modules内的依赖库
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          // enforce: true?
        },
        common: {// ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
          name: "common", //生成文件名，依据output规则
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },
        styles: {
          name: 'styles',
          test: /\.css|\.less$/,
          chunks: 'all',
          minSize: 0,
          minChunks: 2,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new WebpackMd5Hash(),
    // 编译环境变量
    new webpack.DefinePlugin(GLOBALS),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional eea1d28b685828b67788
      filename: "css/[name].css?v=[chunkhash]",
      chunkFilename: "css/vendor.css?v=[chunkhash]"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist/assets'),
        ignore: ['.*']
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      // title: '阿布云首页',
      // chunks: ['vendor','index'],
      // excludeChunks: ['app'],
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      trackJSToken: ''
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css|\.less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // minimize: true,
              sourceMap: false
              // importLoaders: 2,
              // modules: true,
              // // namedExport: true, // this is  invalid Options ,I find it
              // camelCase: true,
              // localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 15 versions']
                }),
                require('postcss-pxtorem')({
                  rootValue: 16,
                  unitPrecision: 5,
                  propList: ['*'],
                  selectorBlackList: [],
                  replace: true,
                  mediaQuery: false,
                  minPixelValue: 0
                })
              ],
              sourceMap: false
            }
          }, {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
              javascriptEnabled: true,
              sourceMap: false
            }
          }
        ]
      }
    ]
  }
};
