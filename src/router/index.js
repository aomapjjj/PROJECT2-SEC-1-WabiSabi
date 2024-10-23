import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Homepage from '../views/Homepage.vue'
import DetailTicket from '../views/DetailTicket.vue'
import BuyTicketPage from '../views/BuyTicketpage.vue'
import Profile from '../views/Profile.vue'
import PageNotFound from '../components/PageNotFound.vue'

const getUser = () => localStorage.getItem('user')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'homeview' }
    },

    {
      path: '/homeview',
      name: 'homeview',
      component: HomeView,
      children: [
        {
          path: '/homeview/login',
          name: 'login',
          component: HomeView
        }
      ]
    },

    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
      children: [
        {
          path: '/homepage/login',
          name: 'hompagelogin',
          component: HomeView
        }
      ]
    },
    {
      path: '/detailticket/:ticketId',
      name: 'detailticket',
      component: DetailTicket
    },
    {
      path: '/buyticket/:buyticketId',
      name: 'buyticket',
      component: BuyTicketPage
    },
    {
      path: '/profile',
      name: 'profile',

      component: Profile,
      children: [
        {
          path: 'editprofile/:username',
          name: 'editprofile',
          component: Profile
        },
        {
          path: 'history/:username',
          name: 'history',
          component: Profile
        }
      ]
    },
    {
      path: '/error404',
      name: 'PageNotFound',
      component: PageNotFound
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
