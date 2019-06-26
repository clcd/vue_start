// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state:{
        car: car, //{id:商品id，count:购买数量,price:商品单价,selected:false}
        count: 0
    },
    mutations:{
        addToCar(state,goodsinfo){
            var flag = false //假设购物车没有找到对应的商品

            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count +=parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }
            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id){
            state.car.some((item,i) =>{
                if(item.id == id){
                    state.car.splice(i,1)
                    console.log('ok')
                    
                    return true
                }
            })
            //将删除完毕后的，最新购物车数据，同步到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        
    },
    
    getters:{
        getAllCount(state){
            var c = 0
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAnd(state){
            var o = {
                count:0, //勾选的数量
                amnout:0 //勾选的总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count
                    o.amnout += item.price * item.count
                }
            })
            return o
        }
    }
})
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

import router from './router.js'

//import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
//Vue.use(Lazyload);

//Vue.component(Header.name, Header)
//Vue.component(Swipe.name, Swipe)
//Vue.component(SwipeItem.name, SwipeItem)
//Vue.component(Button.name, Button)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import './lib/css/global.css'

import app from './App.vue'
import moment from 'moment';
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})

console.log('OK')