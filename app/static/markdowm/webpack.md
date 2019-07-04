# webpack从零开始

>  webpack由entry（入口）、output(出口)、loader(编译？)、plugin(插件)、model（模式）组成。

> 打包前

```sh
multi_page_react
└─ app
    ├─ View                              视图
    	├─ index
    	├─ todo
    ├─ static                            静态文件
```

> 打包后

```sh
multi_page_react
 └─ build                                打包目标文件夹
     ├─ static                           静态文件
     ├─ index                            首页模块 
         ├─index.js                      首页的js
         ├─index.css                     首页的css
     ├─ todo                             todo模块 
         ├─index.js                      todo的js
         ├─index.css                     todo的css
         ├─index.html 
    ├─ css                               异步加载的css或者提取公共css
    ├─ js                                异步加载的js或者提取公共的js
    ├─ index.html                        希望能够通过localhost:xxx直接访问首页
    
```

> 期望值：multi_page_react/app/view每个模块的东西打包成mulit_page_react/build目标文件目录

#### 一、[entry入口](https://webpack.docschina.org/concepts/entry-points/)

> 1.webpack.entry支持单入口跟单入口，根据上述的期望值，所以需要使用多入口来处理。
>
> 2.在multi_page_react/app/view下的每个文件夹建立一个index.js作为入口

##### 1.webpack/widthPath.js(文件夹解析器)

> 过滤multi_page_react/app/view的每个文件夹有入口文件index.js

```javascript
const fs = require('fs')

/**
 * 【遍历某文件下的文件目录】
 *  return array
 */
module.exports = function withPath(path) {
  let existpath = fs.existsSync(path) //是否存在目录
  if (existpath) {
    let readdirSync = fs.readdirSync(path) //获取目录下所有文件
    // 过滤被选文件夹中有文件作为入口
    return readdirSync.filter(item => {
      let currentPath = path + '/' + item
      // 判断是否是文件夹
      let isDirector = fs.statSync(currentPath).isDirectory()
      if (isDirector) {
        try {
          // 是否有入口文件index.js
          return fs.readdirSync(currentPath).includes('index.js')
        } catch (e) {
          return false
        }
      } else {
        return false
      }
    })
  }
}
```

##### 2.webpack/webpackEntry.js(webpack多入口生成器)

```javascript
const withPath = require('./withPath')
module.exports = function getEnty(path) {
  let entry = {}
  withPath(path).map(item => {
    entry[`${item}`] = `${path}/${item}/index.js`
  })
  return entry
}
```

##### 3.webpack.entry

```javascript
const getEntry = require('./webpack/webpackEntry')
const entry = getEntry('./app/View')
```

#### 二、[output输出](https://webpack.docschina.org/concepts/output/)

##### 1.webpack 的打包出口配置

```javascript
const output = {
    publicPath: process.env.CDN_PATH || '',
    path: path.join(__dirname, 'build'),
    filename: `./[name]/index.js?v=${process.env.VERSION || ''}`,
    chunkFilename: `./js/[name].js?v=${process.env.VERSION || ''}`
  }
```

> publicPath: 打包后，资源文件索引的前缀，可用来配置CDN的地址
>
> path: 打包输出目标文件夹
>
> filename: 每个入口打包输出的配置名，[name]（入口名）
>
> chunkFilename：每个异步加载的js或者提取公共的js的输出配置名
>
> process.env.VERSION：package.json的配置版本号

#### 三、[loader](https://webpack.docschina.org/concepts/loaders/)

> webpack通过设置loader,支持对jsES6+、sass、less、图片、md文件的打包编译，你可以根据实际情况配置需要的loader。

#### 四、[plugins](https://webpack.docschina.org/concepts/loaders/)

> 处理loader解决不了的问题，multi_page_react主要用了clean-webpack-plugin、copy-webpack-plugin、optimize-css-assets-webpack-plugin、mini-css-extract-plugin、webpack-bundle-analyzer、html-webpack-plugin插件。具体功能，可在npm查询具体功能。

#### 五、[optimization(优化)](https://webpack.docschina.org/configuration/optimization/)

> webpack4新增的优化解决方案,提取公共代码，压缩代码，代码分割。
>
> 1、将node_modules下的dva、react、react-dom提取公共代码包为vendor。
>
> 2、把上述node_modules外的包的提取为otherVendor（可根据实际情况下调整）。
>
> 3、将app/common提取公共函数类的包为common。（可根据需求，提取其他包）

```javascript
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
      cacheGroups: {
        // markdown>vendor
        otherModules: {
          name: 'otherVendor',
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
```

