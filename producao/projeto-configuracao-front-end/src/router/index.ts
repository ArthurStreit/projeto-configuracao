import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Tarefas from '@/views/tarefas.vue'
import Cadastrar from '@/views/cadastrar.vue'
import Editar from '@/views/editar.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/tarefas',
    component: Tarefas,
    meta: { requiresAuth: true }
  },
  {
    path: '/tarefas/cadastrar',
    component: Cadastrar,
    meta: { requiresAuth: true }
  },
  {
    path: '/tarefas/editar/:id',
    component: Editar,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.path === '/' && token) {
    return next('/tarefas')
  }

  if (to.meta.requiresAuth && !token) {
    return next('/')
  }

  next()
})

export default router