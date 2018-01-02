// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, Select,Container,Aside,Header,Main,Footer} from 'element-ui'

import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'


Vue.component(Container.name, Container)
Vue.component(Footer.name, Footer)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)



Vue.use(Button)

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */



Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
