<template>
  <div id="searchPage">
    <!-- 顶部搜索框 -->
    <van-nav-bar fixed title="标题" left-text="返回" @click-right="toSearchResult" @click-left="$router.push({name:'Home'})">
      <template #right>搜索</template>
      <template #title>
        <van-search v-model="query" placeholder="请输入您想查找的商品" />
      </template>
      <template #left>
        <!-- <i class="fa fa-angle-left" aria-hidden="true"></i> -->
        <van-icon name="arrow-left" size="16" />
      </template>
    </van-nav-bar>

    <div class="keyword-search">
      <div class="keyword-title">热门搜索</div>
      <div class="hotword-box clearfix">
        <div
          @click="toSearchResult($event,item)"
          :class="item.ishot ? 'active' : ''"
          class="hotword-item fl"
          v-for="(item,index) in hotwordData"
          :key="index"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/searchPage.less";
export default {
  data() {
    return {
      query: "",
      hotwordData: [
        { name: "除湿机", ishot: false },
        { name: "65寸电视", ishot: true },
        { name: "家具", ishot: true },
        { name: "珠宝", ishot: false },
        { name: "空调", ishot: false },
        { name: "空调1.5匹", ishot: true },
        { name: "燃气热水器", ishot: false },
        { name: "耳机", ishot: false },
        { name: "手机", ishot: false }
      ]
    };
  },
  created() {
    this.getQuery();
  },
  methods: {
    toSearchResult(e, item) {
      let query = "";
      if (item) {
        query = item.name;
      } else {
        query = this.query;
        // 关键字为空 则进行拦截
        if (query == "") {
          return;
        }
      }
      this.$router.push({ name: "SearchResult", query: { query } });
    },
    getQuery() {
      let query = this.$route.query.query;
      if(query != undefined){
        this.query = query;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>