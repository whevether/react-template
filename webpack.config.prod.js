import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';     //css 插件
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
    app: path.resolve(__dirname, 'src/helps/index'),
    // vendor: ['react','react-dom','redux','react-redux','react-router-redux','react-router-dom','redux-thunk']
  },
  target: 'web', // 目标是web服务
  mode: "production",
  output: {
    //输出目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks:{
      minSize:1
    },
    minimize: true,
    runtimeChunk: true
  },
  devtool: "source-map",
  plugins: [
    // 编译环境变量
    new webpack.DefinePlugin(GLOBALS),

    // 生成css 文件
    new ExtractTextPlugin('[name].bundle.css'),
    //优化编译插件
    // new webpack.optimization.splitChunks(),
    // new webpack.optimization.runtimeChunk(),
    // new webpack.optimization.minimize()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
        test: /(\.css|\.scss|\.sass)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ],
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  }
};
