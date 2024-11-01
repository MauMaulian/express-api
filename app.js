const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json()); // Para permitir JSON no corpo das requisições

// 1. CREATE (POST)
app.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, ano_publicacao, isbn } = req.body;
    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, ano_publicacao, isbn },
    });
    res.json(novoLivro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao criar livro.' });
  }
});

// 2. READ (GET) - Todos os livros
app.get('/livros', async (req, res) => {
  try {
    const todosLivros = await prisma.livro.findMany();
    res.json(todosLivros);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar livros.' });
  }
});

// 3. READ (GET) - Livro específico
app.get('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(livro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar livro.' });
  }
});

// 4. UPDATE (PUT)
app.put('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ano_publicacao, isbn } = req.body;
    const livroAtualizado = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: { titulo, autor, ano_publicacao, isbn },
    });
    res.json(livroAtualizado);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar livro.' });
  }
});

// 5. DELETE (DELETE)
app.delete('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.livro.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Livro deletado com sucesso!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar livro.' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
