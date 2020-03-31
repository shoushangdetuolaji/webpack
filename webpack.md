---
typora-root-url: img
---

*下载到本地用的，这里的图片路径./img，防止线上图片挂掉了*

## 目录

- 初始webpack
- webpack的安装
- webpack的起步
- weppack的配置
  - 特殊情况--项目
  - 关于package.json的知识
- loader的使用
  - css文件的配置
  - less文件的配置
  - 图片文件的处理
  - *特殊情况
  - es6语法处理
- *webpack中配置Vue
- plugin的使用
  - 添加版权的plugin
  - 打包html的plugin
  - js压缩的plugin
- 搭建本地服务器
  - 注意事项
    - webpack配置文件的分离







## 初始webpack

本质上，webpack是一个现代的JavaScript应用的静态模块打包工具。

介绍：省略

![](.\1.png)



前端模块化：

方案有 AMD , CMD , CommonJS ， ES6（浏览器支持）

webpack都支持以上方案



## webpack的安装

我的知识范畴是，webpack模块化打包，webpack依赖node环境。

node有很多npm包【安装nodejs会带npm工具】



如何安装nodejs?

> 不做描述



全局安装webpack

看了一个老师指定了版本3.6.0 因为vue-cli2依赖这个版本

```shell
#先查看是否安装webpack 成功返回版本号 不成功显示不是内部程序
webpack --version

#全局 安装指定版本 或者 安装最新 2选1
npm install webpack@3.6.0 -g
npm install webpack -g

#局部安装webpack(以后对应项目需要)
npm install webpack --save-dev 
```

-g 表示全局 --save-dev开发时依赖，项目打包后不需要继续使用



- 在终端直接执行webpack命令，使用的全局安装的webpack
- 当在package.json中定义了scripts时，其中包含了webpack命令，那么使用的是局部webpack





## webpack的起步

先看文件目录：

![](/4.png)



如何使用：

```javascript
//mathUtils.js
function add(num1,num2){
    return num1+num2
}
function mul(num1,num2){
    return num1*num2
}

module.exports={
    add,
    mul
}

//info.js
export const name='tuolaji'
export const age=18
export const height=1.78


//main.js  主文件
// 1.使用commonjs的模块化规范
const {add,mul} = require('./mathUtils.js')

console.log(add(20,30))
console.log(mul(20,30))

// 2.使用es6的模块化的规范
import {name,age,height} from './info'
console.log(name);
console.log(age);
console.log(height);

```



然后在对应目录下进行打包

```shell
#打包命令
#webpack 需要打包的文件   被打包成的文件
webpack ./src/main.js ./dist/bundle.js

```

![](/3.png)



在index页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<!--这里引用打包后的文件-->
<script src='./dist/bundle.js'></script>
</body>
</html>
```



注意：对原生的文件有修改的话 也要重新webpack打包一次





## webpack的配置

就多了一个webpack.config.js的配置文件

具体目录是这样的

![](/5.png)

```javascript
const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js'
    }
}
```

直接命令

```shell
webpack
```

![](/6.png)

#### 特殊情况--项目

具体项目初始化 使用package.json

```shell
npm init

####一下操作
package name: (02-webpack的配置) meetwebpack
version: (1.0.0)
description:
entry point: (webpack.config.js) index.js
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\Users\jamie lee\Desktop\webpack\代码\01-webpack的使用\02-webpack的配置\package.json:

{
  "name": "meetwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

然后回生成一个叫package.json文件

```shell
#安装初始依赖
npm install

#在项目安装webpack依赖
npm install webpack@3.6.0 --save-dev
```

安装成功后 package.json会新增依赖 也多了node_modules模块

在package.json

前![](/7.png)



后![](/8.png)

--这是开发需要的依赖--save-dev

**注意** 

- 直接 `webpack`是全局打包
- 在项目中肯定要优先项目里的打包呀 ，所以有一下操作 **定义启动**

![](/9.png)

​    再来一条 `npm run build`  *可编辑 根据scripts脚本来定义*

这样是根据项目里的打包 所谓局部

其实等同于在终端运行`.node_modules/.bin/webpack` 这个肯定不够上面的方便呀

效果图:

![](/10.png)



#### 关于package.json的知识

- 可以在package.json的scripts中定义自己的执行脚本
- package.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置
  - 首先会寻找本地的node_modules/.bin路径中对应的命令
  - 如果木有找到，会去全局的环境变量中寻找



## loader的使用

> 中文文档  https://www.webpackjs.com/loaders/



loader是webpack的一个概念

使用过程：

- 通过npm安装需要使用的loader
- 在webpack.config.js中的modules关键字下进行配置



#### css文件的配置

> 文档: https://www.webpackjs.com/loaders/css-loader/

- [`style-loader`](https://www.webpackjs.com/loaders/style-loader) 将模块的导出作为样式添加到 DOM 中
- [`css-loader`](https://www.webpackjs.com/loaders/css-loader) 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码

项目目录:

![](/11.png)

注意src目录的划分命名 而且main.js是入口文件 建议放在外面

```javascript
//main.js

// 1.使用commonjs的模块化规范
const {add,mul} = require('./js/mathUtils.js')

console.log(add(20,30))
console.log(mul(20,30))

// 2.使用es6的模块化的规范
import {name,age,height} from './js/info'
console.log(name);
console.log(age);
console.log(height);

// 3.依赖css文件
require('./css/normal.css') 

```





安装:

```shell
npm install --save-dev css-loader
npm install --save-dev style-loader
```

在webpack.config.js 添加配置

```javascript
const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js'
    },
    //添加这一段
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}
```

打包

```shell
npm run build
```





#### less文件的处理

less scss stylus都属于css 只是风格不一样 起码掌握一种css风格是比较好的 我就用过less

> 中文文档  https://www.webpackjs.com/loaders/less-loader/



安装:  



```shell
#less 是个css预处理语言 less-loader是个转译工具 
#我的理解[有误纠正]
npm install less less-loader --save
```

webpack.config.js配置  **要学会查看文档**

```javascript
const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            //添加了这里
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
        ]
    }
}
```

注意：user[]按需打包是从后到前，从右到左循序打包的，一定注意顺序否则会error。



在入口文件main.js的导入

```javascript
// 1.使用commonjs的模块化规范
const {add,mul} = require('./js/mathUtils.js')

console.log(add(20,30))
console.log(mul(20,30))

// 2.使用es6的模块化的规范
import {name,age,height} from './js/info'
console.log(name);
console.log(age);
console.log(height);

// 3.依赖css文件
require('./css/normal.css')

// 4.依赖less文件
require('./css/special.less')

document.writeln('<h2>你好啊,拖拉机</h2>')

```

打包:

```shell
npm run build
```



文件的目录:

![](/12.png)





#### 图片文件的处理

> ​	文档 https://www.webpackjs.com/loaders/url-loader/

安装:

```shell
npm install --save-dev url-loader
```

webpack.config.js

```javascript
rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192， //文件大小限制 主要看自己图片的多少kb咯 这里好像是8kb
              name:'img/[name].[hash:8].[ext]' //目录img[name]+8位哈希+扩展名 这里的name指文件原名
            }，
            
          }
        ]
      }
    ]
```

normal.css

```css
body{
    /* background-color: aquamarine; */
    background:url("../img/1.png");
}
```





打包:

```shell
npm run build
```

最终图片会变成base64格式

![](/13.png)

开发本地图片被打包编译成base54还是挺不错的！



#### *特殊情况



cannot file loader 这个 报错

原因图片limit被大了

人话：加载的图片 大于limit时，需要使用file-loader模块进行加载

解决办法

安装:

```shell
npm install file-loader --save-dev
```

修改webpack.config.js配置

![](/14.png)

因为：打包的图片文件名会在dist目录下 ${哈希}.jpg|png

*你们注释上一级句话再打包一次 图片路径会报错，原因是f12 查看404就是路径问题，所以要添加那句话【这个我不明说 自己动手看结果】*



其实有这种问题也可以避免 只要把index.html放在dist目录下 就不需要以上操作了。 掌握这个问题也很好，就知道为啥打包后的index都会放在dist目录。【用过vue-cli的人都会知道的为什么】



人话：打包的文件都是放在dist目录的，而index需要引用的url，src需要再同一个目录下，所以可以吧index放在dist目录下 也可以在配置中添加publicpath。

![](/15.png)

这是根据以上配置  '/img/[name].[hash:8].[ext]'打包的文件



#### ES6语法处理





> 文档: https://www.webpackjs.com/loaders/babel-loader/

阅读webpack打包的js文件，会发现写的es6语法并没有转成es5，那么以为这一些对es6还支持的浏览器不能运行 

就是避免了个万一 微信小程序开发者工具都有 es6=》es5的功能

安装： 

```shell
#这是豪哥喜欢的版本[doge]
#按照官方文档来 也是没错的
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

配置webpack.config.js文件

```javascript
//这是我喜欢的写的配置
//安装官网的依赖 就按照的官网的配置 
{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, //exclude排除的意思 反义词Include
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015'] //这里和官网不同 因为我安装了preset-es2015
                  }
                }
              }
```

打包:

```shell
npm run build
```

具体效果：

查看dist目录下的bundle.js `ctrl+f`会找不到const和let这样的声明变量，因为转变为了var了



## *webpack中配置Vue

> 官方文档  https://cn.vuejs.org/index.html

vue是spa(simple page webapplication)单页面应用，通过vue-router处理 路由跳转页，所以index.html基本结构不是不变的，不需要动他。（接触完vue，你就会懂了嘿嘿）



安装vue三种方式

1. 直接下载应用
2. CDN映入
3. npm安装 【不是开发时依赖 所以不需要-dev】

安装:

```shell
npm install vue --save
```

留个伏笔：

- runtime-only =>代码中，不可以有任何的template
- runtime-compiler =>代码中，可以有template，因为compiler可以用于编译template

webpack.config.js配置

```javascript
const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js',
        publicPath:'dist/'
    },
    module:{
        //这里省略了 偷个懒
    },
    //添加这部分
    resolve:{
      extensions:['.js','.css','.vue'], //省略文件后缀名
      alias:{//alias:别名
        'vue$':'vue/dist/vue.esm.js'
      }
    }
}
```

上面是还不够的

安装vue的文件和格式

```shell
#vue-loader用13.0.0不会报错 还没找到解决办法 懒
#反正以后用脚手架 问题不大 用不到这样的vue的webpack
npm install vue-loader@13.0.0 vue-template-compiler --save-dev
```

配置webpack.config.js

```js
module.exports={
    ...
    module:{
		rules:[
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
	}
}

```

打包：

```shell
npm run build
```

具体文件结构 查看代码 *04-webpack配置vue*





注意：vue-cli3.x脚手架已经含有webpack了

## plugin的使用

plugin是插件的意思，通常用于对某个现有的架构进行扩展

webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。



loader和plugin的区别

- loader主要用于转换某些类型的模块，是一个转换器。
- plugin是插件，它是对webpack本身的扩展，是一个扩展器。



#### 添加版权的plugin



插件名字叫BannerPlugin 属于webpack自带的插件。

栗子：

![](/16.png)



配置:

![](/17.png)

打包重新查看bundle.js

`npm run build`

![](.\18.png)



#### 打包html的plugin

真实发布项目时，发布的是dist文件夹中的的内容。

HtmlWebpackPlugin插件

- 自动生成1个index.html文件(可以指定模板来生成)
- 将打包的js文件，自动通过script标签插入到body中（爽）



安装:

```shell
#现在是wepack4版本 我用的是webpack3 所以这个插件用3.x.x版本
npm install html-webpack-plugin@3.2.0 --save-dev
```

配置webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    ...
    plugins:[
      new webpack.BannerPlugin('网园页面前端webpack学习笔记'),
      new HtmlWebpackPlugin({
        template:'index.html'
      }) //根据index.html模板生成！！
    ]
}

```

注意：

使用这个插件的话

- 需要把之前的webpack.config.js中output的publicPath注释掉 
- 根据Index.html作为模板

![](.\19.png)

![](.\20.png)



这里的tempalte表示根据什么模板来生成index.html，需要删除之前在output中添加的publicPath属性，否则插入的script标签中的src可能会有问题。

打包:

```shell
npm run build
```

访问：

/dist/index.html



#### js压缩的plugin

项目发布之前，必须要对js等文件进行压缩处理

第三方插件uglifyjs-webpack-plugin 版本号指定1.1.1和cli2保持一致

安装:

```shell
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

修改webpack.config.js配置

```javascript
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports={
    ...
    plugins:[
      new webpack.BannerPlugin('网园页面前端webpack学习笔记'),
      new htmlWebpackPlugin({
        template:'index.html'
      })， //根据index.html模板生成！！
      new uglifyJsPlugin() //多了这一行
    ]
}

```

打包:

```
npm run build
```

效果:

自行查看/dist/bundle.js 防止被白嫖源码 不过可以反编译的嘿嘿



## 搭建本地服务器

其实换句话说，将项目在生产环境中运行，不用每次更新打包才能看，也就是vue-cli的代码更新后实时监听页面效果。



webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。

安装:

```shell
#2.9.1版本适合我wepack3和vue2.x
npm install --save-dev webpack-dev-server@2.9.1
```

devserver:

- contentBase:文件夹提供本地服务，默认根文件夹。
- port:端口号  不填默认8080
- inline:页面实时刷新
- historyApiFallback:在spa页面中，依赖html5的history模式

配置webpack.config.js

```javascript
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports={
    ...
	devServer:{
        contentBase:'./dist',
        inline:true
    }
}

```



修改package.json

![](.\21.png)

自动打开浏览器

`"dev":"webpack-dev-server --open"`

这是启动的命令



启动命令:

```shell
npm run dev
```

效果:

![](.\22.png)



这个就不用重新打包了，直接在ide修改代码保存，再去浏览器看到页面的刷新==>脚手架的npm run serve本质是一样的。



#### 注意事项

在开发阶段不需要 **压缩js代码** -->最终生产环境就再来压缩

不需要的时候就注释掉plugin=>new uglifyjsWebpackPlugin()

最终上线的时候把 devServer:{} 注释掉也行



##### webpack配置文件的分离

安装:

```shell
#这个模块 是为了合拼配置 base+dev/base+prod
npm install webpack-merge
```

可以参考06-webpack配置分离和05的区别



将webpack.config.js抽离3份放到build目录下

![](.\23.png)



base.config.js base就是 基础地方大家有

```javascript
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'../dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 13000, //文件大小
                      name:'img/[name].[hash:8].[ext]'
                    },
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, //exclude排除的意思 反义词Include
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015']
                  }
                }
            },
            {
              test:/\.vue$/,
              use:['vue-loader']        
            }
        ]
    },
    resolve:{
      extensions:['.js','.css','.vue'],
      alias:{//alias:别名
        'vue$':'vue/dist/vue.esm.js'
      }
    },
    plugins:[
      new webpack.BannerPlugin('网园页面前端webpack学习笔记'),
      new HtmlWebpackPlugin({
        template:'index.html'
      })
    ]
}
```

dev.config.js 是开发环境 言外之意生产环境不需要的

```javascript
//开发的依赖
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports=webpackMerge(baseConfig,{
    devServer:{
      contentBase:'./dist',
      inline:true
    }
})
```

prod.config.js 生产环境 言外之意不需要开发环境的配置

```javascript
//生产环境
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig,{
    plugins:[
        new uglifyJsPlugin()
    ],
})
```

基于配置位置发生变化 package.json需要修改scripts

![](.\24.png)