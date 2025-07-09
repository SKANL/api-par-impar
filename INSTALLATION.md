# 🚀 Guía de Instalación y Despliegue

## 📋 Prerrequisitos

- **Node.js**: v14.0.0 o superior
- **npm**: v6.0.0 o superior
- **Git**: Para clonado del repositorio

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/SKANL/api-par-impar.git
cd api-par-impar
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables según sea necesario
# Nota: Las variables por defecto funcionan para desarrollo local
```

### 4. Verificar certificados SSL

Los certificados SSL autofirmados ya están incluidos en el directorio `ssl/`. Para desarrollo local, estos certificados son suficientes.

Para producción, reemplaza los archivos `ssl/cert.pem` y `ssl/key.pem` con certificados válidos.

## 🏃‍♂️ Ejecución

### Desarrollo

```bash
# Ejecutar en modo desarrollo
npm run dev

# O directamente con Node.js
node index.js
```

### Producción

```bash
# Ejecutar en modo producción
NODE_ENV=production npm start
```

## 🌐 Acceso a la API

Una vez iniciada la aplicación:

- **API Base**: `https://localhost:3443`
- **Documentación Swagger**: `https://localhost:3443/api-docs`
- **Documentación Scalar**: `https://localhost:3443/docs/scalar`
- **Documentación ReDoc**: `https://localhost:3443/docs/redoc`

## 🧪 Pruebas

### Ejecutar tests unitarios

```bash
npm test
```

### Ejecutar tests con cobertura

```bash
npm run test:coverage
```

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

## 🐳 Docker (Opcional)

### Construir imagen

```bash
docker build -t api-par-impar .
```

### Ejecutar contenedor

```bash
docker run -p 3443:3443 api-par-impar
```

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3443` |
| `API_PREFIX` | Prefijo de la API | `/api` |
| `LOG_LEVEL` | Nivel de logging | `info` |

### Configuración SSL

Para usar certificados personalizados:

1. Reemplaza `ssl/cert.pem` con tu certificado
2. Reemplaza `ssl/key.pem` con tu clave privada
3. Reinicia la aplicación

### Base de Datos

Actualmente la API usa un repositorio en memoria. Para implementar persistencia:

1. Instala el driver de tu base de datos preferida
2. Crea una nueva implementación del `NumberRepositoryInterface`
3. Modifica el archivo `index.js` para usar el nuevo repositorio

## 🚀 Despliegue en Producción

### Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login en Heroku
heroku login

# Crear aplicación
heroku create tu-app-name

# Configurar variables de entorno
heroku config:set NODE_ENV=production

# Desplegar
git push heroku main
```

### AWS/Azure/GCP

1. Configura un servidor con Node.js
2. Clona el repositorio
3. Instala dependencias con `npm ci --only=production`
4. Configura variables de entorno
5. Usa un process manager como PM2:

```bash
npm install -g pm2
pm2 start index.js --name "api-par-impar"
pm2 startup
pm2 save
```

### Nginx (Proxy Reverso)

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        proxy_pass https://localhost:3443;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔍 Monitoreo

### Health Check

La API incluye un endpoint de health check:

```bash
curl -k https://localhost:3443/api/parity/health
```

### Logs

Los logs se muestran en consola. Para producción, considera usar:

- **Winston** para logging avanzado
- **Morgan** para logs de HTTP
- **Sentry** para monitoreo de errores

## ⚡ Optimización

### Performance

- Usa un balanceador de carga para múltiples instancias
- Implementa caché con Redis para el historial
- Considera usar clustering con PM2

### Seguridad

- Implementa rate limiting
- Usa CORS apropiadamente
- Valida y sanitiza todas las entradas
- Mantén las dependencias actualizadas

## 🆘 Troubleshooting

### Problemas Comunes

**Error de certificado SSL**
```bash
# Para desarrollo, desactivar verificación SSL
curl -k https://localhost:3443
```

**Puerto en uso**
```bash
# Cambiar puerto en variables de entorno
export PORT=3444
npm start
```

**Permisos de archivo**
```bash
# Verificar permisos de certificados SSL
chmod 600 ssl/*.pem
```

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/SKANL/api-par-impar/issues)
- **Documentación**: [README.md](README.md)
- **Email**: Contactar al maintainer del repositorio
