import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/starships/:id',
      name: 'StarshipDetails',
      component: () => import('./views/StarshipDetails.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue')
    }
    
  ]
})
