<template>
  <div id="editAddress">
    <SettingTop @leftclick="goBack" title="地址编辑"></SettingTop>
    <div class="content-box">
      <div class="eidt-item">
        <div class="title">收货人</div>
        <div class="content">
          <input v-model="addressInfo.nickName" type="text" placeholder="收货人姓名" />
        </div>
      </div>
      <div class="eidt-item">
        <div class="title">手机号码</div>
        <div class="content">
          <input v-model="addressInfo.phone" type="text" placeholder="收货人手机号码" />
        </div>
      </div>
      <div class="eidt-item">
        <div class="title">所在地区</div>
        <div class="content">
          <div @click="showAddress">{{addressInfo.area == '' ? '请选择地区' : addressInfo.area}}</div>
        </div>
      </div>
      <div class="eidt-item">
        <div class="title">详细地址</div>
        <div class="content">
          <input v-model="addressInfo.detail" type="text" placeholder="详细地址" />
        </div>
      </div>
      <div class="eidt-item">
        <div class="title">邮政编码</div>
        <div class="content">
          <input v-model="addressInfo.mailCode" type="text" placeholder="邮政编码" maxlength="6" />
        </div>
      </div>
      <div class="eidt-item">
        <div class="title">设置为默认地址</div>
        <van-checkbox v-model="addressInfo.default"></van-checkbox>
      </div>
    </div>
    <van-popup v-model="addressShow" round position="bottom" :style="{ height: '30%' }">
      <van-area
        :value="addressInfo.codeValue"
        title="选择地址"
        :area-list="areaList"
        @cancel="hiddenAddress"
        @confirm="changeAddress"
      />
    </van-popup>

    <div class="address-btn save" @click="saveAddress">{{editStatus ? '保存' : '新增'}}</div>
    <div class="address-btn del" @click="delAddress" v-if="editStatus">删除</div>
  </div>
</template>

<script>
import "@/assets/less/editAddress.less";
import areaList from "@/assets/js/area";
import formTest from "@/assets/js/formTest.js";
export default {
  data() {
    return {
      rightShow: false,
      addressShow: false,
      areaList,
      loginPhone: "", // 登录的账号手机号
      addressInfo: {
        addressId: "", // 记录唯一地址的id
        nickName: "",
        phone: "",
        area: "",
        detail: "",
        mailCode: "",
        codeValue: "", // 地址编号
        default: true,
      },
      editStatus: false, // 此状态记录是否为修改地址状态 true为修改状态 false为新增状态
    };
  },
  created() {
    this.getMes();
  },
  methods: {
    getMes() {
      let loginPhone = localStorage.getItem("loginPhone");
      this.loginPhone = loginPhone;
      let addressInfo = this.$route.query.addressInfo;
      if (!!addressInfo) {
        this.addressInfo = JSON.parse(addressInfo);
        this.editStatus = true;
      } else {
        this.editStatus = false;
      }
    },
    goBack() {
      // this.$router.push({ name: "CountSetting" });
      this.$router.go(-1);
    },
    showAddress() {
      this.addressShow = !this.addressShow;
    },
    hiddenAddress() {
      this.addressShow = !this.addressShow;
    },
    changeAddress(addressMes) {
      this.addressInfo.area =
        addressMes[0].name + addressMes[1].name + addressMes[2].name;
      this.addressInfo.codeValue = addressMes[2].code;
      this.addressShow = !this.addressShow;
    },
    saveAddress() {
      // 新增加地址
      let {
        nickName,
        phone,
        area,
        detail,
        mailCode,
        codeValue,
      } = this.addressInfo;
      let status = formTest.validUserForm({ phone }, this);
      // 此处检测手机号格式是否正确
      if (status) {
        // 此处检测其他信息是否完整
        if (
          nickName != "" &&
          area != "" &&
          detail != "" &&
          mailCode.length == 6 &&
          codeValue != ""
        ) {
          // 此处检测 是否为编辑状态

          // 若为新增地址则创建一条新地址
          if (!this.editStatus) {
            this.addressInfo.addressId =
              Math.floor(Math.random() * (999999 - 100000 + 1) + 100000) +
              "" +
              new Date().getTime();
          }
          // 
          let addressData = JSON.parse(localStorage.getItem("addressData"));
          addressData[this.loginPhone][
            this.addressInfo.addressId
          ] = this.addressInfo;
          this.$toast.success({
            message: "添加成功",
            forbidClick: true,
          });
          
          console.log(addressData);
          // 如果为默认地址 则需取消其他地址的默认
          if(this.addressInfo.default){
              for(let key in addressData[this.loginPhone]){
                  console.log("addressData[key].defaul =>",addressData[this.loginPhone][key].default);
                  if(addressData[this.loginPhone][key].default && key != this.addressInfo.addressId){
                      // console.log(111);
                      addressData[this.loginPhone][key].default = false;
                  }else{
                    
                  }
              }
          }
          // console.log(addressData);
          localStorage.setItem("addressData", JSON.stringify(addressData));
          this.$router.go(-1);
        } else {
          this.$toast("请完善信息");
        }
      }
    },
    delAddress() {
      // 删除地址
      // 通过loginPhone及地址id查找并将之删除

      this.$dialog.confirm({
        title: "操作确认",
        message: "是否删除地址",
      })
        .then(() => {
          let addressData = JSON.parse(localStorage.getItem("addressData"));
          delete addressData[this.loginPhone][this.addressInfo.addressId];
          localStorage.setItem("addressData", JSON.stringify(addressData));
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>