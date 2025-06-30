import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin"; //生成html并注入
import CopyWebpackPlugin from "copy-webpack-plugin"; //拷贝资源文件
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import AutoImport from "unplugin-auto-import/webpack";
import postcssPxtorem from 'postcss-pxtorem';
import atImport from "postcss-import";
import { dirname, join,resolve } from 'node:path'; 
import autoprefixer from "autoprefixer";
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const config = {
  resolve: {
    extensions: [".*", ".js", ".jsx", ".json"],
    alias: {
      components: resolve(__dirname, "src/components/"),
      constants: resolve(__dirname, "src/store/constants/"),
      actions: resolve(__dirname, "src/store/actions/"),
      reducers: resolve(__dirname, "src/store/reducers/"),
      router: resolve(__dirname, "src/router/"),
      style: resolve(__dirname, "src/style/"),
      store: resolve(__dirname, "src/store/"),
      utils: resolve(__dirname, "src/utils/"),
      assets: resolve(__dirname, "src/public/assets/")
    }
  },

  devtool: "eval", // 调试工具
  mode: "development",
  entry: {
    app: [
      resolve(__dirname, "src/index.jsx") // 定位客户端目标
    ]
  },
  target: "web", // 目标是web 服务器
  output: {
    path: resolve(__dirname, "dist"), // 输出编译文件目录
    publicPath: "/", //根目录
    filename: "js/[name]-[hash].js?v=[chunkhash]",
    chunkFilename: "js/[name]-[hash].js?v=[chunkhash]",
  },
  devServer: {
    client: { overlay: false },
    static: {
      directory: join(__dirname, "public/"),
      staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      publicPath: "/",
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      watch: true,
    },
    port: 3005,
    historyApiFallback: true,
    // proxy: [{
    //  'context' :['/api'],
    //  'target': 'https://test.zhiyeinfo.com/api',
    //  'changeOrigin': true
    // }],
    // hotOnly: true,
    hot: true,
    open: true,
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
  },
  plugins: [
    AutoImport({
      imports: ["react","react-router-dom"],
    }),
    new ReactRefreshWebpackPlugin({overlay: false}),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      "process.env.BUILD_TYPE": JSON.stringify("webpack"),
      __DEV__: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, "src/public/assets"),
          to: resolve(__dirname, "dist/assets"),
          // ignore: ['.*']
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: "src/index_webpack.html",
      filename: "index.html",
      favicon: "src/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ].filter(Boolean),
  module: {
    //  编译模式
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            plugins: [import.meta.resolve("react-refresh/babel")].filter(Boolean),
          },
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]"
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]"
        }
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]"
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
        type: "asset/inline",
        generator: {
          filename: "[name].[ext]"
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
        type: "asset/resource",
        generator: {
          filename: "[name].[ext]"
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
        test: /\.css|\.scss$/,
        // exclude: /node_modules/, //排除这个文件夹
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // importLoaders: 2,
              // modules: true,
              // // namedExport: true, // this is  invalid Options ,I find it
              // camelCase: true,
              // localIdentName: '[path][name]__[local]--[hash:base64:5]',
              sourceMap: true,
              url: false
            }
          }, {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  atImport({ path: join(__dirname, "src`") }),
                  autoprefixer(),
                  postcssPxtorem({
                    rootValue: 16,
                    unitPrecision: 5,
                    propList: ["*"],
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
                webpackImporter: false,
                indentWidth: 4,
                includePaths: [resolve(__dirname, "src", "scss"),"node_modules"],
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
export default config;
