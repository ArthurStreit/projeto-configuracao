<template>
  <div>
    <h2>Lista de Tarefas</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Data Criação</th>
          <th>Data Prevista</th>
          <th>Data Encerramento</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarefa in tarefas" :key="tarefa.id">
          <td>{{ tarefa.id }}</td>
          <td>{{ tarefa.descricao }}</td>
          <td>{{ formatarData(tarefa.data_criacao) }}</td>
          <td>{{ formatarData(tarefa.data_prevista) }}</td>
          <td>{{ tarefa.data_encerramento ? formatarData(tarefa.data_encerramento) : '---' }}</td>
          <td>{{ tarefa.situacao }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Tarefa {
  id: number
  descricao: string
  data_criacao: string
  data_prevista: string
  data_encerramento: string | null
  situacao: string
}

const tarefas = ref<Tarefa[]>([])

const buscarTarefas = async () => {
  const response = await fetch('http://localhost:3000/tarefas')
  const data = await response.json()
  tarefas.value = data
}

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

onMounted(buscarTarefas)
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>
