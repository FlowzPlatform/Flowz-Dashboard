import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import subscriptionplan from '@/components/subscriptionplan'
import createPlan from '@/components/create-plan'
import subscriptionList from '@/components/subscription-list'
import checkout from '@/components/checkout'
import planDetails from '@/components/plan-details'
import Vuetable from '@/components/Vuetable'
import resetpassword from '@/components/reset-password'
import subscriberdetails from '@/components/subscriber-user-list'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Layout',
			component: Layout,
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'dashboard',
					component: dashboard,
					meta: { requiresAuth: true }
				},
				{
					path: 'create-plan',
					name: 'createPlan',
					component: createPlan,
					meta: { requiresAuth: true }
				},
				{
					path: 'subscription-list',
					name: 'subscriptionList',
					component: subscriptionList,
					meta: { requiresAuth: true }
				},
				{
					// path: 'subscriptionplan/:id',
					path: 'subscriptionplan',
					component: subscriptionplan,
					name: 'subscriptionplan'
				},
				{
					path: '/checkout/:id',
					name: 'checkout',
					component: checkout,
					props: true,
					meta: { requiresAuth: true }
				},
				{
					path: '/checkout/:id/:basicSubId/:basicPlan/:remainDays',
					name: 'checkout-addon',
					component: checkout,
					props: true,
					meta: { requiresAuth: true }
				},
				{
					path: '/plan-details',
					name: 'planDetails',
					component: planDetails,
					meta: { requiresAuth: true }
				}, {
					path: '/acl',
					name: 'acl',
					component: Vuetable,
					meta: { requiresAuth: true }
				},
				{
					path: '/subscriberdetails',
					name: 'subscriberdetails',
					component: subscriberdetails,
					meta: { requiresAuth: true }
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/reset-password',
			name: 'reset-password',
			component: resetpassword
		}
	]
})
