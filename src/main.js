// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import config from '@/config'
import 'vue-awesome/icons/flag'

import 'vue-awesome/icons'

// Include and set up feathers client
const Feathers = require('feathers/client')
const hooks = require('feathers-hooks')
  // const authentication = require('feathers-authentication/client')
// const socketio = require('feathers-socketio/client')
// const io = require('socket.io-client')
//
// const socket = io("http://localhost:3030")
const feathers = Feathers()
  // .configure(socketio(socket))
  .configure(hooks())
  // .configure(authentication({storage: window.localStorage}))
  // Include it as a CommonJS module
const vueFeathers = require('vue-feathers')
  // And plug it in
Vue.use(vueFeathers, feathers)


Vue.config.productionTip = false
import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

// Tell Vue to use the plugin
// Vue.use(VueCookie);

import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)

import psl from 'psl'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css' // CSS


var VueCookie = require('vue-cookie')
Vue.use(VueCookie)
Vue.use(psl)

Vue.use(iView, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
