const express = require('express');
const app = express();
const livroRoutes = require('./routes/livroRoutes');

app.use(express.json());
app.use('/api', livroRoutes);

module.exports = app;
