<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量&nbsp;
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addTopShop()">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架时间：{{goodsinfo.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="getComment(id)" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../news/subcomponents/swiper.vue";
import numbox from "../news/subcomponents/goodsInfoNumber.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballflag: false,
      selectecount: 1
    };
  },
  created() {
    this.getlunbo();
    this.getGoodsInfo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    getComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addTopShop() {
      this.ballflag = !this.ballflag;
      //{id:商品id，count:购买数量,price:商品单价,selected:false}
      var goodsinfo = {
        id: this.id,
        count: this.selectecount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const bagePosition = document
        .getElementById("bage")
        .getBoundingClientRect();
      const xDist = bagePosition.left - ballPosition.left;
      const yDist = bagePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballflag = !this.ballflag;
    },
    getSelectedCount(count) {
      this.selectecount = count;
      console.log("faf" + this.selectecount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card {
    margin: 5px 10px;
  }
  .now_price {
    font-weight: 700;
    color: red;
  }
  .mui-card-content {
    p {
      margin-top: 4px;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    z-index: 999;
    top: 380px;
    left: 138px;
  }
  .mui-card-header {
    font-size: 16px;
  }
}
</style>
