# multi_page_react

> 1、此项目使用多页与单页结合、按需引入路由与组件、webpack提取公共代码，解决了单页Spa的首屏白屏时间过长的问题！
>
> 2、具备与create-react-app一样的热更新，让我们拥抱良好的开发体验。
>
> 3、通过package.json配置cdn,轻松使用CDN加速~

#####  多单页开发环境（http://localhost:3100/）

```sh
npm run dev
```

##### Node中间层开发环境(未集成)（http://127.0.0.1:3118/）

```sh
npm run build
npm run start
```

##### 线上打包一（需配置CDN）

``` sh
npm run build_publish
```

##### 线上打包二  （没有配置CDN）

```SH
npm run build
```

#### 1、文件夹目录

```
multi_page_react
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .babelrc
├── webpack
	├── template.html
    ├── webpackEntry.js
    ├── webpackHtml.js
    ├── withPath.js
├── webpack.config.js
├── www.js
└── src
    ├── Common
    ├── Module
    ├── static
```

#### 2、文件说明

#####   1. webpack/template.html

> 功能：webpack使用HtmlWebpackPlugin的模板文件
>
> 用于：在webpack/webpackHtml.js中使用

#####   2. webpack/withPath.js

> 功能：文件夹解析器
>
> 用于：将src/Module文件解析后，交给webpack/webpackHtml.js与webpack/webpackEntry.js中使用

##### 3.webpack/webpackEntry.js

> 功能：webpack多入口生成器
>
> 用于：webpack.config.js

##### 4.webpack/webpackHtml.js

>功能：生成webpack的html模板
>
>用于：将src/Module的pageinfo.json的配置文件映射到html模板中

##### 5.webpack.config.js

> webpack打包配置文件
>
> 主要使用了：多入口、devServer（配置代理proxy、热更新）、CleanWebpackPlugin（清除打包文件）、CopyPlugin（复制静态文件与打包目录中）、MiniCssExtractPlugin（CSS文件打包优化）、optimization（优化打包）、BundleAnalyzerPlugin（分析打包插件）

##### 6.src/Common

> 该文件夹是全局的公共方法，使用了webpack.optimization.splitChunks.cacheGroups提取出来生成common.js。

##### 7. src/Module

> 各单页模块的入口
>
> 注：必须要创建index.js,因为每个webpack的entry都是以index.js为入口。

##### 8.src/static

> webpack配置的静态文件

#### 3、Redux(考虑如何实现中。。)

> 由于分了多模块形成的多页的单页应用，如何解决多页之间的通信？
>
> 1、各模块内部使用redux进行通信
>
> 2、各模块之间使用window.localStorage进行通信？（还在考虑。。。）
>
> 3、我打算将src下，创建一个公共Store,然后各模块引入，使用本地存储reducer信息。保证各模块的通信，你们觉得如何呢？（需要琢磨。。。）

#### End

> - 如果对你有帮助，帮忙点个 Star 吧!
> - 欢迎你们的issure来袭，如果有宝贵意见欢迎发送邮件至1025558554@qq.com
> - Thanks!