import Vue from 'vue'
import App from './App.vue'


import router from './routes'
import store from './store'
import './filters'
import './form'
import './bootstrap'
import './httpClient'
import './mixins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
