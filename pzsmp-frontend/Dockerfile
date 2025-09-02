# Estágio 1: Build da Aplicação com Node
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Usa o script de build do package.json para criar a versão de produção
RUN npm run build

# Estágio 2: Servir os arquivos com Nginx
FROM nginx:alpine
# Copia os arquivos gerados no estágio de build para a pasta padrão do Nginx
COPY --from=build /app/dist/pzsmp-frontend/browser /usr/share/nginx/html
# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80