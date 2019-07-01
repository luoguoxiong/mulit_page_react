# 关于 _Multi_page_react_

> 1、基于*webpack*构建工具，搭建多页与单页结合的**_React_**应用级脚手架。
>
> 2、数据层基于*Dva*，实现各单页的数据管理及路由管理。
>
> 3、使用*localStorage*与*dva*完美结合，实现了多页之间的优雅通信方式。
>
> 4、多页与（路由，组件）按需加载结合，构建高性能应用。

##### 多单页开发环境（http://localhost:3100/）

```sh
npm run dev
```

##### 线上打包一

```sh
npm run build
```

##### 线上打包二  （需配置CDN）

```SH
npm run build_publish
```

#### 文件夹目录

```
multi_page_react
├─ webpack
	├─ template.html                     html模板
    ├─ webpackEntry.js                   webpack.entry
    ├─ webpackHtml.js                    webpack.html
    ├─ withPath.js                       webpack文件夹解析器
├─ webpack.config.js                     webpack入口文件
├─ cdn.js                                cdn上传脚本
└─ app
    ├─ Common                            公共方法
    ├─ Component                         全局组件
    ├─ Modle                             数据层
    	├─ index				
    	├─ todo
    	├─ index.js				
    ├─ Service                           交互层
    	├─ index
    	├─ todo
    	├─ index.js
    ├─ View                              视图
    	├─ index
    		├─ component                 首页模块组件
        	├─ Routers                   首页模块路由
        	├─ index.js                  首页模块入口（需引入app.js）
        	├─ pageinfo.json             页面信息
    	├─ todo
    ├─ static                            静态文件
    ├─ app.js                            连接Model与view
```

#### End

> - 如果对你有帮助，帮忙点个 Star 吧!
> - 欢迎你们的issure来袭，如果有宝贵意见欢迎发送邮件至1025558554@qq.com
> - Thanks!