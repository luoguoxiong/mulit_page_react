const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')

const marked = require('marked')
const markdownRenderer = new marked.Renderer()

const createHtml = require('./webpack/webpackHtml')
const getEntry = require('./webpack/webpackEntry')
const entry = getEntry('./app/View')
const htmlArr = createHtml('./app/View')

// webpack配置
const config = {
  entry: {
    ...entry
  },
  output: {
    publicPath: process.env.CDN_PATH || '',
    path: path.join(__dirname, 'build'),
    filename: `./[name]/index.js?v=${process.env.VERSION || ''}`,
    chunkFilename: `./js/[name].js?v=${process.env.VERSION || ''}`
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              { plugins: ['@babel/plugin-proposal-class-properties'] }
            ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
        options: {
          publicPath: '/'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        query: {
          limit: 100000, // 10k
          name: 'svgs/[name].[ext]?v=[hash:8]'
        }
      },
      // Markdown
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer: markdownRenderer
            }
          }
        ]
      }
    ]
  },
  // 热更新配置
  devServer: {
    port: 3100,
    open: true,
    //解决跨域
    proxy: {
      '/': {
        target: 'http://localhost:3118',
        changeOrigin: true
      }
    }
  },
  // 根文件目录配置
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@Modle': path.resolve(__dirname, './app/Modle'),
      '@View': path.resolve(__dirname, './app/View'),
      '@Service': path.resolve(__dirname, './app/Service'),
      '@Common': path.resolve(__dirname, './app/Common'),
      '@Component': path.resolve(__dirname, './app/Component')
    }
  },
  plugins: [
    // 打包前先清空之前配置
    new CleanWebpackPlugin('build/*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),

    // 把copy静态文件
    new CopyPlugin([
      {
        from: __dirname + '/app/static',
        to: __dirname + '/build/static'
      }
    ]),

    // html插件数组
    ...htmlArr,

    //分离css插件
    new MiniCssExtractPlugin({
      filename: `./[name]/index.css?v=${process.env.VERSION || ''}`,
      chunkFilename: `./css/[id].css?v=${process.env.VERSION || ''}`
    })
  ],

  optimization: {
    minimizer: [
      //压缩js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ],

    // 代码分割处理
    splitChunks: {
      //压缩css
      cacheGroups: {
        // 如果你需要提取全局样式，可以在这里进行配置
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true
        // },

        // markdown>vendor
        editor: {
          name: 'for-editor',
          test: /[\\/]node_modules[\\/](for-editor)[\\/]/,
          chunks: 'all',
          minSize: 0,
          priority: -10
        },

        // 把node——modules打包到公共文件vendor下
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -11
        },

        // 把src/common公共文件打包到common下
        common: {
          test: /[\\/]Common[\\/]/,
          name: 'common',
          chunks: 'all',
          minSize: 0,
          priority: -20
        }
      }
    }
  }
}
// dev不使用BundleAnalyzerPlugin
if (process.env.BundleAnalyzer) {
  config.plugins.push(
    // 打包可视化
    new BundleAnalyzerPlugin()
  )
}
module.exports = config
