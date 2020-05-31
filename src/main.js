import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCropper from 'vue-cropper'
Vue.prototype.$axios = axios; 

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL="http://111.230.173.74:7001/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(ElementUI);
Vue.use(VueCropper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
