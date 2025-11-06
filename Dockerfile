FROM node:20-alpine

WORKDIR /app

# Copiamos solo package.json para aprovechar el caché de Docker
COPY package.json ./

RUN npm install --only=production

# Ahora copiamos el resto del código
COPY server.js ./

EXPOSE 8080

CMD ["npm", "start"]