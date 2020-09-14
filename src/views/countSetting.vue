<template>
  <div id="countSetting">
    <SettingTop @leftclick="goBack" title="账户设置"></SettingTop>

    <div class="part" >
      <setting-item content="" @item-click="toWhere({name:'BasicMes'})">
        <template #title>
          <div class="img-box" style="height:50px">
            <img src="@/assets/images/usericon.jpg" class="auto-img-y" />
            <div class="name">{{userData.name}}</div>
          </div>
        </template>
      </setting-item>
    </div>

    <div class="part">
        <!-- <setting-item title="地址管理" content="新增/修改地址">
      </setting-item> -->
      <setting-item @item-click="toWhere(item)" v-for="(item,index) in itemData" :key="index" :title="item.title" :content="item.content">
      </setting-item>
    </div>
    <div class="exit-btn" @click="exit">
        退出登录
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        itemData:[
            {title:'地址管理',name:'Address',content:'新增/修改地址'},
            {title:'关联账号',name:'CountLink',content:'微信号等'},
        ]
    };
  },
  created(){
    this.getUserMes()
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Mine" });
    },
    toWhere(item){
        // console.log(item);
        this.$router.push({name:item.name})
    },
    exit(){
        localStorage.setItem("loginPhone","");
        this.$router.push({name:'Home'})
    },
    getUserMes() {
      this.loginPhone = localStorage.getItem("loginPhone");
      this.userData = JSON.parse(localStorage.getItem("userData"))[
        this.loginPhone
      ];
    },
  },
};
</script>

<style lang="less" scoped>
#countSetting {
  background-color: #f2f2f2;
  height: 100%;
  .part {
    margin-bottom: 10px;
  }
  .img-box{
      display: flex;
      height: 50px;
      line-height: 50px;
      .name{
          margin-left: 5px;
      }
  }
  .exit-btn{
      margin: 30px 10px;
      background-color: #ff6600;
      color: #fff;
      text-align: center;
      padding: 10px 0;
      font-size: 16px;
  }
}
</style>