<template>
  <div id="SettingItem" @click="itemClick">
    <div class="setting-div title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="setting-div content">
      <slot name="content">{{content}}</slot>
    </div>
    <!-- <div class="img-box" style="height:50px">
        <img src="@/assets/images/usericon.jpg" class="auto-img-y"/>
    </div>-->
    <!-- 设置个性昵称 -->
    <div class="setting-div right" v-if="right"></div>
  </div>
</template>

<script>
import "@/assets/less/SettingItem.less";
export default {
  name: "setting-item",
  props:{
    title:{
      type:String,
      default:'标题'
    },
    content:{
      type:String,
      default:'内容'
    },
    right:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    itemClick(){
      this.$emit("item-click")
    }
  },
  created(){
    console.log(this.right);
  }
};
</script>

<style lang="less" scoped>
</style>