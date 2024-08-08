# Build stage: Node.js 14 kullanarak uygulamayı derler
FROM node:14 AS build

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala ve uygulamayı derle
COPY . .
RUN npm run build

# Production stage: Nginx kullanarak derlenen dosyaları sunar
FROM nginx:alpine

# Build aşamasından derlenen dosyaları kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Portu aç
EXPOSE 80

# Nginx sunucusunu başlat
CMD ["nginx", "-g", "daemon off;"]
