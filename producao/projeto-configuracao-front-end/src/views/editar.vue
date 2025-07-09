<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Editar Tarefa</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="atualizarTarefa" ref="formRef">
              <v-text-field
                v-model="descricao"
                label="Descrição"
                :rules="[v => !!v || 'Descrição é obrigatória']"
                required
              />
              <v-text-field
                v-model="dataPrevista"
                label="Data Prevista"
                type="date"
                :rules="[v => !!v || 'Data prevista é obrigatória']"
                required
              />
              <v-select
                v-model="situacao"
                :items="['pendente', 'em andamento', 'concluída']"
                label="Situação"
                :rules="[v => !!v || 'Situação é obrigatória']"
                required
              />
              <v-btn color="primary" type="submit" class="mt-4">Atualizar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const descricao = ref('')
const dataPrevista = ref('')
const situacao = ref('pendente')
const formRef = ref()

const carregarTarefa = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://177.44.248.54:3000/tarefas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Erro ao carregar tarefa.')

    const data = await res.json()
    descricao.value = data.descricao
    dataPrevista.value = data.data_prevista.slice(0, 10)
    situacao.value = data.situacao
  } catch (err) {
    alert('Erro ao carregar a tarefa.')
  }
}

const atualizarTarefa = async () => {
  const token = localStorage.getItem('token')

  const form = formRef.value
  const valido = await form.validate?.()
  if (!valido) return

  try {
    const res = await fetch(`http://177.44.248.54:3000/tarefas/${id}`, {
      method: 'PUT',
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

    if (!res.ok) throw new Error('Erro ao atualizar tarefa.')

    router.push('/tarefas')
  } catch (err) {
    alert('Erro ao atualizar a tarefa.')
  }
}

onMounted(carregarTarefa)
</script>