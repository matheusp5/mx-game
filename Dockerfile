FROM node:19

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos do pacote
COPY package*.json ./

# Instale as dependências do npm
RUN npm install

# Copie os arquivos restantes da aplicação
COPY . .

# Init point
CMD ["npm", "start"]
