const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.post('/livros', livroController.criarLivro);
router.get('/livros', livroController.buscarTodosLivros);
router.get('/livros/:id', livroController.buscarLivroPorId);
router.put('/livros/:id', livroController.atualizarLivro);
router.delete('/livros/:id', livroController.deletarLivro);

module.exports = router;