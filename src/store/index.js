import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classifyData: []
  },
  mutations: {
    setClassifyData(context,arr) {
      context.classifyData = arr
    },
    text(context){
      console.log(context);
    }
  },
  actions: {
  },
  modules: {
  }
})
