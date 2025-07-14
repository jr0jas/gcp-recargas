# Imagen base
FROM node:18

# Crear y usar el directorio de la app
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8080

# Comando de arranque
CMD [ "npm", "start" ]
