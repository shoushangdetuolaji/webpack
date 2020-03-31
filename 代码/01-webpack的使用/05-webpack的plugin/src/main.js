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

// 5.使用vue
import Vue from 'vue'
import App from './vue/App.vue' // app.vue组件   export default { } 大括号这种 引用的时候可以自定义起名字

new Vue({
    el:'#app',//挂载index.html
    template:'<App/>',
    components:{
        App
    }
})

document.writeln('<h2>你好啊,拖拉机</h2>')
