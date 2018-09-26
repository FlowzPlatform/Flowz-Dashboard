// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

// import config from '@/config'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import config1 from '../config/customConfig'
import AsyncComputed from 'vue-async-computed'

// Tell Vue to use the plugin
// Vue.use(VueCookie);

import Icon from 'vue-awesome/components/Icon'

import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'

import axios from 'axios'
import psl from 'psl'
import Cookies from 'js-cookie'

// Include and set up feathers client
const Feathers = require('feathers/client')
const hooks = require('feathers-hooks')
const feathers = Feathers().configure(hooks())

// Include it as a CommonJS module
const vueFeathers = require('vue-feathers')

// And plug it in
Vue.use(vueFeathers, feathers)

Vue.config.productionTip = false
Vue.use(AsyncComputed)

Vue.component('icon', Icon) // CSS

var VueCookie = require('vue-cookie')
Vue.use(VueCookie)

Vue.use(iView, { locale })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	iView.LoadingBar.config({ color: '#0e406d' })
	let obId = false
	let location = psl.parse(window.location.hostname) // get parent domain
	location = location.domain === null ? location.input : location.domain
	if (to.query.ob_id) {
		obId = to.query.ob_id
	}
	if (to.query.token) {
		router.app.$cookie.set('auth_token', to.query.token, { expires: 1, domain: location })
	}
	const token = router.app.$cookie.get('auth_token')
	// set token in axios
	if (token) {
		axios.defaults.headers.common['authorization'] = token
		axios({
			method: 'get',
			url: config1.userDetail
			// headers: {'Authorization': response.data.logintoken}
		})
			.then(function (result) {
				let location = psl.parse(window.location.hostname)
				location = location.domain === null ? location.input : location.domain
				Cookies.set('user', result.data.data.email, {domain: location})

				if (result.data.data.package !== undefined) {
					next()
				} else {
					if (to.name !== 'checkout') {
						next({
							path: '/subscription-list'
						})
					}
				}
			})
			.catch(function (error) {
				if (error.response.status == 401) {
					let location = psl.parse(window.location.hostname)
					location = location.domain === null ? location.input : location.domain

					Cookies.remove('auth_token', {domain: location})
					Cookies.remove('subscriptionId', {domain: location})
				} else if (error.response.status == 403) {}
			})
	} else {
		delete axios.defaults.headers.common['authorization']
	}
	if (to.matched.some(record => record.meta.requiresAuth) && obId) {
		window.console.log('ob_id obtained')
		next({
			path: '/login',
			query: { ob_id: obId }
		})
	} else if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === 'null')) {
		window.console.log('Not authenticated')
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			store.dispatch('authenticate', token).then(response => {
				// console.log("Set User called from mainjs")
				// store.commit('SET_USER', response)
				next()
			}).catch(error => {
				// console.log(error.message)
				if (error.response.data === 'invalid token') {
					router.app.$cookie.delete('auth_token')
				}
				// window.console.log('Not authenticated')
				next({
					path: '/login',
					query: { redirect: to.fullPath }
				})
			})
		} else {
			if (to.path === '/login' && token) {
				next({
					path: '/'
				})
			} else {
				next()
			}
		}
	}
})
sync(store, router)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store: store,
	template: '<App/>',
	components: { App }
})
