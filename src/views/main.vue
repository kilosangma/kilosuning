<template>
  <div id="main">
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in icon" :key="index" @click="cutPage(item)">
        <span>{{item.title}}</span>
        <template #icon>
          <i class="fa fa-fw" aria-hidden="true" :class="item.icon"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>-->
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in icon" :key="index" @click="cutPage(item)">
        <span>{{item.title}}</span>
        <template #icon>
          <img :src="item.checked === false ? item.icon : item.iconActive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import "../assets/less/main.less";
export default {
  data() {
    return {
      active: 0,
      icon: [
        {
          
          name: "Home",
          // icon: "fa-home btn",
          title: "首页",
          checked: true,
          icon:require('../assets/images/icons/home.png'),
          iconActive:require('../assets/images/icons/home_active.png'),
        },
        {
          name: "Classify",
          // icon: "fa-list btn",
          title: "分类",
          checked: false,
          icon:require('../assets/images/icons/classify.png'),
          iconActive:require('../assets/images/icons/classify_active.png'),
        },
        {
          name: "shoppingCart",
          // icon: "fa-shopping-cart btn",
          title: "购物车",
          checked: false,
          icon:require('../assets/images/icons/shoppingcart.png'),
          iconActive:require('../assets/images/icons/shoppingcart_active.png'),
        },
        {
          name: "Mine",
          // icon: "fa-user btn",
          title: "我的",
          checked: false,
          icon:require('../assets/images/icons/mine.png'),
          iconActive:require('../assets/images/icons/mine_active.png'),
        },
      ],
    };
  },
  methods: {
    // 切换底部按钮
    cutPage(item) {
      if (item.checked) {
        return;
      } else {
        this.icon.forEach((v) => {
          if (v.checked) {
            v.checked = false;
            return;
          }
        });
        item.checked = true;
        this.$router.push({ name: item.name });
      }
    },
    checkPath() {
      let str = location.hash;

      let strArr = str.split("/");
      str = strArr[strArr.length - 1];
      this.icon.forEach((v, i, a) => {
        if (v.name.toLowerCase() == str.toLowerCase()) {
          v.checked = true;
          this.active = i;
        } else {
          v.checked = false;
        }
      });
    },
  },
  updated() {
    this.checkPath();
  },
  created() {
    this.checkPath();
  },
};
</script>
<style lang="less" scoped>
</style>