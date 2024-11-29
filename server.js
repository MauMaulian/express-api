const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.timeEnd('Tempo de inicialização');
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});