const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js',
        publicPath:'dist/'
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
    }
}