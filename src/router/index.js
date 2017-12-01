import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import dashboard from '@/components/dashboard'
import subscriptionplan from '@/components/subscriptionplan'


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
    //       path: '/subscriptionplan/:id',
    //       name: 'subscriptionplan',
    //       component: subscriptionplan
    //     }
    //   ]
    // })


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
        // path: 'subscriptionplan/:id',
        path: 'subscriptionplan',
        component: subscriptionplan,
        name: 'subscriptionplan',
      }]
    }, {
      path: '/login',
      name: 'login',
      component: login
    }]
    export default new Router({mode: 'history' , hashbang: false,routes: routes})