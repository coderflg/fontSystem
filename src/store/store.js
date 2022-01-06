import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along' //vuex-along
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classList:[],
    showClass:""
  },
  mutations: {
    mutaUpdateClassList(state, data){
      state.classList = data
    },
    updateShowClass(state, data){
      state.showClass = data
    }
  },
  actions: {
    updateClassList(context, payload){
      context.commit("mutaUpdateClassList", payload)
    }
  },
  plugins: [createVuexAlong()]//vuex-along
})
