import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import pricing from '@/components/pricing'


Vue.use(Router)

    const routes = [{
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '/',
        //alias: '',
        component: dashboard,
        name: 'dashboard',
        //meta: { description: 'Overview of environment' }
      }, {
        path: 'pricing/:id',
        component: pricing,
        name: 'pricing',
      }]
    }, {
      path: '/login',
      name: 'login',
      component: login
    }]
    export default new Router({mode: 'history' , hashbang: false,routes: routes})