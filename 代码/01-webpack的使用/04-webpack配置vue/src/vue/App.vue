<template>
    <div>
        <h2 class="title">{{message}}</h2>
        <button @click="btnClick">button</button>
        <h2>{{name}}</h2>
        <Cpn />
    </div>
</template>

<script>
//引用组件
//import Cpn from './Cpn.vue' //这是没配置webpack.config.js 不能省略的写
import Cpn from './Cpn' //这是配置好resolve的extensions 就可以省略文件后缀名
export default {
    name:"App",
    components:{
        Cpn
    },
    data(){
        return{
            message:'hello webpack',
            name:'拖拉机'
        }
    },
    methods:{
        btnClick(){
            console.log('button click')
        }
    }
}
</script>

<style scoped>
    .title{
        color:blueviolet;
    }
</style>