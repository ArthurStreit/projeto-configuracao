<template>
  <div>
    <h2>Cadastrar Tarefa</h2>
    <v-form @submit.prevent="cadastrarTarefa">
      <v-text-field v-model="descricao" label="Descrição" required />
      <v-text-field v-model="dataPrevista" label="Data Prevista" type="date" required />
      <v-select
        v-model="situacao"
        :items="['pendente', 'em andamento', 'concluída']"
        label="Situação"
        required
      />
      <v-btn color="success" type="submit">Salvar</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const descricao = ref('')
const dataPrevista = ref('')
const situacao = ref('pendente')
const router = useRouter()

const cadastrarTarefa = async () => {
  const token = localStorage.getItem('token')
  await fetch('http://177.44.248.54:3000/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      descricao: descricao.value,
      data_prevista: dataPrevista.value,
      situacao: situacao.value
    })
  })

  router.push('/tarefas')
}
</script>