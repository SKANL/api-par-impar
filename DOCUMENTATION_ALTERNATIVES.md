# 📚 Alternativas de Documentación para APIs en Node.js

## 🎯 Resumen Ejecutivo

Si usas **Swagger** y **Scalar** en C#, aquí tienes las mejores alternativas para Node.js:

| Herramienta | Instalación | Ventaja Principal | Cuándo Usar |
|-------------|-------------|-------------------|-------------|
| **Swagger UI Express** | `npm install swagger-ui-express swagger-jsdoc` | Estándar de la industria | Proyectos enterprise |
| **Scalar** | `npm install @scalar/express-api-reference` | UI moderna y hermosa | UX moderna |
| **Redoc** | CDN o `npm install redoc-cli` | Documentación estática | Solo lectura |
| **Fastify Swagger** | `npm install @fastify/swagger` | Auto-generación | Con Fastify |
| **API Blueprint + Aglio** | `npm install aglio` | Sintaxis markdown | Documentación como código |

## 🔧 Implementación Paso a Paso

### 1. Swagger UI Express (Recomendado)

```bash
npm install swagger-ui-express swagger-jsdoc
```

**Configuración básica:**
```javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Archivos con JSDoc
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

**Ventajas:**
- ✅ Amplia adopción y soporte
- ✅ Documentación interactiva
- ✅ Compatible con OpenAPI 3.0
- ✅ Ecosistema maduro

**Desventajas:**
- ❌ UI puede parecer anticuada
- ❌ Configuración manual de JSDoc

### 2. Scalar (Ultra Moderno)

```bash
npm install @scalar/express-api-reference
```

**Configuración:**
```javascript
const { apiReference } = require('@scalar/express-api-reference');

app.use('/docs', apiReference({
  theme: 'kepler',
  spec: {
    url: '/openapi.json',
  },
}));
```

**Ventajas:**
- ✅ UI moderna y hermosa
- ✅ Mejor experiencia de usuario
- ✅ Responsive design
- ✅ Múltiples temas

**Desventajas:**
- ❌ Más nuevo, menor adopción
- ❌ Menos recursos de aprendizaje

### 3. Redoc Express

```bash
npm install redoc-express
```

**Configuración:**
```javascript
const redoc = require('redoc-express');

app.get('/docs', redoc({
  title: 'API Docs',
  specUrl: '/swagger.json'
}));
```

**Ventajas:**
- ✅ Documentación hermosa
- ✅ Tres columnas (nav, content, code)
- ✅ Responsive
- ✅ Carga rápida

**Desventajas:**
- ❌ Solo lectura (no interactiva)
- ❌ No permite probar endpoints

### 4. Fastify Swagger (Para Fastify)

```bash
npm install @fastify/swagger @fastify/swagger-ui
```

**Configuración:**
```javascript
await fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: { title: 'Test swagger', version: '0.1.0' }
  }
});

await fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation'
});
```

**Ventajas:**
- ✅ Auto-generación desde schemas
- ✅ Integración nativa con Fastify
- ✅ Menos configuración manual

**Desventajas:**
- ❌ Solo para Fastify
- ❌ No compatible con Express

### 5. API Blueprint + Aglio

```bash
npm install aglio
```

**Archivo blueprint (.apib):**
```markdown
# Mi API

## Endpoint [/api/users]

### Obtener usuarios [GET]

+ Response 200 (application/json)
    + Body
        {
            "users": []
        }
```

**Generar documentación:**
```bash
aglio -i api.apib -o docs.html
```

**Ventajas:**
- ✅ Sintaxis markdown simple
- ✅ Documentación como código
- ✅ Fácil de versionar

**Desventajas:**
- ❌ Menor adopción
- ❌ Formato propietario
- ❌ No es OpenAPI estándar

## 🎨 Comparación Visual

| Característica | Swagger UI | Scalar | Redoc | Fastify | API Blueprint |
|----------------|------------|--------|-------|---------|---------------|
| **UI Moderna** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Interactividad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Facilidad Setup** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Adopción** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **OpenAPI Compatible** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |

## 🚀 Configuración Recomendada (Múltiples Opciones)

Para máxima flexibilidad, implementa **múltiples opciones**:

```javascript
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { apiReference } = require('@scalar/express-api-reference');

const app = express();

// Configuración OpenAPI
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

// 1. Swagger UI (clásico)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 2. Scalar (moderno)
app.use('/docs/scalar', apiReference({
  theme: 'kepler',
  spec: { content: specs },
}));

// 3. Redoc (estático)
app.get('/docs/redoc', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Docs</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <redoc spec-url='/api-docs.json'></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  `);
});

// 4. JSON schema
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
```

## 📊 Decisión según Caso de Uso

### Para Equipos Enterprise
- **Swagger UI Express**: Estándar, confiable, bien documentado

### Para UX Moderna
- **Scalar**: Interfaz hermosa, experiencia moderna

### Para Documentación Externa
- **Redoc**: Documentación estática, fácil de compartir

### Para Fastify Projects
- **@fastify/swagger**: Auto-generación, integración nativa

### Para Documentación como Código
- **API Blueprint**: Markdown, control de versiones sencillo

## 🎯 Recomendación Final

**Para un proyecto profesional completo:**

1. **Primario**: Swagger UI Express (máxima compatibilidad)
2. **Alternativo**: Scalar (experiencia moderna)
3. **Estático**: Redoc (para compartir externamente)

Esta configuración te da flexibilidad para diferentes audiencias y casos de uso.

## 📝 Ejemplo Completo

Puedes ver la implementación completa en nuestro proyecto Par/Impar:
- Swagger UI: `https://localhost:8443/api-docs`
- Scalar: `https://localhost:8443/docs/scalar`
- Redoc: `https://localhost:8443/docs/redoc`

¡Prueba todas las opciones y elige la que mejor se adapte a tu proyecto!
