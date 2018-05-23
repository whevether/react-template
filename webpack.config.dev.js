import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'; //生成html并注入
import CopyWebpackPlugin from 'copy-webpack-plugin'; //拷贝资源文件
/* eslint-disable  react/require-extension */ 
export default {
  resolve: {
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

  devtool: 'eval', // 调试工具
  mode: "development",
  entry: {
      app:[
      //  设置目标源和热加载源
      'react-hot-loader/patch',   //这个是最新的react热加载插件。目前还是rc版.取代babel-react-hmr
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/helps/index.js') // 定位客户端目标
    ]
  },
  target: 'web', // 目标是web 服务器
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出编译文件目录
    publicPath: '/', //根目录
    filename: 'js/[name].js',
    chunkFilename: 'js/vendor.js',
  },
  // optimization: {
  //   splitChunks:{
  //     minSize:1
  //   },
  //   minimize: true,
  //   runtimeChunk: true
  // },
  optimization: {
    // 优化打包配置
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist/assets'),
        ignore: ['.*']
      }
    ]),
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
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
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
              mimetype: 'application/octet-stream'
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
              mimetype: 'image/svg+xml'
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
        // exclude: /node_modules/, //排除这个文件夹
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
              sourceMap: false
            }
          }, {
            loader: 'less-loader',
            options: {
              // includePaths: [path.resolve(__dirname, 'src', 'less')],
              paths:[path.resolve(__dirname, 'src'),path.resolve(__dirname, 'node_modules', )],
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
