# 项目结构说明

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

> 1、Model、Service、View建议分模块(一一对应)，让结构更加清晰
>
> 2、每个View下的文件下的index.js是webpack打包入口文件，也是启动文件。