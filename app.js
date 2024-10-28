const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); // Para permitir JSON no corpo das requisições

// 1. CREATE (POST)
app.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, ano_publicacao, isbn } = req.body;
    const novoLivro = await pool.query(
      'INSERT INTO livros (titulo, autor, ano_publicacao, isbn) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, ano_publicacao, isbn]
    );
    res.json(novoLivro.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// 2. READ (GET) - Todos os livros
app.get('/livros', async (req, res) => {
  try {
    const todosLivros = await pool.query('SELECT * FROM livros');
    res.json(todosLivros.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 3. READ (GET) - Livro específico
app.get('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    res.json(livro.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// 4. UPDATE (PUT)
app.put('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ano_publicacao, isbn } = req.body;
    await pool.query(
      'UPDATE livros SET titulo = $1, autor = $2, ano_publicacao = $3, isbn = $4 WHERE id = $5',
      [titulo, autor, ano_publicacao, isbn, id]
    );
    res.json('Livro atualizado com sucesso!');
  } catch (err) {
    console.error(err.message);
  }
});

// 5. DELETE (DELETE)
app.delete('/livros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    res.json('Livro deletado com sucesso!');
  } catch (err) {
    console.error(err.message);
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
