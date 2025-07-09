<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h2>Lista de Tarefas</h2>

      <div class="d-flex align-center">
        <v-btn color="primary" @click="navegarParaCadastrar" prepend-icon="mdi-plus">
          Nova Tarefa
        </v-btn>

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-avatar color="blue">
                <span class="white--text">{{ inicialUsuario }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Usuário: {{ nomeUsuario }}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <v-data-table
      :headers="headers"
      :items="tarefas"
      class="elevation-1"
      item-value="id"
    >
      <template #item.data_criacao="{ item }">
        {{ formatarData(item.data_criacao) }}
      </template>
      <template #item.data_prevista="{ item }">
        {{ formatarData(item.data_prevista) }}
      </template>
      <template #item.data_encerramento="{ item }">
        {{ item.data_encerramento ? formatarData(item.data_encerramento) : '---' }}
      </template>
      <template #item.acoes="{ item }">
        <v-btn icon color="info" @click="editarTarefa(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="excluirTarefa(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Tarefa {
  id: number
  descricao: string
  data_criacao: string
  data_prevista: string
  data_encerramento: string | null
  situacao: string
}

const tarefas = ref<Tarefa[]>([])
const router = useRouter()

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Descrição', value: 'descricao' },
  { text: 'Data Criação', value: 'data_criacao' },
  { text: 'Data Prevista', value: 'data_prevista' },
  { text: 'Data Encerramento', value: 'data_encerramento' },
  { text: 'Situação', value: 'situacao' },
  { text: 'Ações', value: 'acoes', sortable: false }
]

const nomeUsuario = localStorage.getItem('usuario') || 'Desconhecido'
const inicialUsuario = nomeUsuario.charAt(0).toUpperCase()

const buscarTarefas = async () => {
  try {
    const response = await fetch('http://177.44.248.54:3000/tarefas')
    tarefas.value = await response.json()
  } catch (error) {
    alert('Erro ao buscar tarefas.')
    console.error(error)
  }
}

const editarTarefa = (id: number) => {
  router.push(`/tarefas/editar/${id}`)
}

const excluirTarefa = async (id: number) => {
  const confirmacao = confirm('Tem certeza que deseja excluir esta tarefa?')
  if (!confirmacao) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://177.44.248.54:3000/tarefas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao excluir tarefa')
    }

    await buscarTarefas()
    alert('Tarefa excluída com sucesso!')
  } catch (error) {
    alert(`Erro ao excluir tarefa: ${error}`)
    console.error(error)
  }
}

const navegarParaCadastrar = () => {
  router.push('/tarefas/cadastrar')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  router.push('/')
}

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

onMounted(buscarTarefas)
</script>
