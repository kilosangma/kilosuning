<template>
  <div id="shoppingcart">
    <van-nav-bar fixed title="购物车" :right-text="editStatus ? '完成' : '编辑' " @click-right="eidt"></van-nav-bar>

    <div class="main-content">
      <div class="hasPage" v-if="loginPhone!=null">
        <div v-if="shoppingcartData.length == 0" class="main-content-empty">
          <div class="center-box" @click="$router.push({name:'Classify'})">
            <div class="fl">购物车空空如也</div>
            <div class="fl btn">去逛逛</div>
          </div>
        </div>
        <div v-if="shoppingcartData.length != 0" class="main-content-list radius">
          <div class="list-item clearfix" v-for="(item,index) in shoppingcartData" :key="index">
            <div class="item-content fl">
              <div class="img-box fl">
                <!-- item.goods_small_logo  == '' ? no_image : item.goods_small_logo  -->
                <img class="auto-img" :src="item.goods_pic != '' ? item.goods_pic : no_image" />
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
                      @change="stepperChange"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="checkbox fl">
              <van-checkbox @change="selectOne(item)" v-model="item.checked"></van-checkbox>
            </div>
          </div>
          <!-- <div class="list-item clearfix">
            <div class="item-content fl">
              <div class="img-box fl">
                <img
                  class="auto-img"
                  src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acf2e521e29e5afabf6d493203b31f27.png?thumb=1&w=120&h=120"
                />
              </div>
              <div class="right-part fl">
                <div
                  class="title two-wrap"
                >小米 (MI) 小米9 Pro 5G 骁龙855Plus 8GB+128GB 钛银黑 双卡全网通 移动联通电信5G手机 全面屏智能拍照官方手机</div>
                <div class="stepper">
                  <div class="price clearfix fl">
                    <div class="fl price-box">
                      ￥
                      <span>3299</span>.00
                    </div>
                  </div>
                  <div class="stepper-box fr">
                    <van-stepper
                      theme="round"
                      v-model="value"
                      input-width="22px"
                      button-size="22px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="checkbox fl">
              <van-checkbox v-model="checked"></van-checkbox>
            </div>
          </div>-->
        </div>
      </div>
      <div class="noPage radius" v-if="loginPhone==null">
        <div class="login-btn" @click="$router.push({name:'Login'})">去登陆</div>
      </div>
    </div>
    <!-- <YourLike /> -->
    <div class="submit" v-if="loginPhone!=null">
      <van-checkbox @click="selectAll" v-model="checked"></van-checkbox>
      <span>全部</span>
      <div class="pirce" v-if="!editStatus">
        <div class="fl">合计</div>
        <div class="fl price-box">
          ￥
          <span>{{getPrice.split('.')[0]}}</span>
          .{{getPrice.split('.')[1]}}
        </div>
      </div>
      <div class="btn" @click="submitOrder" v-if="!editStatus">去结算</div>
      <div class="btn" @click="delSelect" v-if="editStatus" style="marginLeft:auto">删除所选</div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/shoppingcart.less";
import { items } from "../../assets/js/items";

// import YourLike from '@/components/YourLike.vue'
export default {
  data() {
    return {
      keyword: "", // 关键词
      hot: items.hot,
      small_item: items.costEffective,
      isEmpty: false,
      checked: false,
      value: 0,
      loginPhone: null,
      shoppingcartData: [],
      editStatus: false, // 是否进入编辑状态
      no_image: require('../../assets/images/no-image.png'),
    };
  },
  created() {
    this.getLoginPhone();
    if (this.loginPhone != null) {
      this.getShoppingcartData();
    }
  },
  methods: {
    getLoginPhone() {
      this.loginPhone = localStorage.getItem("loginPhone");
    },
    getShoppingcartData() {
      let shoppingcartObj = JSON.parse(
        localStorage.getItem("shoppingcartData")
      )[this.loginPhone];
      for (let key in shoppingcartObj) {
        shoppingcartObj[key].checked = false;
        this.shoppingcartData.push(shoppingcartObj[key]);
      }
    },
    stepperChange() {
      // 
      this.saveData();
    },
    selectOne(item) {
      for (let i = 0; i < this.shoppingcartData.length; i++) {
        if (!this.shoppingcartData[i].checked) {
          this.checked = false;
          return;
        }
      }
      this.checked = true;
    },
    selectAll() {
      for (let i = 0; i < this.shoppingcartData.length; i++) {
        this.shoppingcartData[i].checked = this.checked;
      }
    },
    eidt() {
      // 切换编辑状态
      this.editStatus = !this.editStatus;
    },
    delSelect() {
      for (let i = this.shoppingcartData.length - 1; i >= 0; i--) {
        if (this.shoppingcartData[i].checked) {
          this.shoppingcartData.splice(i, 1);
        }
      }
      this.saveData()
    },
    submitOrder() {
        let orderData = this.shoppingcartData.filter((v)=>{
          return v.checked;
        })
        if(orderData.length != 0){
          this.Loading.show(this);
          this.$router.push({name:'Settlement',query:{orderData:JSON.stringify(orderData)}})
        }
    },
    // 将修改后的数据保存到localStorage
    saveData() {
      let shoppingcartSumData = JSON.parse(
        localStorage.getItem("shoppingcartData")
      );
      let storageData = {}
      this.shoppingcartData.forEach(v=>{
          storageData[v.goods_id] = v;
      })
      
      shoppingcartSumData[this.loginPhone] = storageData;
      localStorage.setItem(
        "shoppingcartData",
        JSON.stringify(shoppingcartSumData)
      );
    },
  },
  computed: {
    // 计算总价格
    getPrice() {
      let sum = 0;
      this.shoppingcartData.forEach((v) => {
        if (v.checked) {
          sum += parseFloat(v.goods_price) * v.count;
        }
      });
      sum = sum.toFixed(2).toString();
      return sum;
    },
  },
  // components:{
  //   YourLike
  // }
};
</script>

<style lang="less" scoped>
</style>