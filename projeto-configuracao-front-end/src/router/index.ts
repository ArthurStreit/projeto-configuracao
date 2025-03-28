import { createRouter, createWebHistory } from 'vue-router'
import TarefasView from '../views/tarefas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tarefas',
      component: TarefasView,
    },
  ],
})

export default router
