import webpack from 'webpack';
import path from 'path';
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
        test: /(\.css|\.scss|\.sass)$/,
        exclude: /node_modules/,
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
      }
    ]
  }
};
