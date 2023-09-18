/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import store from '@/jobModule/store.js'

import VueI18n from 'vue-i18n/dist/vue-i18n.common.js'
import vnMessage from '@/lang/vn.json'
import enMessage from '@/lang/en.json'
import VeeValidate from 'vee-validate'
import Toast from '@/components/notification.vue'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Vue.component('job-item', JobItem)
Vue.use(VueI18n)
Vue.use(VeeValidate)
Vue.component('Toast', Toast)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
Vue.prototype.$XLSX = XLSX
Vue.prototype.$saveAs = saveAs
const messages = {
  vn: vnMessage,
  en: enMessage
}
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages,
  fallbackLocale: 'en'
})

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Job List'
  next()
})
