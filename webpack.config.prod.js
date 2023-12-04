const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html并注入
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝资源文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const path = require('path');
// 设置node.js生产环境变量
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.BUILD_TYPE': JSON.stringify('webpack'),
  __DEV__: false
};

const config = {
  resolve: {
    //识别扩展文件名
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      constants: path.resolve(__dirname, 'src/store/constants/'),
      actions: path.resolve(__dirname, 'src/store/actions/'),
      reducers: path.resolve(__dirname, 'src/store/reducers/'),
      router: path.resolve(__dirname, 'src/router/'),
      style: path.resolve(__dirname, 'src/style/'),
      store: path.resolve(__dirname, 'src/store/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      assets: path.resolve(__dirname, 'src/public/assets/')
    }
  },
  //开启调试

  entry: {
    app: path.resolve(__dirname, 'src/index.jsx') // 定位客户端目标
  },
  target: 'web', // 目标是web服务
  mode: "production",
  output: {
    //输出目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name]-[hash].js?v=[chunkhash]',
    chunkFilename: 'js/[name]-[hash].js?v=[chunkhash]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        exclude: /\/excludes/,
        parallel: 4,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: true,
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          // Deprecated
          output: null,
          format: null,
          toplevel: false,
          nameCache: false,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: "all",
      minSize: {
        javascript: 30000, // 模块要大于30kb才会进行提取
        style: 50000, // 模块要大于50kb才会进行提取
      },
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // name: true,
      automaticNameDelimiter: '~', 
      cacheGroups: {
        vendor: {//node_modules内的依赖库
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          reuseExistingChunk: true
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
        }
      }
    }
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  plugins: [
    AutoImport.default({
      imports: ["react","react-router-dom"],
    }),
    // 编译环境变量
    new webpack.DefinePlugin(GLOBALS),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional eea1d28b685828b67788
      filename: "css/[name]-[hash].css?v=[chunkhash]",
      chunkFilename: "css/[id]-[hash].css?v=[chunkhash]"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          // ignore: ['.*']
        }
      ]
    }),
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
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       name: '[name].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000,
        //       mimetype: 'application/font-woff',
        //       name: '[name].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000,
        //       mimetype: 'application/octet-stream',
        //       name: '[name].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'javascript/auto',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000,
        //       mimetype: 'image/svg+xml',
        //       name: '[name].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     // loader: 'file-loader',
        //     type: 'asset/resource',
        //     generator: {
        //       filename: 'assets/[hash][ext][query]'
        //     }
        //     // options: {
        //     //   name: '[name].[ext]'
        //     // }
        //   }
        // ]
      },
      {
        test: /\.css|\.scss$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false
              // importLoaders: 2,
              // modules: {
                // auto: (resourcePath) => resourcePath.endsWith('.scss'),
                // localIdentName: '[path][name]__[local]--[hash:base64:5]'
              // },
            }
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer',{/*options*/}],
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
            }
          }, {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // webpackImporter: false,
                indentWidth: 4,
                includePaths: [path.resolve(__dirname, 'src', 'scss'),'node_modules'],
              },
            }
            // loader: 'less-loader',
            // options: {
            //   lessOptions: {
            //     paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
            //     javascriptEnabled: true,
            //     sourceMap: false
            //   }
            // }
          }
        ]
      }
    ]
  }
};
module.exports = config;
