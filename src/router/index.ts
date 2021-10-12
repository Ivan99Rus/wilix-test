import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'StartPage',
    component: () => import('@/views/StartPage.vue')
  },
  {
    path: '/result',
    name: 'ResultPage',
    component: () => import('@/views/ResultPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
