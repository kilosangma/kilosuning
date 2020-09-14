<template>
  <div id="address">
    <SettingTop @leftclick="goBack" title="收货地址管理"></SettingTop>
    <div class="no_address" v-if="Object.keys(addressData).length == 0">
      <div class="img-box">
        <img src="@/assets/images/no-address.png" class="auto-img" />
      </div>
      <div class="desc">您未添加任何地址</div>
      <div class="btn" @click="toEditAddress(false)">立即添加</div>
    </div>
    <div class="has_address" v-if="Object.keys(addressData).length !=0 ">
      <div class="top-box">
        <div class="left">配送地址</div>
        <div class="right" @click="toEditAddress(false)">新增配送地址</div>
      </div>
      <div class="address-list">
        <div
          class="address-item"
          v-for="(item,key) in addressData"
          :key="key"
          @click="toEditAddress(true,item)"
        >
          <div class="mes-top">
            <div>{{item.nickName}}</div>
            <div>{{item.phone}}</div>
            <div class="defalut-icon" v-if="item.default">默认</div>
          </div>
          <div class="mes-bottom">
            <div class="address-desc no-wrap">{{item.area + item.detail}}</div>
            <div class="icon">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <!-- <div class="address-item">
                <div class="mes-top">
                    <div>林焕斌</div>
                    <div>13211056031</div>
                    <div class="defalut-icon">默认</div>
                </div>
                <div class="mes-bottom">
                    <div class="address-desc no-wrap">广东镇...</div>
                    <div class="icon">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/less/address.less";
export default {
  data() {
    return {
      addressData: {},
      loginPhone: "",
    };
  },
  created() {
    // 获取地址信息
    this.getAddressData();
  },
  methods: {
    goBack() {
      // this.$router.push({ name: "CountSetting" });
      this.$router.go(-1);
    },
    toEditAddress(status,item) {
      if (status) {
        // 若status为true，那么带参数跳转
        this.$router.push({ name: "EditAddress" ,query:{addressInfo:JSON.stringify(item)}});
      } else {
        // 如果status为false 那么直接跳转至新增页面
        this.$router.push({ name: "EditAddress" });
      }
    },
    getAddressData() {
      this.loginPhone = localStorage.getItem("loginPhone");
      this.addressData = JSON.parse(localStorage.getItem("addressData"))[
        this.loginPhone
      ];
      console.log(this.addressData);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>