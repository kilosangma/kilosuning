<template>
  <div id="basicMes">
    <SettingTop @leftclick="$router.go(-1)" title="个人信息"></SettingTop>
    <!-- @item-click="toWhere(item)" v-for="(item,index) in itemData" :key="index" -->
    <!-- <setting-item  title="头像" content="111"></setting-item> -->
    <setting-item @item-click="btnClick('nameShow')" title="昵称" :content="userData.name"></setting-item>
    <setting-item
      title="性别"
      :content="userData.sex == 0 ? '男' : '女'"
      @item-click="btnClick('sexShow')"
    ></setting-item>
    <van-popup round v-model="sexShow" position="bottom" :style="{ height: '30%' }">
      <div class="out-box">
        <div @click="changeSex(item)" class="sex-btn" v-for="(item,index) in sexBtnData" :key="index">{{item.title}}</div>
      </div>
    </van-popup>
    <van-popup round v-model="nameShow" position="bottom" :style="{ height: '30%' }">
      <div class="out-box">
          <input type="text" class="nameInput" v-model="tempName">
          <div class="sex-btn" @click="changeName">确认</div>
          <div class="sex-btn" @click="nameShow = !nameShow">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import LoginVue from "./Login.vue";
export default {
  data() {
    return {
      userData: {},
      nameShow: false,
      sexShow: false,
      sexBtnData: [
        { title: "男", value: 0 },
        { title: "女", value: 1 },
        { title: "取消", value: -1 },
      ],
      tempName:''
    };
  },
  methods: {
    getUserMes() {
      this.loginPhone = localStorage.getItem("loginPhone");
      this.userData = JSON.parse(localStorage.getItem("userData"))[
        this.loginPhone
      ];
      this.tempName = this.userData.name;
    },
    btnClick(show) {
      this[show] = !this[show];
      console.log(this[show]);
    },
    changeName(){
        this.userData.name = this.tempName;
        this.nameShow = false;
        this.saveData();
    },
    changeSex(item){
        console.log(111);
        if(item.value > 0){
            this.userData.sex = item.value
        }
        this.sexShow = false;
        this.saveData();
    },
    saveData(){
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData[this.loginPhone] = this.userData;
        localStorage.setItem('userData',JSON.stringify(userData))
    }
  },
  created() {
    this.getUserMes();
  },
};
</script>

<style lang="less" scoped>
.out-box {
  
  padding: 20px;
  .sex-btn {
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ff5f0f;
    border-radius: 10px;
    font-size: 16px;
    color: #000;
  }
  .sex-btn:last-child{
      background-color: #ff5f0f;
      color: #fff;
  }
  .nameInput{
      outline: none;
      border: 1px solid #666;
      display: block;
      margin-bottom: 10px;
      padding: 0;
    //   margin: 0;
      width: calc(~"100% - 20px");
      height: 40px;
      border-radius: 10px;
      padding: 0 10px;
  }
}
</style>