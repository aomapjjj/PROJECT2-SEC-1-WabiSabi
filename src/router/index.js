import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'
import Login from '../views/Login.vue'
import Homepage from '../views/Homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'home',
      component: Homepage
    },
  ]
})

export default router
