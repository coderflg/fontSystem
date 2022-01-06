import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import echarts from "echarts"
import ApiUtils from "./common/ApiUtils";
Vue.config.productionTip = false
Vue.prototype.API = ApiUtils
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.path !== '/login'){
    if (!sessionStorage.getItem("username")){
      next("/login")
    }
  }
  else {
    if (sessionStorage.getItem("username")){
      next("/")
    }
  }
  next()
})
