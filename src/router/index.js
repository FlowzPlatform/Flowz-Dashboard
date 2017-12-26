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
      routes: [
        {
          path: '/',
          name: 'login',
          component: login
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard
        },
        {
          path: '/subscriptionplan/:id',
          name: 'subscriptionplan',
          component: subscriptionplan
        },
        {
          path: '/create-plan',
          name: 'createPlan',
          component: createPlan
        },
        {
          path: '/subscription-list',
          name: 'subscriptionList',
          component: subscriptionList
        },
        {
          path: '/plan-details/:id',
          name: 'planDetails',
          component: planDetails
        },
        {
          path: '/checkout/:id',
          name: 'checkout',
          component: checkout,
          props: {
            id: Text,
            required: false
          }
    }
      ]
    })


    // const routes = [
    //   {
    //   path: '/',
    //   name: 'MainLayout',
    //   component: Layout,
    //   children: [{
    //     path: '/',
    //     //alias: '',
    //     component: dashboard,
    //     name: 'dashboard',
    //     //meta: { description: 'Overview of environment' }
    //   }, {
    //     // path: 'subscriptionplan/:id',
    //     path: 'subscriptionplan',
    //     component: subscriptionplan,
    //     name: 'subscriptionplan',
    //   }]
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    // {
    //   path: '/create-plan',
    //   name: 'createPlan',
    //   component: createPlan
    // }]
    // export default new Router({mode: 'history' , hashbang: false,routes: routes})
