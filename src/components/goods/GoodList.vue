<template>
    <div class="good-list">
        <div class="good-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodslist: []
        }
    },
    created() {
        this.getGoodList()
    },
    methods: {
        getGoodList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result =>{
                if(result.body.status ===0){
                    //this.goodslist = result.body.message
                    this.goodslist = this.goodslist.concat(result.body.message)
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodList()
        },
        getDetail(id){
            this.$router.push({ name: "goodsinfo", params: { id } });
        }
    },
}
</script>

<style lang="scss" scoped>
.good-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    
    .good-item{
        padding: 2px;
        width: 49%;
        border: 1px solid #ccc;
        box-shadow:  0 0 8px #ccc;
        margin: 3px 0;
        border-radius: 0 0 4px 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #ccc;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: 600;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size:  13px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }

        }
    }
}
</style>
