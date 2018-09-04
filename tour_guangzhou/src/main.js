// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//处理移动端屏幕适配的js
require('@/assets/js/flexible.js')
require('@/assets/css/index.scss')

import picker from 'vue-3d-picker';
Vue.component(picker.name, picker);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
