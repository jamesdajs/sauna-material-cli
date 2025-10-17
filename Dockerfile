# ====================================================================
# ETAPA 1: BUILD (Compilación de la aplicación Angular)
# Utiliza una imagen de Node para instalar dependencias y generar los estáticos.
# ====================================================================
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia e instala dependencias para aprovechar el caché
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación en modo producción. 
# Esto genera los archivos estáticos en el directorio 'dist/' o 'dist/nombre-de-tu-app'.
# Asumimos que 'npm run build' ejecuta 'ng build'.
RUN npm run build -- --output-path=./dist --configuration=production


# ====================================================================
# ETAPA 2: PRODUCTION (Servir con Nginx)
# Utiliza la imagen ligera de Nginx para servir los archivos compilados.
# ====================================================================
FROM nginx:alpine

# 1. Copia la configuración de Nginx para manejar el routing SPA (crucial para Angular)
# Asume que el archivo 'nginx.conf' se encuentra en una carpeta 'config/'
# Si no usas la carpeta 'config/', ajusta la ruta de origen.
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# 2. Copia los archivos estáticos compilados de la etapa 'build' al directorio de Nginx.
# 🚨 AJUSTA ESTA LÍNEA si tu salida de 'ng build' no es directamente 'dist'.
# Por ejemplo: si es 'dist/nombre-de-tu-app', cambia '/app/dist' por '/app/dist/nombre-de-tu-app'
COPY --from=build app/dist /usr/share/nginx/html

# Puerto por defecto de Nginx
EXPOSE 80

# El servidor Nginx se inicia por defecto con el CMD de la imagen base.