import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import startQuiz from '@/components/quiz_page'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/start/:courses?',
    name: 'start',
    component: startQuiz,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
