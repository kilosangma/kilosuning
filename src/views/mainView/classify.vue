<template>
  <div id="classify">
    <van-nav-bar
      title="分类"
      left-text="返回"
      left-arrow
      @click-left="$router.push({name:'Home'})"
      @click-right="$router.push({name:'SearchPage'})"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="classify-content">
      <div class="side-bar fl" ref="sideBar">
        <div
          @click="changeSideBarType(item,index)"
          v-for="(item,index) in siderBarMes"
          :key="index"
          class="side-bar-item fl no-wrap"
          :class="item.checked ? 'active' : ''"
          ref="sideItem"
        >{{item.name}}</div>
      </div>
      <div class="classify-main fl" ref='classifyMain'>
        <div class="item-box clearfix" v-for="(item,index) in contentMes[activeName]" :key="index">
          <div class="nav-title">
            <span>{{item.cat_name}}</span>
          </div>
          <div class="classify-list">
            <div class="list-item fl" v-for="(v,i) in item.children" :key="i" @click="toSearch(v)">
              <div class="img-box">
                <img :src="v.cat_icon" class="auto-img" />
              </div>
              <div class="item-name no-wrap">{{v.cat_name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/classify.less";
// import { classify } from "../../assets/js/classify";
// import { items } from "../../assets/js/items";
export default {
  data() {
    return {
      siderBarMes: [],
      contentMes: {},
      activeName: "大家电"
    };
  },
  created() {
    // this.getSideBarData();
    // 
    this.getClassifyData();
  },
  methods: {
    getClassifyData() {
      let classifyData = this.$store.state.classifyData;
      if (classifyData.length == 0) {
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true
        });
        this.axios({
          method: "GET",
          url: "/categories",
          params: {}
        })
          .then(res => {
            this.$toast.clear();
            if (res.status == 200) {
              // 
              let data = res.data.message;
              data.forEach((v, i) => {
                this.siderBarMes.push({ name: v.cat_name, checked: i == 0 }); // 初始化左侧列表
                if (i == 0) this.activeName = v.cat_name; // 设置默认激活名
                v.children.forEach((v1, i1) => {
                  if (!this.contentMes[v.cat_name]) {
                    this.contentMes[v.cat_name] = [];
                  }
                  if (v1.children) {
                    // v1.children.forEach(v2=>{
                    //   
                    // })
                    this.contentMes[v.cat_name].push(v1);
                  }
                });
              });
              this.$store.commit("setClassifyData",[this.siderBarMes.concat([]),Object.assign(this.contentMes)])
            }
            
            
          })
          .catch(err => {
            this.$toast.clear();
            this.$toast.fail("加载失败");
            
          });
      } else {
          this.siderBarMes = classifyData[0].concat([]);
          this.contentMes = Object.assign(classifyData[1])
          // localStorage.setItem('test1',JSON.stringify(this.contentMes))
      }   
    },

    changeSideBarType(item,index) {
      // 拦截
      let siderBar = this.$refs.sideBar;
      let sideItem = this.$refs.sideItem[index];
      let classifyMain = this.$refs.classifyMain;
      let maxScrollHeight = siderBar.scrollHeight - siderBar.offsetHeight;
      let scrollHeight = sideItem.offsetHeight * index;
      
      // 进行边界判断
      scrollHeight = scrollHeight > maxScrollHeight ? maxScrollHeight : scrollHeight;
      console.log(scrollHeight);
      siderBar.scroll(0,scrollHeight);
      classifyMain.scroll(0,0); // 右侧内容自动滚动到顶部

      if (item.checked) {
        return;
      }
      for (let i = 0; i < this.siderBarMes.length; i++) {
        if (this.siderBarMes[i].checked) {
          this.siderBarMes[i].checked = false;
        }
      }
      item.checked = true;
      // 设置列表标题
      this.activeName = item.name;
      // this.itemData = items[item.type].concat([]);
    },
    toSearch(item) {
      this.$router.push({
        name: "SearchResult",
        query: { query: item.cat_name }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>