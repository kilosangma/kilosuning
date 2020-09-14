import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Dialog, Popup, Area, Button, Field, Form, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku, Collapse, CollapseItem, Tab, Tabs, Stepper, Tabbar, TabbarItem, Search, Swipe, SwipeItem, Lazyload, NavBar, Icon, Checkbox, Toast } from 'vant';
import axios from 'axios'
import VueAxios from 'vue-axios'
import YourLike from '@/components/YourLike/';
// 此处进行组件导入 并通过use设置为共有组件
import NavMoreList from '@/components/NavMoreList/';
import SettingTop from '@/components/SettingTop/'
import SettingItem from '@/components/SettingItem'
import { Loading } from "@/assets/js/loadingAnime.js";
import 'lib-flexible'
Vue.config.productionTip = false
import 'font-awesome/css/font-awesome.css'

Vue.prototype.Loading = Loading;
Vue.use(YourLike);
Vue.use(NavMoreList);
Vue.use(SettingTop);
Vue.use(SettingItem);
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(NavBar)
  .use(Icon)
  .use(Checkbox)
  .use(Stepper)
  .use(VueAxios, axios)
  .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(Collapse)
  .use(CollapseItem)
  .use(Sku)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Area)
  .use(Popup)
  .use(Dialog)
// .use(YourLike)
// .use(axios)

// 配置基础请求路径
axios.defaults.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
// 配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
//发起请求之前处理
axios.interceptors.request.use(config => {
  // 
  // 
  if (config.method == 'post') {
    let paramsString = '';
    //post请求参数序列化，转成一个字符串
    for (let key in config.data) {
      paramsString += key + '=' + config.data[key] + '&'
    }
    // 
    config.data = paramsString.slice(0, -1);
    // 
  }
  return config;
})
//添加appkey属性保存appkey
// Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 全局路由守卫
router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  // 若跳转的位置为 'Mine' 则需要检查登录状态
  if (to.name == 'Mine') {
    // if()
    if (localStorage.getItem('loginPhone')) {
      window.scroll(0, 0);
      next();
    } else {
      next({ name: 'Login' })
    }
  } else {
    next();
  }

});