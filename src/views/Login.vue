<template>
  <div id="login">
    <div class="top clearfix">
      <div class="img-box">
        <img src="@/assets/images/login-icon.png" class="auto-img" />
      </div>
      <div class="title">欢迎登录苏宁易购</div>
    </div>
    <van-form>
      <van-field type="text" name="手机号" placeholder="手机号" v-model="userInfo.phone"></van-field>

      <!-- right-icon right-icon="closed-eye"-->
      <van-field
        :type="pwdShowStatus?'text':'password'"
        name="密码"
        placeholder="密码"
        v-model="userInfo.password"
      >
        <template #right-icon>
          <i
            class="fa fa-fw"
            :class="pwdShowStatus?'fa-eye':'fa-eye-slash'"
            aria-hidden="true"
            @click="pwdShow"
          ></i>
        </template>
        <template #button>
          <span class="forget-pwd">忘记密码</span>
        </template>
      </van-field>
      <div style="margin-top:20px">
        <div style="margin-top: 10px;">
          <div class="btn login-btn" @click="submit">登录 or 注册</div>
        </div>
        <!-- <div style="margin-top: 10px;">
          <div class="btn regist-btn">注册</div>
        </div>-->
      </div>
    </van-form>
  </div>
</template>

<script>
import "@/assets/less/login.less";
import formTest from "@/assets/js/formTest.js";
export default {
  data() {
    return {
      userInfo: {
        password: "",
        phone: "",
      },
      pwdShowStatus: false,
    };
  },
  methods: {
    pwdShow() {
      this.pwdShowStatus = !this.pwdShowStatus;
    },
    submit() {
      let status = formTest.validUserForm(this.userInfo, this);
      if (status) {
        // 获取总账户数据
        let userData = localStorage.getItem("userData");
        if (userData == null) {
          userData = {};
          userData[this.userInfo.phone] = { 
              password: this.userInfo.password,
              name:'new_user', // 用户名
              sex:0, // 性别 默认为男
            };
          localStorage.setItem("userData", JSON.stringify(userData));
          this.$toast("注册成功");
        } else {
          userData = JSON.parse(userData);
          let keys = Object.keys(userData);

          if (keys.indexOf(this.userInfo.phone) != -1) {
            if (
              userData[this.userInfo.phone].password == this.userInfo.password
            ) {
              this.$toast("登陆成功");
            } else {
              this.$toast("密码错误");
              return;
            }
          } else {
            userData[this.userInfo.phone] = {
              password: this.userInfo.password,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            this.$toast("注册成功");
          }
          let loginMes = {};
          localStorage.setItem("loginPhone", this.userInfo.phone);

          // 查看是否已经拥有该用户的其他localStorage
          let shoppingcartData = JSON.parse(
            localStorage.getItem("shoppingcartData")
          );
          let collectData = JSON.parse(localStorage.getItem("collectData"));
          let orderData = JSON.parse(localStorage.getItem("orderData"));
          let addressData = JSON.parse(localStorage.getItem("addressData"));

          // 检测改用户是否建立对应的本地存储 否则则初始化为 手机号:{} 形式
          if (!shoppingcartData[this.userInfo.phone]) {
            shoppingcartData[this.userInfo.phone] = {};
            localStorage.setItem(
              "shoppingcartData",
              JSON.stringify(shoppingcartData)
            );
          }
          if (!collectData[this.userInfo.phone]) {
            collectData[this.userInfo.phone] = {};
            localStorage.setItem("collectData", JSON.stringify(collectData));
          }
          if (!orderData[this.userInfo.phone]) {
            orderData[this.userInfo.phone] = {};
            localStorage.setItem("orderData", JSON.stringify(orderData));
          }
          if (!addressData[this.userInfo.phone]) {
            addressData[this.userInfo.phone] = {};
            localStorage.setItem("addressData", JSON.stringify(addressData));
          }
          this.$router.push({ name: "Home" });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>