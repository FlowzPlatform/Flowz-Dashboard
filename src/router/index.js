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

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: { requiresAuth: true },
      children:[
        {
          path: 'dashboard',
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
            path: '/checkout/:id',
            name: 'checkout',
            component: checkout,
            props: {
              id: Text,
              required: false
            },
            meta: { requiresAuth: true }
        },
        {
           path: '/plan-details/:id',
           name: 'planDetails',
           component: planDetails,
           meta: { requiresAuth: true }
         }
      ]
    },
      {
        path: '/login',
        name: 'login',
        component: login
      }
  ]
})
