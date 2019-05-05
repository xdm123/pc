// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import echarts from 'echarts'
import $ from 'jquery'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUi);




const fromdataAxios=axios.create() 


Vue.prototype.$fromdataHttp = fromdataAxios
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
