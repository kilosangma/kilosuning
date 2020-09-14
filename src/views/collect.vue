<template>
  <div id="collect" :class="{'edit':edit}">
    <SettingTop @leftclick="$router.go(-1)" title="收藏夹" :fixed="fixed"></SettingTop>
    <div class="collect-box" v-if="JSON.stringify(collectData) != '{}'">
      <div class="top-bar">
        <div class="btn-show" :class="{'active':showStatus}" @click="changModel">仅看有货</div>
        <div class="edit" @click="changeEdit">编辑</div>
      </div>
      <div class="collect-content">
        <div class="collect-item"  v-for="(item,index) in collectData" :key="index">
          <div class="left-part" :class="{'show':edit}">
            <van-checkbox v-model="item.checked" @click="selectOne"></van-checkbox>
          </div>
          <div class="right-part" :class="{'edit':edit}">
            <div class="img-box fl" @click="toDetail(item)">
              <img :src="item.goods_pic" class="auto-img" />
            </div>
            <div class="collect-mes fl">
              <div class="collect-title two-wrap">{{item.goods_name}}</div>
              <div class="price">￥{{item.goods_price}}</div>
              <div class="tags clearfix">
                <div class="tag1 fl">秒杀</div>
                <div class="tag2 fl">比关注时下降￥100.00</div>
              </div>
              <div class="toshop">
                <div class="img-box-btn">
                  <img src="@/assets/images/shop-btn.png" class="auto-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="collect-item">
          <div class="left-part" :class="{'show':edit}">
            <van-checkbox v-model="checked"></van-checkbox>
          </div>
          <div class="right-part" :class="{'edit':edit}">
            <div class="img-box fl">
              <img
                src="http://image4.suning.cn/uimg/b2c/newcatentries/0070072917-000000000120155796_1_400x400.jpg"
                class="auto-img"
              />
            </div>
            <div class="collect-mes fl">
              <div
                class="collect-title two-wrap"
              >123456sadddddddddddddd123222222asdddasdasdsadsaaaaaaaaa</div>
              <div class="price">￥4199.00</div>
              <div class="tags clearfix">
                  <div class="tag1 fl">秒杀</div>
                  <div class="tag2 fl">比关注时下降￥100.00</div>
              </div>
              <div class="toshop">
                  <div class="img-box-btn">
                      <img src="@/assets/images/shop-btn.png" class="auto-img">
                  </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div class="empty-box" v-if="JSON.stringify(collectData) == '{}'">
          <div class="img-box">
            <img src="@/assets/images/no-collect.png" class="auto-img" />
          </div>
          <div class="tips">您暂时没有喜欢的商品哦~</div>
          <div class="btn-box">
            <div class="btn-empty" @click="$router.push({name:'Home'})">去首页</div>
          </div>
    </div>
    <div class="submit" v-if="JSON.stringify(collectData) != '{}'" :class="{'hidden':!edit}" >
      <van-checkbox @click="selectAll" v-model="checked"></van-checkbox>
      <span>全选</span>
      <div class="btn" @click="delSelect">删除所选</div>
    </div>
  </div>
</template>

<script>
import "@/assets/less/collect.less";
// import { delete } from 'vue/types/umd';
// import { delete } from 'vue/types/umd';
export default {
  data() {
    return {
      fixed: true,
      showStatus: true, // false表示查看全部 true表示只看有货
      checked: false, //全选按钮
      edit: false, // 是否进入编辑状态
      loginPhone: "",
      collectData: {},
    };
  },
  methods: {
    getCollectData() {
      let collectData = JSON.parse(localStorage.getItem("collectData"))[
        this.loginPhone
      ];
      for (let key in collectData) {
        collectData[key].checked = false;
      }
      this.collectData = Object.assign(collectData);
      console.log(this.collectData);
    },
    getLoginPhone() {
      this.loginPhone = localStorage.getItem("loginPhone");
    },
    changeEdit() {
      this.edit = !this.edit;
    },
    selectAll() {
        for(let key in this.collectData){
            this.collectData[key].checked = this.checked;  
        }
    },
    selectOne() {
        for (let key in this.collectData) {
        if (!this.collectData[key].checked) {
          this.checked = false;
          return;
        }
      }
      this.checked = true;
    },
    delSelect(){
        let obj = {}
        for (let key in this.collectData) {
            if (!this.collectData[key].checked) {
               obj[key] = this.collectData[key]
            //    console.log(this.collectData[key]);
            }
        }
        this.collectData = Object.assign(obj);
        let collectData = JSON.parse(localStorage.getItem('collectData'));
        collectData[this.loginPhone] = Object.assign(obj);
        localStorage.setItem("collectData",JSON.stringify(collectData))
    },
    changModel(){

    },
    toDetail(item){
        let params = {goods_id : item.goods_id};
         this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true
        });
        this.axios({
          method: "GET",
          url: "/goods/detail",
          params
        }).then(res=>{
            this.$toast.clear();
            if(res.status == 200){
                this.$router.push({name:'GoodsDetails',query:{res:JSON.stringify(res)}})
            }else{
                this.$toasy("商品失效")
            }
        }).catch(err=>{
            this.$toast.clear();
            this.$toasy("商品失效")
        })
    }
  },
  computed: {
    // 计算需展示的商品数据
    activeData() {
      return 0;
    },
  },
  created() {
    this.getLoginPhone();
    this.getCollectData();
  },
};
</script>

<style lang="less" scoped>
</style>