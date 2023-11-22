import { createRouter } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
});

export default router
