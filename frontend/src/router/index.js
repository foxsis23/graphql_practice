import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/add',
    name: 'add-page',
    component: () => import('../views/AddView.vue')
  },
  {
    path: '/about',
    name: 'about-page',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register-page',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login-page',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile-page',
    component: () => import('../views/ProfileView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
