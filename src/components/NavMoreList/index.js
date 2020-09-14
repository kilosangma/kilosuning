import NavMoreListComponent from './NavMoreList.vue'
// 这里是重点
const NavMoreList = {
    install: function(Vue){
        Vue.component('NavMoreList',NavMoreListComponent)
    }
}
// 导出组件
export default NavMoreList