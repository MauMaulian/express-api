const express = require('express');
const app = express();
const livroRoutes = require('./routes/livroRoutes');

console.time('Tempo de inicialização');

app.use(express.json());
app.use('/api', livroRoutes);

module.exports = app;
