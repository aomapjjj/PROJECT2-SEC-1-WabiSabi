import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'
import Login from '../views/Login.vue'
import Homepage from '../views/Homepage.vue'
import DetailTicket from '@/views/DetailTicket.vue'
import BuyTicketpage from '@/views/BuyTicketpage.vue'

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
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/detailticket',
      name: 'detailticket',
      component: DetailTicket
    },
    {
      path: '/buyticket',
      name: 'buyticket',
      component: BuyTicketpage
    },
  ]
})

export default router
