const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html并注入
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝资源文件
const config = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      constants: path.resolve(__dirname, 'src/store/constants/'),
      actions: path.resolve(__dirname, 'src/store/actions/'),
      reducers: path.resolve(__dirname, 'src/store/reducers/'),
      router: path.resolve(__dirname, 'src/router/'),
      style: path.resolve(__dirname, 'src/style/'),
      store: path.resolve(__dirname, 'src/store/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      assets: path.resolve(__dirname, 'src/assets/')
    }
  },

  devtool: 'eval', // 调试工具
  mode: "development",
  entry: {
    app: [
      path.resolve(__dirname, 'src/index.js') // 定位客户端目标
    ]
  },
  target: 'web', // 目标是web 服务器
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出编译文件目录
    publicPath: '/', //根目录
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3005,
    publicPath: "/",
    // hotOnly: true,
    hot: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5900',
    },
    historyApiFallback: true
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          // ignore: ['.*']
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.html',
      filename: 'index.html',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ],
  module: {
    //  编译模式
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack','babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]'
        }
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        type: 'javascript/auto',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000,
        //       mimetype: 'application/octet-stream'
        //     }
        //   }
        // ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
        generator: {
          filename: '[name].[ext]'
        }
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10000,
        //       mimetype: 'image/svg+xml'
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
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.css|\.less$/,
        // exclude: /node_modules/, //排除这个文件夹
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // importLoaders: 2,
              // modules: true,
              // // namedExport: true, // this is  invalid Options ,I find it
              // camelCase: true,
              // localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: true
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
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
                javascriptEnabled: true,
                sourceMap: false
              }
            }
          }
        ]
      }
    ]
  }
};
module.exports = config;
