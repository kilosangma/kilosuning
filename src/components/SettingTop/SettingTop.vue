<template>
  <div id="SettingTop" :class="{'fixed':fixed}">
    <div class="left fl" @click="leftclick">
      <!-- <i class="fa fa-angle-left" aria-hidden="true"></i> -->
    </div>
    <div class="title fl">{{title}}</div>
    <div class="right fl">
      <div class="img-box" @click="more">
        <img src="@/assets/images/more-btn.png" class="auto-img" />
      </div>
    </div>
    <NavMoreList top="50" @change-show="more" :show="moreListShow" />
  </div>
</template>

<script>
import "@/assets/less/SettingTop.less";
export default {
  name: "SettingTop",
  methods: {
    leftclick() {
      this.$emit("leftclick");
    },
    more() {
      this.moreListShow = !this.moreListShow;
    },
  },
  data() {
    return {
      moreListShow: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "设置",
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
};
// more-btn.png
</script>

<style lang="less" scoped>
.fixed{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>