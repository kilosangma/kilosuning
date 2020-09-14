import SettingTopComponent from './SettingTop.vue'
// 这里是重点
const SettingTop = {
    install: function(Vue){
        Vue.component('SettingTop',SettingTopComponent)
    }
}
// 导出组件
export default SettingTop