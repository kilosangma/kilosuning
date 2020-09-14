<template>
  <transition name="fade">
    <div class="mark" @click="ChangeShow" v-show="show">
      <div class="nav-more-list" :style="{top:top+'px'}" @click.stop>
        <div class="nav-title">快速导航</div>
        <div class="btn-list">
          <div
            @click="toOtherPage(item)"
            class="btn-item"
            v-for="(item,index) in btnData"
            :key="index"
          >
            <div class="img-box">
              <img :src="item.url" class="auto-img" />
            </div>
            <div class="words">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "@/assets/less/NavMoreList.less";
export default {
  name: "NavMoreList",
  props: {
    top: String,
    show: Boolean,
  },
  data() {
    return {
      btnData: [
        {
          title: "首页",
          name: "Home",
          url: require("@/assets/images/icons/home_active.png"),
        },
        {
          title: "搜索",
          name: "SearchPage",
          url: require("@/assets/images/icons/classify_active.png"),
        },
        {
          title: "购物车",
          name: "shoppingCart",
          url: require("@/assets/images/icons/shoppingcart_active.png"),
        },
        {
          title: "我的",
          name: "Mine",
          url: require("@/assets/images/icons/mine_active.png"),
        },
        {
          title: "全部分类",
          name: "Classify",
          url: require("@/assets/images/icons/classify2.png"),
        },
      ],
    };
  },
  methods: {
    ChangeShow() {
      this.$emit("change-show");
    },
    toOtherPage(item) {
      // 隐藏
      this.ChangeShow();
      // console.log(this.show);
      this.$router.push({ name: item.name });
    },
  },
  created() {
    console.log(this.show);
  },
  destroyed(){
    document.body.style.overflow = "auto";
  },
  watch: {
    // 监听是否弹出 若弹出则进行滚动拦截
    show(val) {
      console.log(val);
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>