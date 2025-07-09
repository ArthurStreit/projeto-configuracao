const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { enviarEmail } = require('./emailService');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Middleware para autenticar token
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, 'secreta-do-token', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Buscar todas as tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Buscar tarefa por ID
app.get('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await prisma.tarefa.findUnique({
      where: { id: Number(id) }
    });

    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao buscar tarefa por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

// Criar tarefa
app.post('/tarefas', autenticarToken, async (req, res) => {
  try {
    const { descricao, data_prevista, situacao } = req.body;

    const novaTarefa = await prisma.tarefa.create({
      data: {
        descricao,
        data_prevista: new Date(data_prevista),
        data_criacao: new Date(),
        situacao
      }
    });

    await enviarEmail(
      'destinatario@exemplo.com',
      'Nova tarefa cadastrada',
      `<p>Uma nova tarefa foi criada: <strong>${descricao}</strong></p>`
    );

    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('Erro ao cadastrar tarefa:', error);
    res.status(500).json({ error: 'Erro ao cadastrar tarefa' });
  }
});

// Atualizar tarefa
app.put('/tarefas/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, data_prevista, situacao } = req.body;

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: {
        descricao,
        data_prevista: new Date(data_prevista),
        situacao
      }
    });

    await enviarEmail(
      'destinatario@exemplo.com',
      'Tarefa atualizada',
      `<p>A tarefa <strong>${descricao}</strong> foi atualizada.</p>`
    );

    res.json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// Deletar tarefa
app.delete('/tarefas/:id', autenticarToken, async (req, res) => {
  const id = Number(req.params.id);

  try {
    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await prisma.tarefa.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: usuario.id }, 'secreta-do-token', {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Logout simbólico
app.post('/logout', autenticarToken, async (req, res) => {
  // Opcionalmente: você poderia registrar logout em um log de auditoria
  res.json({ message: 'Logout efetuado com sucesso (token descartado no front-end)' })
});


// Inicializa o servidor
app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});