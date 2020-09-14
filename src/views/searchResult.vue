<template>
  <div id="searchResult">
    <!-- 顶部搜索框 -->
    <!-- @click-right="toSearchResult" -->
    <!-- $router.push({name:'SearchPage'}) -->
    <van-nav-bar fixed title="标题" left-text="返回" @click-left="$router.go(-1)">
      <template #right>
        <div class="img-box">
          <img class="auto-img" src="../assets/images/search-icon9.png" />
        </div>
      </template>
      <template #title>
        <van-search v-model="query" placeholder="请输入您想查找的商品" @click="goSearchPage"/>
      </template>
      <template #left>
        <!-- <i class="fa fa-angle-left" aria-hidden="true"></i> -->
        <van-icon name="arrow-left" size="16" />
      </template>
    </van-nav-bar>

    <div class="select-list clearfix">
      <div
        :key="index"
        v-for="(item,index) in selectData"
        :class="item.checked ? 'active' : ''"
        class="select-item fl"
      >{{item.name}}</div>
    </div>

    <div class="goods_list">
      <!-- <div class="goods_item">
        <div class="left-part fl">
          <img
            src="http://image1.suning.cn/uimg/b2c/newcatentries/0000000000-000000000740439998_1_400x400.jpg"
            class="auto-img"
          />
        </div>
        <div class="right-part fl">
          <div class="title two-wrap">紫米ZMI 小米QC3.0快充车充 5V2.4A双USB智能输出 一拖二手机平板通用汽车充电器 AP821 银色</div>
          <div class="bottom-mes">
            <div class="tips">全新，24小时内发货，次日抵达</div>
            <div class="price">
              ￥
              <span>199</span>
            </div>
            <div class="details">
              <span>200+评价</span>
              <span>99%好评</span>
            </div>
            <div class="store-name">kilo自营旗舰店</div>
          </div>
        </div>
      </div> -->
      <div @click="toDetail(item)" class="goods_item" v-for="(item,index) in searchGoodsData" :key="index">
        <div class="left-part fl">
          <img
            :src="item.goods_small_logo  == '' ? no_image : item.goods_small_logo "
            class="auto-img"
          />
        </div>
        <div class="right-part fl">
          <div class="title two-wrap">{{item.goods_name}}</div>
          <div class="bottom-mes">
            <div class="tips">全新，24小时内发货，次日抵达</div>
            <div class="price">
              ￥
              <span>{{item.goods_price}}</span>
            </div>
            <div class="details">
              <span>200+评价</span>
              <span>99%好评</span>
            </div>
            <div class="store-name">kilo自营旗舰店</div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-box" v-if="searchGoodsData.length == 0">
          <div class="img-box">
            <img src="@/assets/images/no-search.png" class="auto-img" />
          </div>
          <div class="tips">搜索不到相关商品~</div>
          <div class="btn-box">
            <div class="btn-empty" @click="$router.go(-1)">返回</div>
          </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/searchResult.less";
// import no_image from '../assets/images/no-image.png';
export default {
  data() {
    return {
      selectData: [
        { name: "综合", checked: true },
        { name: "销量", checked: false },
        { name: "价格", checked: false },
        { name: "筛选", checked: false }
      ],
      searchGoodsData:[
          
      ],
      no_image: require('../assets/images/no-image.png'),
      query:''
      
    };
  },
  created() {
    this.getSearchGoodsData();
  },
  methods: {
    getSearchGoodsData() {
        // 
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      let params = this.$route.query;
      this.query = this.$route.query.query;
      this.$toast;
      this.axios({
        method: "GET",
        url: "/goods/search",
        params
      })
        .then(res => {
          this.$toast.clear();
          
          if(res.status == 200){
              this.searchGoodsData = res.data.message.goods.concat([]);
            //   
            // 
          }
        })
        .catch(err => {
          this.$toast.clear();
          
        });
    },
    goSearchPage(){
        this.$router.push({name:'SearchPage',query:{query:this.query}})
    },
    // 先加载再进行路由跳转
    toDetail(item){
        let params = {goods_id : item.goods_id};
         this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true
        });
        this.axios({
          method: "GET",
          url: "/goods/detail",
          params
        }).then(res=>{
            this.$toast.clear();
            if(res.status == 200){
                this.$router.push({name:'GoodsDetails',query:{res:JSON.stringify(res)}})
            }else{
                this.$toasy("商品失效")
            }
        }).catch(err=>{
            this.$toast.clear();
            this.$toasy("商品失效")
        })
    }
  }
};
</script>

<style lang="less" scoped>
</style>