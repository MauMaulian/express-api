const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const criarLivro = async (req, res) => {
  try {
    const novoLivro = await prisma.livro.create({
      data: req.body,
    });
    res.json(novoLivro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao criar livro.' });
  }
};

const buscarTodosLivros = async (req, res) => {
  try {
    const todosLivros = await prisma.livro.findMany();
    res.json(todosLivros);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar livros.' });
  }
};

const buscarLivroPorId = async (req, res) => {
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(livro);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao buscar livro.' });
  }
};

const atualizarLivro = async (req, res) => {
  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(livroAtualizado);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao atualizar livro.' });
  }
};

const deletarLivro = async (req, res) => {
  try {
    await prisma.livro.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Livro deletado com sucesso!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao deletar livro.' });
  }
};

module.exports = {
  criarLivro,
  buscarTodosLivros,
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro,
};
