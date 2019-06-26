<template>
    <div class="shopCar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>  
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>

            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner buy">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>以勾选商品 <span class="red">{{ $store.getters.getGoodsCountAnd.count }}</span> 件，总价
                            <span class="red">￥{{ $store.getters.getGoodsCountAnd.amnout }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
                    
				</div>
			</div>
        </div>
        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>


<script>
import numbox from '../news/subcomponents/shopCarNumber.vue'
export default {
    data() {
        return {
            goodslist:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            //获取到store中所有商品的id。然后拼接出一个用逗号分隔的字符串
            var idArr = []
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id)
            })
            if(idArr.length <= 0){
                return
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result =>{
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            })
        },
        remove(id, index){
            this.goodslist.splice(index, 1)
            this.$store.commit('removeFormCar',id)
        },
        selectedChanged(id,val){
            //每当点击开关把最新的开关状态更新到store中去
            //console.log(id+'--------'+val)
            this.$store.commit('updateGoodsSelected',{id:id, selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopCar-container{
    background-color: #eee;
    .goods-list{
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 14px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
            }
        }
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
    }
    .buy{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: 700;
        }
    }
}    
</style>