# Usar una imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos al directorio de trabajo
COPY . .

# Exponer el puerto en el que la aplicación Express se ejecuta
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]