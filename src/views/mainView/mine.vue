<template>
  <div id="mine">
    <div class="top-box">
      <div class="title">
        <div class="title-name">我的易购</div>
        <div class="setting fr" @click="$router.push({name:'CountSetting'})">
          <img src="../../assets/images/setting.png" class="auto-img" />
        </div>
      </div>
      <div class="user-box">
        <div class="user-icon fl">
          <img class="auto-img" src="../../assets/images/usericon.jpg" />
        </div>
        <div class="user-name fl">
          <div class="name-box">{{userData.name}}</div>
          <div class="st-box">生态值195</div>
        </div>
      </div>
      <!-- 足迹 收藏夹入口 -->
      <div class="more-mes-box">
        <div class="mes-item" @click="toMoreMes(item)" v-for="(item,index) in moreMes" :key="index">
          <div class="number">{{item.number}}</div>
          <div class="mes-title">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="big-box">
      <div class="content-box-mine vip-card radius">
        <div class="img-box">
          <img src="@/assets/images/vipcard.png" class="auto-img-y" />
        </div>
        <div>【免费】您有一张运费券待领取</div>
        <div class="right-part">
          <span>立即领取</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="content-box-mine my-order radius">
        <div class="list-top">
          <div class="title">我的订单</div>
          <div class="toAll">
            <div class="fl" @click="goOrder">查看全部</div>
            <div class="img-box fl">
              <img src="../../assets/images/next.png" class="auto-img" />
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div
            class="btn-item"
            v-for="(item,index) in orderIcon"
            :key="index"
            @click="goOrder(item)"
          >
            <div class="icon">
              <img :src="item.url" class="auto-img-y" />
            </div>
            <div class="desc">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="content-box-mine my-tools radius">
        <div class="list-top">
          <div class="title">必备工具</div>
        </div>
        <div class="btn-list">
          <div class="btn-item" v-for="(item,index) in toolsIcon" :key="index" @click="$toast('敬请期待')">
            <div class="icon">
              <img :src="item.url" class="auto-img-y" />
            </div>
            <div class="desc">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <YourLike></YourLike> -->
  </div>
</template>

<script>
import "../../assets/less/mine.less";
// import { Loading } from "@/assets/js/loadingAnime.js";
export default {
  data() {
    return {
      orderIcon: [
        {
          name: "1",
          title: "待支付",
          url: require("@/assets/images/topay.png"),
        },
        {
          name: "2",
          title: "待收货",
          url: require("@/assets/images/ing.png"),
        },
        {
          name: "3",
          title: "已完成",
          url: require("@/assets/images/complete.png"),
        },
        {
          name: "0",
          title: "全部订单",
          url: require("@/assets/images/alllist.png"),
        },
      ],
      toolsIcon: [
        {
          name: "",
          title: "红包",
          url: require("@/assets/images/tools_icons/redbag.png"),
        },
        {
          name: "",
          title: "店铺关注",
          url: require("@/assets/images/tools_icons/store.png"),
        },
        {
          name: "",
          title: "足迹",
          url: require("@/assets/images/tools_icons/history.png"),
        },
        {
          name: "",
          title: "客服服务",
          url: require("@/assets/images/tools_icons/server.png"),
        },
        {
          name: "",
          title: "必抢清单",
          url: require("@/assets/images/tools_icons/list.png"),
        },
        {
          name: "",
          title: "拼购",
          url: require("@/assets/images/tools_icons/gou.png"),
        },
        {
          name: "",
          title: "校园VIP",
          url: require("@/assets/images/tools_icons/vip.png"),
        },
        {
          name: "",
          title: "我的试用",
          url: require("@/assets/images/tools_icons/testuse.png"),
        },
      ],
      moreMes: [
        { number: 0, title: "收藏夹", name: "Collect" },
        { number: 0, title: "足迹", name: "" },
        { number: 0, title: "优惠券", name: "" },
        { number: 0, title: "领云钻", name: "" },
      ],
    };
  },
  created(){
    this.getUserMes();
    this.getCollectCount();
  },
  methods: {
    goOrder(item) {
      if (!!item) {
        let active = item.name;
        this.Loading.show(this);
        this.$router.push({ name: "Order", query: { active } });
      }else{
         this.$router.push({ name: "Order"});
      }
    },
    toMoreMes(item) {
      let routerName = item.name;
      if (routerName != "") {
        this.Loading.show(this);
        this.$router.push({ name: routerName });
      } else {
        this.$toast("敬请期待")
      }
    },
    getUserMes() {
      this.loginPhone = localStorage.getItem("loginPhone");
      this.userData = JSON.parse(localStorage.getItem("userData"))[
        this.loginPhone
      ];
    },
    getCollectCount(){
        let collectData = JSON.parse(localStorage.getItem("collectData"))[
          this.loginPhone
        ];
        let count = Object.getOwnPropertyNames(collectData).length;
        this.moreMes[0].number = count;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>