import { createRouter, createWebHistory } from 'vue-router'

//Views
import Landing from '../views/Landing.vue';
import Character from '../views/Character.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path:'/viewchar',
      name:'view',
      component: Character
    }
  ]
})

export default router
