import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/books/add',
    name: 'BookAdd',
    component: () => import('../views/BookAdd.vue')
  },
  {
    path: '/books/:id/edit',
    name: 'BookEdit',
    component: () => import('../views/BookEdit.vue')
  },
  {
    path: '/books/:id',
    name: 'Book',
    component: () => import('../views/Book.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
