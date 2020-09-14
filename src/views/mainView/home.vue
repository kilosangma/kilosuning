<template>
  <div id="home">
    
    <van-search placeholder="请输入搜索关键词" @click="$router.push({name:'SearchPage'})"/>
    <img class="auto-img" src="https://image1.suning.cn/uimg/cms/img/159525821159923463.jpg?from=mobile">
    <div class="banner radius">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swiperData" :key="index"> 
          <img :src="item.image_src" class="auto-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="Catitems radius">
      <div class="classify-item" v-for="(item,index) in catitems" :key="index">
        <img class="auto-img" :src="item.image_src" @click="classifyClick(item)"/>
      </div>
    </div>
    <div class="floor">
      <div class="floor-item radius" v-for="(item,index) in floordata" :key="index">
        <div class="title">
          <img class="auto-img" :src="item.floor_title.image_src" @click="toSearch(item.floor_title)"/>
        </div>
        <div class="item-content clearfix">
          <div class="item-son fl" v-for="(v,i) in item.product_list" :key="i">
            <img :src="v.image_src" class="auto-img-y" @click="toSearch(v)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/home.less";
import LoginVue from '../Login.vue';
export default {
  data() {
    return {
      swiperData: [],
      catitems: [],
      floordata: []
    };
  },
  created() {
    this.getSwiperData();
    this.getCatitems();
    this.getFloordata();
  },
  methods: {
    getSwiperData() {
      this.axios({
        method: "GET",
        url: "/home/swiperdata",
        params: {}
      })
        .then(res => {
          if(res.status == 200){
              this.swiperData = res.data.message.concat([]);
          }
        })
        .catch(err => {
          
        });
    },
    getCatitems() {
      this.axios({
        method: "GET",
        url: "home/catitems",
        params: {}
      })
        .then(res => {
          if(res.status == 200){
              this.catitems = res.data.message.concat([]);
               
          }
        })
        .catch(err => {
          
        });
    },
    getFloordata() {
      this.axios({
        method: "GET",
        url: "home/floordata",
        params: {}
      })
        .then(res => {
          if(res.status == 200){
              this.floordata = res.data.message.concat([]);
          }
          console.log(this.floordata);
        })
        .catch(err => {
          
        });
    },
    toSearch(item){
        console.log(item.name);
        let query = item.name;
        this.$router.push({ name: "SearchResult", query: { query } });
    },
    classifyClick(item){
        if(item.name == '分类'){
          this.$router.push({name:'Classify'})
        }else{
          this.toSearch(item)
        }
    }
  }
};
</script>

<style lang="less" scoped>
</style>