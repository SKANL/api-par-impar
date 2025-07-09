# 🎯 API Par/Impar - Clean Architecture

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%7C%20Onion-brightgreen.svg)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

**🔗 Repository:** [https://github.com/SKANL/api-par-impar](https://github.com/SKANL/api-par-impar)

Una API REST desarrollada con Node.js y Express que implementa la arquitectura ONION (Clean Architecture) para determinar si un número es par o impar.

## 🏗️ Arquitectura

Este proyecto implementa Clean Architecture con las siguientes capas:

```
src/
├── domain/                 # Capa de Dominio (Core Business Logic)
│   ├── entities/          # Entidades de negocio
│   ├── value-objects/     # Objetos de valor
│   └── services/          # Servicios de dominio
├── application/           # Capa de Aplicación (Use Cases)
│   ├── use-cases/        # Casos de uso
│   └── interfaces/       # Puertos (interfaces)
├── infrastructure/       # Capa de Infraestructura (Frameworks & Tools)
│   ├── adapters/         # Adaptadores
│   ├── config/          # Configuraciones
│   ├── middleware/      # Middlewares
│   └── web/            # Web (rutas, servidor)
└── shared/             # Código compartido
    ├── utils/         # Utilidades
    ├── constants/     # Constantes
    └── exceptions/    # Excepciones personalizadas
```

## 🚀 Características

- ✅ **Clean Architecture**: Separación clara de responsabilidades
- ✅ **HTTPS**: Servidor seguro con certificados SSL autofirmados
- ✅ **Validaciones**: Middleware de validación con express-validator
- ✅ **Logging**: Sistema de logging para desarrollo y producción
- ✅ **Error Handling**: Manejo centralizado de errores
- ✅ **Dependency Injection**: Inyección de dependencias manual
- ✅ **Repository Pattern**: Abstracción de persistencia
- ✅ **Value Objects**: Objetos inmutables para conceptos de dominio
- ✅ **Documentación API**: Swagger UI, Scalar y Redoc
- ✅ **Testing**: Tests unitarios con Jest

## 📋 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información de la API y enlaces de documentación |
| GET | `/api/parity/health` | Health check |
| POST | `/api/parity/check` | Verificar paridad (JSON body) |
| GET | `/api/parity/check?number=5` | Verificar paridad (query param) |
| GET | `/api/parity/history` | Historial de verificaciones |
| GET | `/api/parity/stats` | Estadísticas de paridad |
| GET | `/api-docs` | Documentación Swagger UI |
| GET | `/docs/scalar` | Documentación Scalar (moderna) |
| GET | `/docs/redoc` | Documentación Redoc (estática) |

## 📦 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `npm start` | `node index.js` | Inicia el servidor en modo producción |
| `npm run dev` | `nodemon index.js` | Inicia el servidor con reinicio automático |
| `npm test` | `jest` | Ejecuta los tests unitarios |
| `npm run test:coverage` | `jest --coverage` | Tests con reporte de cobertura |
| `npm run test:watch` | `jest --watch` | Tests en modo watch |

## 🧪 Ejemplos de Pruebas

### Probar con curl

**Health Check:**
```bash
curl -k https://localhost:8443/api/parity/health
```

**Verificar número par (POST):**
```bash
curl -k -X POST https://localhost:8443/api/parity/check \
  -H "Content-Type: application/json" \
  -d '{"number": 42}'
```

**Verificar número impar (GET):**
```bash
curl -k "https://localhost:8443/api/parity/check?number=13"
```

**Obtener historial:**
```bash
curl -k "https://localhost:8443/api/parity/history?limit=5"
```

**Obtener estadísticas:**
```bash
curl -k "https://localhost:8443/api/parity/stats"
```

## 🛠️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/your-repo/api-par-impar.git
cd api-par-impar

# 2. Instalar dependencias de producción
npm install

# 3. Instalar dependencias de desarrollo (opcional)
npm install --save-dev jest nodemon supertest

# 4. Configurar variables de entorno (opcional)
cp .env.example .env

# 5. Iniciar el servidor
npm start
```

## 🎯 Uso

### Iniciar el servidor
```bash
npm start
```

### Desarrollo con reinicio automático
```bash
npm run dev
```

### Ejecutar tests
```bash
npm test
```

### Ejemplo de uso

**POST /api/parity/check**
```json
{
  "number": 42
}
```

**Respuesta:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Parity checked successfully",
  "data": {
    "id": 1,
    "number": 42,
    "parity": "even",
    "isEven": true,
    "isOdd": false,
    "description": "El número 42 es par",
    "timestamp": "2025-07-09T18:59:00.000Z"
  },
  "timestamp": "2025-07-09T18:59:00.000Z"
}
```

## 📚 Documentación de la API

Este proyecto incluye **3 opciones de documentación**, equivalentes a Swagger y Scalar de C#:

### 1. **Swagger UI** (Clásico)
- **URL**: `https://localhost:8443/api-docs`
- **Ventajas**: Más establecido, amplia adopción
- **Interfaz**: Tradicional de Swagger

### 2. **Scalar** (Moderno)
- **URL**: `https://localhost:8443/docs/scalar`  
- **Ventajas**: UI moderna y hermosa, mejor UX
- **Tema**: Kepler (diseño espacial)

### 3. **Redoc** (Estático)
- **URL**: `https://localhost:8443/docs/redoc`
- **Ventajas**: Documentación estática hermosa, responsive
- **Uso**: Ideal para documentación de solo lectura

### 4. **OpenAPI JSON**
- **URL**: `https://localhost:8443/api-docs.json`
- **Uso**: Esquema OpenAPI 3.0 en formato JSON

## 🏷️ Alternativas de Documentación para Node.js

Comparación con las herramientas de C#:

| Herramienta | Equivalente C# | Ventajas | Desventajas |
|-------------|----------------|----------|-------------|
| **Swagger UI Express** | Swagger/Swashbuckle | Amplia adopción, interactivo | UI anticuada |
| **Scalar** | Scalar | UI moderna, mejor UX | Más nuevo |
| **Redoc** | - | Hermosa, responsive | Solo lectura |
| **Fastify Swagger** | - | Auto-generación | Solo Fastify |
| **API Blueprint + Aglio** | - | Sintaxis markdown | Menos adopción |

## 🏆 Beneficios de la Arquitectura ONION

1. **Testabilidad**: Cada capa puede ser testeada independientemente
2. **Mantenibilidad**: Cambios en una capa no afectan las otras
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Independencia de Frameworks**: El core business no depende de Express
5. **Separation of Concerns**: Cada capa tiene una responsabilidad específica

## 📁 Estructura del Proyecto

- **Domain Layer**: Contiene la lógica de negocio pura
- **Application Layer**: Orquesta los casos de uso
- **Infrastructure Layer**: Implementa los detalles técnicos
- **Shared**: Código reutilizable entre capas

## 🔒 Seguridad

- Certificados SSL autofirmados para HTTPS
- Headers de seguridad básicos
- Validación de entrada robusta
- Manejo seguro de errores

## 🚦 Estado del Proyecto

- ✅ **Implementación base completa**
- ✅ **Arquitectura ONION implementada**
- ✅ **HTTPS configurado con certificados SSL**
- ✅ **Validaciones robustas con express-validator**
- ✅ **Manejo centralizado de errores**
- ✅ **Logging detallado**
- ✅ **Tests unitarios básicos**
- ✅ **Documentación API completa (Swagger, Scalar, Redoc)**
- ✅ **Dependency Injection implementado**
- ✅ **Repository Pattern funcionando**
- ⏳ Tests de integración (por implementar)
- ⏳ Base de datos persistente (actualmente in-memory)
- ⏳ Autenticación y autorización (futuro)

## 📄 Licencia

ISC
