import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'
import Login from '../views/Login.vue'
import Homepage from '../views/Homepage.vue'
import DetailTicket from '@/views/DetailTicket.vue'
import BuyTicketpage from '@/views/BuyTicketpage.vue'
import Profile from '@/views/Profile.vue'
import ModalToPay from '@/components/ToPayModal.vue'
const getUser = () => localStorage.getItem("user")

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
      path: '/detailticket/:ticketId',
      name: 'detailticket',
      component: DetailTicket
    },
    {
      path: '/buyticket/:buyticketId',
      name: 'buyticket',
      component: BuyTicketpage
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
      // children:[
      //   { path: "/profile/edit-profile/:username", name: "Edit", component: Profile },
      //   { path: "/profile/delete-profile/:username", name: "Delete", component: Profile },
      //   { path: "/profile/history-profile/:username", name: "History", component: Profile }
      // ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = getUser() !== null

  if (!isAuthenticated && (to.name === 'buyticket' || to.name === 'profile')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
