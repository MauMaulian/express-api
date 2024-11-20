# Usando a imagem do Node.js
FROM node:18

# Criando o diretório da aplicação
WORKDIR /app

# Copiando arquivos de configuração do Node.js
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o código-fonte
COPY . .

# Expondo a porta da aplicação
EXPOSE 5000

# Comando para rodar as migrações Prisma e depois iniciar o servidor
CMD npx prisma migrate deploy && npm start