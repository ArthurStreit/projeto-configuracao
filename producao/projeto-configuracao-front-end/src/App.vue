<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Minha Aplicação</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" text>
            {{ nomeUsuario }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nomeUsuario = ref('Usuário')

onMounted(() => {
  const email = localStorage.getItem('usuario_email')
  nomeUsuario.value = email || 'Usuário'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario_email')
  router.push('/')
}
</script>