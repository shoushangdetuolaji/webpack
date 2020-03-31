//生产环境
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig,{
    plugins:[
        new uglifyJsPlugin()
    ],
})