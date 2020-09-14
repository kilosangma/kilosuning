<template>
  <div id="order">
    <SettingTop @leftclick="goBack" title="我的订单"></SettingTop>
    <van-tabs sticky v-model="active" color="#fe4f03">
      <van-tab :title="value.name" v-for="(value,key) in tabData" :key="key">
        <div class="tab-content-box">
          <!-- {{avtiveOrder}} -->
          <div class="tab-content-item" v-for="(v,i) in avtiveOrder" :key="i">
            <!-- {{i}} -->
            <div class="tab-item-top">
              <div class="tab-icon">
                <i class="fa fa-shopping-basket" aria-hidden="true"></i>
              </div>
              <div class="store-name">苏宁官方自营店</div>
              <div class="tab-icon">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
              <div @click="orderDel(i)" class="tab-right-btn" v-if="v.status != 2">
                <div>删除</div>
                <div class="tab-icon">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div class="goods-content clearfix">
              <div class="goods-item clearfix" v-for="(v1,i1) in v.itemData" :key="i1">
                <div class="good-img fl">
                  <img class="auto-img" :src="v1.goods_pic" />
                </div>
                <div class="right-mes fl">
                  <div class="title two-wrap">{{v1.goods_name}}</div>
                  <div class="detail-mes">重量：{{v1.goods_weight}}g</div>
                  <div class="tips no-wrap">七天无理由(拆封后不支持) 享退货运费险</div>
                  <div class="price-count">
                    <span>￥{{v1.goods_price}}</span>
                    <span class="count">x{{v1.count}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-item-bottom">
              <div class="price">
                合计
                <span>￥{{v.price}}</span>
              </div>
              <div class="goods-btn">
                <!-- <div class="btn-buyAagin btn-item">再次购买</div> -->
                <div v-if="v.status == 2" class="btn-item" @click="confirmReceipt(i)">确认收货</div>
              </div>
            </div>
          </div>
          <!-- <div class="tab-content-item">
                        <div class="tab-item-top">
                            <div class="tab-icon">
                                <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                            </div>
                            <div class="store-name">苏宁官方自营店</div>
                            <div class="tab-icon"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                            <div class="tab-right-btn">
                                <div>取消</div>
                                <div class="tab-icon"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="goods-content clearfix">
                            <div class="goods-item clearfix">
                                <div class="good-img fl">
                                    <img class="auto-img" src="http://image2.suning.cn/uimg/b2c/newcatentries/0070098296-000000000171085364_1_400x400.jpg">
                                </div>
                                <div class="right-mes fl">
                                    <div class="title two-wrap">
                                        紫米ZMI 小米QC3.0快充车充 5V2.4A双USB智能输出 一拖二手机平板通用汽车充电器 AP821 银色
                                    </div>
                                    <div class="detail-mes">重量：100g</div>
                                    <div class="tips no-wrap">七天无理由(拆封后不支持) 享退货运费险</div>
                                    <div class="price-count">
                                        <span>￥12.00</span>
                                        <span class="count">x1</span>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                       
                        <div class="tab-item-bottom">
                            <div class="price">合计<span>￥18.00</span></div>
                            <div class="goods-btn">
                                <div class="btn-buyAagin btn-item">再次购买</div>
                            </div>
                        </div>
          </div>-->
        </div>
        <div class="empty-box" v-if="JSON.stringify(avtiveOrder) == '{}'">
          <div class="img-box">
            <img src="@/assets/images/no-order.png" class="auto-img" />
          </div>
          <div class="tips">{{tabData[active].tip}}</div>
          <div class="btn-box">
            <div class="btn-empty" @click="$router.push({name:'Home'})">去首页</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import "@/assets/less/order.less";
// import { delete } from "vue/types/umd";
export default {
  data() {
    return {
      active: 0,
      tabData: [
        // status代表订单的状态
        { name: "全部订单", status: "0", tip: "您还没有订单哦" },
        { name: "待支付", status: "1", tip: "您还没有待支付的订单哦" },
        { name: "待收货", status: "2", tip: "您还没有待收货的订单哦" },
        { name: "已完成", status: "3", tip: "您还没有已完成的订单哦" },
      ],
      orderData: {},
    };
  },
  created() {
    this.getActive();
    this.getOrderData();
  },
  computed: {
    avtiveOrder() {
      let data = {};
      if (this.active == 0) {
        data = this.orderData;
      } else {
        for (let key in this.orderData) {
          if (this.orderData[key].status == this.active) {
            data[key] = this.orderData[key];
          }
        }
      }
      return data;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getOrderData() {
      this.orderData = JSON.parse(localStorage.getItem("orderData"))[
        this.loginPhone
      ];
      console.log(this.orderData);
    },
    confirmReceipt(key) {
      this.orderData[key].status = 3;
      let allOrderData = JSON.parse(localStorage.getItem("orderData"));
      allOrderData[this.loginPhone] = this.orderData;
      localStorage.setItem("orderData", JSON.stringify(allOrderData));
    },
    orderDel(key) {
      delete this.orderData[key];
      this.$forceUpdate(); // 强制更新
      let allOrderData = JSON.parse(localStorage.getItem("orderData"));
      allOrderData[this.loginPhone] = this.orderData;
      localStorage.setItem("orderData", JSON.stringify(allOrderData));
    },
    getActive() {
      this.loginPhone = localStorage.getItem("loginPhone");
      let active = parseInt(this.$route.query.active);
      console.log(active);
      this.active = isNaN(active) ? 0 : active;
    },
  },
};
</script>

<style lang="less" scoped>
</style>