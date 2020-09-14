<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    // app初始化时 检查是否有五大localStorage
    if(!localStorage.getItem("userData")){
      localStorage.setItem("userData","{}")
    }
    if(!localStorage.getItem("shoppingcartData")){
      localStorage.setItem("shoppingcartData","{}")
    }
    if(!localStorage.getItem("collectData")){
      localStorage.setItem("collectData","{}")
    }
    if(!localStorage.getItem("orderData")){
      localStorage.setItem("orderData","{}")
    }
    if(!localStorage.getItem("addressData")){
      localStorage.setItem("addressData","{}")
    }
  }
}
</script>
<style lang="less">
html,body,#app{
  height: 100%;
  font-size: 12px;
}
</style>
