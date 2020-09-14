<template>
  <div id="goodsDetails">
    <!-- 顶部标题按钮 -->
    <div class="nav_top" :style="{backgroundColor:'rgba(255,255,255,'+opc+')'}" ref="top">
      <div
        class="btn fr"
        :style="{backgroundColor: 'rgba(0,0,0,'+Math.abs(1-opc > 0.4 ? 0.4 : 1-opc )+')',color:opc < .9 ? 'white':'black'}"
        @click="$router.go(-1)"
      >
        <van-icon name="cross" />
      </div>
      <span :style="{color:'rgba(0,0,0,'+opc+')'}">商品详情</span>

      <div
        class="btn fl"
        :style="{backgroundColor: 'rgba(0,0,0,'+Math.abs(1-opc > 0.4 ? 0.4 : 1-opc )+')',color:isLike ? '#ff624b' : opc < .9 ? 'white':'black'}"
        @click="moreListShow = !moreListShow" :show="moreListShow"
      >
        <van-icon name="bars" />
      </div>
    </div>
    <NavMoreList top="50" @change-show="moreListShow = !moreListShow" :show="moreListShow" />
    <!-- 轮播图组件 -->
    <div class="banner">
      <div class="no-img" v-if="bannerData.length == 0">暂无照片</div>
      <van-swipe
        v-if="bannerData.length != 0"
        class="my-swipe"
        indicator-color="#ddd"
        @change="onChange"
      >
        <van-swipe-item v-for="(item,index) in bannerData" :key="index">
          <img :src="item.pics_big_url" class="auto-img" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{bannerData.length}}</div>
        </template>
      </van-swipe>
    </div>
    <!-- 价格及基本信息 -->
    <div class="price-box">
      <div class="price">￥{{basciMes.goods_price}}</div>
      <div class="title-box">
        <div class="title two-wrap">
          <i>自营</i>
          <span>{{basciMes.goods_name}}</span>
        </div>
      </div>
    </div>
    <div class="mes-btn page-item" @click="dropTheMesPanel">
      <div class="title">已选</div>
      <div class="content no-wrap">{{basciMes.goods_name + " " + basciMes.goods_weight}}</div>
      <div class="arrow">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </div>
    </div>
    <!-- 底部三分栏 -->
    <van-tabs v-model="active">
      <van-tab title="图文详情" v-html="goods_introduce"></van-tab>

      <van-tab title="规格参数">
        <van-collapse v-for="(item,index) in attrsData" :key="index" v-model="activeNames">
          <van-collapse-item :title="item.title" :name="index">
            <ul class="details">
              <li>
                <div>{{item.titleInner}}</div>
                <div>{{item.value}}</div>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-tab>

      <van-tab title="售后服务">
        <van-collapse v-model="activeNames2" v-for="(item,index) in serverData" :key="index">
          <van-collapse-item :title="item.title" :name="index">{{item.mes}}</van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>

    <!-- 商品详情卡片 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="basciMes.goods_id"
      :quota="100"
      :quota-used="0"
      :hide-stock="false"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon
        @click="collectFn"
        :icon="collectIcon[collectStatus].icon"
        :text="collectIcon[collectStatus].text"
        :color="collectIcon[collectStatus].color"
      />
      <van-goods-action-button @click="show=true" type="warning" text="加入购物车" />
      <van-goods-action-button @click="show=true" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import "../assets/less/goodsDetails.less";
export default {
  data() {
    return {
      opc: 0, // 透明度
      isLike: false, // 是否收藏
      current: 0, // 轮播图激活下标
      active: 0, // van-tab选中项下标
      activeNames: [], // 商品图文详情面板展开下标
      activeNames2: [0, 1, 2, 3], //商品信息面板展开下标
      goods_introduce: "", // 图片资源html
      bannerData: [], // 轮播图照片
      attrsData: [], // 商品信息数据
      basciMes: {}, // 商品基本信息
      serverData: [
        {
          title: "售后服务",
          mes:
            "本产品可由苏宁提供上门安装服务，服务过程中如需帮助请拨打苏宁全国服务热线4008-365-365进行详细咨询。本产品全国联保，如出现国家三包所规定的功能性故障时，凭生产厂家指定或特约售后服务中心的质量检测证明，享受三包服务。",
        },
        {
          title: "特别声明",
          mes:
            "本站苏宁自营商品的商品详情信息及包装参数信息均由供应商自行设计、制作并通过苏宁向其开放的数据端口自行发布，其真实性、准确性和合法性由供应商负责。本站保证苏宁自营商品均为原厂正品行货，但因生产厂家可能会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本站不能确保用户收到的货物与本站展示的图片、产地、附件说明完全一致。",
        },
        {
          title: "价格说明",
          mes:
            "划线价：商品展示的划线价，可能是品牌专柜标价、品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在苏宁易购平台或销售商门店曾经展示过的挂牌价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价、销售商门店挂牌价等可能会与您购物时展示的不一致，该价格仅供您参考。折扣：如无特殊说明，折扣指销售商在划线价基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。异常问题：商品促销信息以商品详情页“促销”信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。",
        },
      ],
      collectIcon: [
        { icon: "star", text: "已收藏", color: "#ffcc00" },
        { icon: "star-o", text: "收藏", color: "" },
      ],
      collectStatus: 1, // 0 表示已经收藏 1表示未收藏
      loginPhone: "",

      moreListShow: false,
      // show sku goods 均为商品规格卡片所需的data值
      show: false, // 商品规格卡片是否显示
      // 商品规格卡片配置信息 sku goods
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "型号", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name:
                  "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）", // skuValueName：规格值名称
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
          {
            k: "重量", // skuKeyName：规格类目名称
            k_s: "s2", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "100", // skuValueName：规格值名称
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 1000, // 价格（单位分）
            stock_num: 100, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 100, // 商品总库存

        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品

        hide_stock: true, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture:
          "http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg",
      },
    };
  },
  created() {
    this.getGoodsData();
    this.getLoginPhone();
    this.getCollectStatus();
  },
  beforeMount() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandle);
  },
  methods: {
    getGoodsData() {
      let self = this;
      let res = JSON.parse(this.$route.query.res);

      let goods_introduce = res.data.message.goods_introduce;
      let reg = /\\/g;
      //
      //  获取详情的图片html
      this.goods_introduce = goods_introduce.replace(reg, "");
      // 获取轮播图照片
      this.bannerData =
        res.data.message.pics.length == 0 ? [] : res.data.message.pics;

      // 获取规格参数数据
      this.attrsData = [];

      res.data.message.attrs.forEach((v, i) => {
        let titleArr = v.attr_name.split("-");
        let title = titleArr[0];
        let titleInner = titleArr[1];
        let value = v.attr_value;

        self.activeNames.push(i);
        self.attrsData.push({
          title,
          titleInner,
          value,
        });
      });
      // 获取基本信息
      this.basciMes = {
        goods_id: res.data.message.goods_id, // id
        goods_name: res.data.message.goods_name, // 商品名称
        goods_price: Number(res.data.message.goods_price).toFixed(2), // 商品价格
        goods_weight: res.data.message.goods_weight, // 商品重量
        goods_number: res.data.message.goods_number,
        goods_pic:
          res.data.message.pics.length == 0
            ? ""
            : res.data.message.pics[0].pics_mid,
      };

      // 设置 sku
      this.sku.list[0].id = res.data.message.goods_id;
      this.sku.list[0].price = (
        Number(res.data.message.goods_price) * 100
      ).toFixed(2);
      this.sku.list[0].stock_num = res.data.message.goods_number;
      this.sku.price = (Number(res.data.message.goods_price) * 100).toFixed(2);
      this.sku.tree[0].v[0].name = res.data.message.goods_name;
      this.sku.tree[1].v[0].name = res.data.message.goods_weight;
      this.goods.picture =
        res.data.message.pics.length == 0
          ? ""
          : res.data.message.pics[0].pics_mid;
    },
    // 滚动事件
    scrollHandle(e) {
      let scHeight = document.documentElement.scrollTop;
      let topHeight = this.$refs.top.clientHeight * 1.5;
      if (scHeight > topHeight) {
        this.opc = 1;
      } else {
        this.opc = 1;
        this.opc = scHeight / topHeight;
      }
    },
    onChange(index) {
      this.current = index;
    },
    dropTheMesPanel() {
      this.show = true;
    },
    getLoginPhone() {
      this.loginPhone = localStorage.getItem("loginPhone");
    },
    onBuyClicked(skuData) {
        // console.log(skuData);
        let orderData = []
        orderData[0] = Object.assign(this.basciMes);
        orderData[0].count = skuData.selectedNum;
        this.$router.push({name:'Settlement',query:{orderData:JSON.stringify(orderData)}})
    },
    onAddCartClicked(skuData) {
      if (this.loginPhone) {
        let shoppingcartData = JSON.parse(
          localStorage.getItem("shoppingcartData")
        );
        // 购物车localStorage不存在时
        if (!shoppingcartData) {
          shoppingcartData = {};
          shoppingcartData[this.loginPhone] = {};
          shoppingcartData[this.loginPhone][
            this.basciMes.goods_id
          ] = Object.assign(this.basciMes);
          shoppingcartData[this.loginPhone][this.basciMes.goods_id].count =
            skuData.selectedNum;
        } else {
          // 购物车localStorage存在 且存在改用户时
          if (shoppingcartData[this.loginPhone]) {
            //
            // 存在用户 但该商品未加入购物车
            if (!shoppingcartData[this.loginPhone][this.basciMes.goods_id]) {
              shoppingcartData[this.loginPhone][
                this.basciMes.goods_id
              ] = Object.assign(this.basciMes);
              shoppingcartData[this.loginPhone][this.basciMes.goods_id].count =
                skuData.selectedNum;
            } else {
              // 存在 用户且存在改商品 则修改其数量
              shoppingcartData[this.loginPhone][this.basciMes.goods_id].count +=
                skuData.selectedNum;
            }
          }
          // 购物车localStorage存在 不存在改用户数据时
          else {
            shoppingcartData[this.loginPhone] = {};
            shoppingcartData[this.loginPhone][
              this.basciMes.goods_id
            ] = Object.assign(this.basciMes);
            shoppingcartData[this.loginPhone][this.basciMes.goods_id].count =
              skuData.selectedNum;
          }
        }
        localStorage.setItem(
          "shoppingcartData",
          JSON.stringify(shoppingcartData)
        );
        this.$toast.success("加入成功");
        this.show = false;
      } else {
        this.$toast("请先登录");
      }
    },
    collectFn() {
      let collectData = JSON.parse(localStorage.getItem("collectData"));
      if (!this.loginPhone) {
        this.$toast("请先登陆");
        // this.$router()
        return;
      } else {
        this.collectStatus = Math.abs(this.collectStatus - 1);
        // 进行收藏操作
        if (this.collectStatus == 0) {
          // console.log(collectData);
          // console.log(this.loginPhone);

          collectData[this.loginPhone][this.basciMes.goods_id] = Object.assign(
            this.basciMes
          );
        } else {
          // 进行取消收藏操作
          delete collectData[this.loginPhone][this.basciMes.goods_id];
        }
        // console.log(collectData);
        localStorage.setItem("collectData", JSON.stringify(collectData));
      }
    },
    getCollectStatus() {
      let collectData = JSON.parse(localStorage.getItem("collectData"));
      this.collectStatus =
        collectData[this.loginPhone][this.basciMes.goods_id] === undefined
          ? 1
          : 0;
    },
  },
};
</script>

<style lang="less" scoped>
</style>