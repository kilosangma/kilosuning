<template>
  <div id="settlement">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />
    <div class="addressSelector content-box-settlement" @click="hide_show = true">
        <div class="left-part" >
            <i class="fa fa-map-marker" aria-hidden="true"></i>
        </div>
        <div class="center-part" v-if="addressId!=''">
          <div class="top addressBox-item">
              <div class="isDefault" v-if="addressData[addressId].default">默认</div>
              <div class="cities no-wrap">{{addressData[addressId].area}}</div>
          </div>
          <div class="middle addressBox-item no-wrap">
              {{addressData[addressId].detail}}
          </div>
          <div class="bottom addressBox-item">
              <span>{{addressData[addressId].nickName}}</span>
              <span>{{addressData[addressId].phone}}</span>
          </div>
        </div>
        <div class="center-part empty-address" v-if="addressId==''">
            请选择地址
        </div>
        <div class="right-part">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
    
     <div class="order content-box-settlement">
          <div class="order-item clearfix" v-for="(item,index) in orderData" :key="index">
            <div class="item-content fl">
              <div class="img-box fl">
                <img class="auto-img" :src="item.goods_pic" />
              </div>
              <div class="right-part fl">
                <div class="title two-wrap">{{item.goods_name}}</div>
                <div class="stepper">
                  <div class="price clearfix fl">
                    <div class="fl price-box">
                      ￥
                      <span>{{item.goods_price.split('.')[0]}}</span>
                      .{{item.goods_price.split('.')[1]}}
                    </div>
                  </div>
                  <div class="stepper-box fr">
                    <van-stepper
                      theme="round"
                      v-model="item.count"
                      input-width="22px"
                      button-size="22px"
                      @change="getSum"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <YourLike></YourLike> -->
        <div class="addressList">
      <van-popup v-model="hide_show" position="bottom" round :style="{ height: '30%' }">
        <div class="title">
          <i class="fa fa-cog" aria-hidden="true" @click="$router.push({name:'Address'})"></i>
          <i class="fa fa-times" aria-hidden="true" @click="hide_show = false"></i>
        </div>
        <div class="content" v-if="JSON.stringify(addressData) != '{}'">
          <div class="item" v-for="(v,k) in addressData" :key="k" @click="changeAddress(k)">
            <div class="item__name">
              {{v.nickName}} {{v.phone}}
              <span class="tag" v-if="v.default">默认地址</span>
            </div>
            <div class="item__address">{{v.area+v.detail}}</div>
          </div>
        </div>
        <div class="addMoreAddress" v-if="JSON.stringify(addressData) == '{}'">
          <van-button type="default">新增地址</van-button>
        </div>
      </van-popup>
    </div>
        <div class="submit-bar">
            <div class="price"><span>实际支付：</span><span class="number">￥{{sumPrice}}</span></div>
            <div class="submit-btn" @click="submitOrder">结算订单</div>
        </div>
  </div>

</template>


<script>
import "@/assets/less/settlement.less";
import LoginVue from "./Login.vue";
export default {
  data() {
    return {
      orderData: [],
      hide_show:false,
      loginPhone:'',
      addressData:{},
      addressId:'', // 选中的地址坐标
      sumPrice:0
    };
  },
  computed:{
    
  },
  methods: {
    getOrderData() {
      let { orderData } = this.$route.query;
      this.orderData = JSON.parse(orderData);
      console.log(this.orderData);
    },
    getAddressData(){
      let addressData = JSON.parse(localStorage.getItem('addressData'));
      this.addressData = addressData[this.loginPhone] ;
      // 获得默认地址的ID
      for(let key in this.addressData){
        if(this.addressData[key].default){
          this.addressId = key;
          break;
        }
      }
    },
    changeAddress(k){
        this.addressId = k;
        this.hide_show = false;
    },
    getSum(){
        let sum = 0;
        // console.log(this.orderData);
        for(let key in this.orderData){
            // console.log(this.orderData[key].goods_price);
            sum += parseFloat(this.orderData[key].goods_price) * parseFloat(this.orderData[key].count); 
        }
        console.log(sum);
        this.sumPrice = sum.toFixed(2);
        // return 
    },
    // 结算订单
    submitOrder(){
        // 需要收集 商品信息 订单时间 订单总价 
        // 需生成唯一标识(id)
        let self = this;
        // 获取登录账号的订单信息
        let orderData = JSON.parse(localStorage.getItem("orderData"));
        let oid = 'oid' + new Date().getTime();
        orderData[this.loginPhone][oid] = {};
        orderData[this.loginPhone][oid]['itemData'] = this.orderData;
        orderData[this.loginPhone][oid]['orderTime'] = new Date().getTime();
        orderData[this.loginPhone][oid]['price'] = this.sumPrice;
        orderData[this.loginPhone][oid]['status'] = 2; // 状态二代表待收货
        localStorage.setItem("orderData",JSON.stringify(orderData));
        this.$toast.success("结算成功");
        this.$router.push({name:"Order"});

        // 结算成功后需要删除购物车中的内容
        console.log(this.orderData);
        let shoppingcartData = JSON.parse(localStorage.getItem('shoppingcartData'));
        this.orderData.forEach((v,i)=>{
            delete shoppingcartData[self.loginPhone][v.goods_id]
            console.log();
        })
        localStorage.setItem("shoppingcartData",JSON.stringify(shoppingcartData));
    }
  },
  created() {
    this.loginPhone = localStorage.getItem('loginPhone');
    this.getOrderData();
    this.getAddressData();
    this.getSum();
  },
};
</script>

<style lang="scss" scoped>
</style>