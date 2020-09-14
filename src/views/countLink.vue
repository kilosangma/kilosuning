<template>
    <div id="countLink">
        <SettingTop @leftclick="goBack" title="关联账号"></SettingTop>
        <div class="countLink-content">尚未发布，敬请期待</div>
    </div>
</template>

<script>
    export default {
        methods:{
            goBack(){
                this.$router.push({name:'CountSetting'})
            }
        }
    }
</script>

<style lang="less">
    .countLink-content{
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        height: 100px;
        line-height: 100px;
    }
</style>