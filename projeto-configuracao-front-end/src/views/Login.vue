<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="fazerLogin">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              />
              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                required
              />
              <v-btn color="primary" type="submit" block>
                Entrar
              </v-btn>
              <v-alert v-if="erro" type="error" class="mt-3">
                {{ erro }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/tarefas')
  }
})

const fazerLogin = async () => {
  erro.value = ''
  try {
    const response = await fetch('http://177.44.248.54:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, senha: senha.value }),
    })

    if (!response.ok) {
      erro.value = 'Usuário ou senha inválidos'
      return
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario_email', email.value) // Armazena o e-mail

    router.push('/tarefas')
  } catch (e) {
    erro.value = 'Erro ao conectar com o servidor.'
    console.error(e)
  }
}
</script>

<style scoped>
.v-card {
  padding: 16px;
}
</style>