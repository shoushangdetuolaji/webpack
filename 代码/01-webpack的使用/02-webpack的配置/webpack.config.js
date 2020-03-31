const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{              //出口文件
        path:path.resolve(__dirname,'dist'), //其实path:__dirname+'/dist', 还不需要引入path包呢
        filename:'bundle.js'
    }
}