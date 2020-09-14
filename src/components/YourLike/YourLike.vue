<template>
  <div id="your-like">
    <div class="top clearfix">
      <div class="content-box clearfix">
        <div class="img-box fl">
          <img src="@/assets/images/point.png" class="auto-img" />
        </div>
        <div class="title fl">猜你喜欢</div>
        <div class="img-box fl">
          <img src="@/assets/images/point.png" class="auto-img" />
        </div>
      </div>
    </div>
    <div class="goods-list clearfix">
      <div class="goods-item fl radius">
        <div class="img-box">
          <img
            src="http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000826147951_1_400x400.jpg"
            class="auto-img"
          />
        </div>
        <div class="title two-wrap">TCL 65Q960C 65英寸 哈曼卡顿 人工智能 金属超薄 64位34核 4K+HDR 原色量子点 曲面电视（灰色）</div>
        <div class="price">￥<span>520</span>.00</div>
      </div>
      <div class="goods-item fl radius">
        <div class="img-box">
          <img
            src="http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000826147951_1_400x400.jpg"
            class="auto-img"
          />
        </div>
        <div class="title two-wrap">TCL 65Q960C 65英寸 哈曼卡顿 人工智能 金属超薄 64位34核 4K+HDR 原色量子点 曲面电视（灰色）</div>
        <div class="price">￥<span>520</span>.00</div>
      </div>
      <div class="goods-item fl radius">
        <div class="img-box">
          <img
            src="http://image2.suning.cn/uimg/b2c/newcatentries/0000000000-000000000826147951_1_400x400.jpg"
            class="auto-img"
          />
        </div>
        <div class="title two-wrap">TCL 65Q960C 65英寸 哈曼卡顿 人工智能 金属超薄 64位34核 4K+HDR 原色量子点 曲面电视（灰色）</div>
        <div class="price">￥<span>520</span>.00</div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/less/base.less";
export default {
  props: {
    title: String,
    goodsData: Array,
  },
  name: "YourLike",
};
</script>

<style lang="less" scoped>
.top {
  padding: 10px;
  position: relative;
  height: 20px;
  .content-box {
    display: flex;
    align-items: center;
    position: absolute;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      margin: 0 10px;
      font-size: 14px;
      font-weight: 700;
    }
    .img-box {
      width: 26px;
    }
    .img-box:last-child {
      transform: rotate(180deg);
    }
  }
}
.goods-list {
  width: 100%;
  .goods-item {
    // height: 300px;
    background-color: #fff;
    width: calc(~"50% - 15px");
    margin: 0 5px 10px 10px;
    .img-box {
      width: 172px;
      height: 172.5px;
      overflow: hidden;
    }
    .title {
      margin: 5px 0;
      padding: 0 5px;
      font-size: 14px;
      font-weight: 700;
      color: #000;
      height: 38px;
      overflow: hidden;
    }
    .price{
      span{
        font-size: 18px;
      }
      margin: 10px 0;
      color: #ff6b00;
      font-size: 12px;
      font-weight: 700;
    }
  }
  .goods-item:nth-child(2n) {
    margin: 0 10px 10px 5px;
  }
}
</style>