import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Webapp from './plugins/webapp'
import i18n from './i18n';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudSun, faBeer, faDragon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'weathericons/css/weather-icons.css'
import 'weathericons/css/weather-icons-wind.css'

Vue.use(Webapp)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faCloudSun)
library.add(faBeer)
library.add(faDragon)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
