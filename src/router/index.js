import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import pricing from '@/components/pricing'


Vue.use(Router)

    // export default new Router({
    //   routes: [
    //     {
    //       path: '/',
    //       name: 'login',
    //       component: login
    //     },
    //     {
    //       path: '/dashboard',
    //       name: 'dashboard',
    //       component: dashboard
    //     },
    //     {
    //       path: '/pricing/:id',
    //       name: 'pricing',
    //       component: pricing
    //     }
    //   ]
    // })


    const routes = [{
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'dashboard',
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