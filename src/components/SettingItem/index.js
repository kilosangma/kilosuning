import SettingItemComponent from './SettingItem.vue'
// 这里是重点
const SettingItem = {
    install: function(Vue){
        Vue.component('SettingItem',SettingItemComponent)
    }
}
// 导出组件
export default SettingItem