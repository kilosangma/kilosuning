import YourLikeComponent from './YourLike.vue'
// 这里是重点
const YourLike = {
    install: function(Vue){
        Vue.component('YourLike',YourLikeComponent)
    }
}
// 导出组件
export default YourLike