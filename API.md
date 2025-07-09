# 📖 Guía de la API

## 🌐 Base URL

- **Desarrollo**: `https://localhost:3443`
- **Producción**: Tu dominio configurado

## 🔐 Autenticación

Actualmente la API no requiere autenticación. Todos los endpoints son públicos.

## 📋 Endpoints

### 🏠 Root Endpoint

#### `GET /`

Información general de la API y enlaces a documentación.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "message": "API Par/Impar - Clean Architecture",
    "version": "1.0.0",
    "description": "API para determinar si un número es par o impar",
    "endpoints": {
      "health": "/api/parity/health",
      "checkParity": "/api/parity/check",
      "checkParityQuery": "/api/parity/check-query?number=X",
      "history": "/api/parity/history",
      "stats": "/api/parity/stats"
    },
    "documentation": {
      "swagger": "/api-docs",
      "scalar": "/docs/scalar",
      "redoc": "/docs/redoc",
      "openapi_json": "/api-docs.json"
    }
  },
  "message": "Welcome to Parity API"
}
```

---

### ❤️ Health Check

#### `GET /api/parity/health`

Verifica el estado de la API.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-07-09T20:00:00.000Z",
    "uptime": 3600.5,
    "version": "1.0.0",
    "environment": "development"
  },
  "message": "API is healthy"
}
```

---

### 🔢 Verificar Paridad (POST)

#### `POST /api/parity/check`

Determina si un número es par o impar usando el cuerpo de la petición.

**Content-Type**: `application/json`

**Cuerpo de la petición:**
```json
{
  "number": 42
}
```

**Validaciones:**
- `number` es requerido
- `number` debe ser un entero
- `number` debe estar entre -1000000 y 1000000

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "number": 42,
    "parity": "even",
    "timestamp": "2025-07-09T20:00:00.000Z",
    "processingTime": "2ms"
  },
  "message": "Number parity determined successfully"
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "number",
        "message": "Number must be an integer between -1000000 and 1000000"
      }
    ]
  }
}
```

---

### 🔢 Verificar Paridad (GET)

#### `GET /api/parity/check-query?number={number}`

Determina si un número es par o impar usando query parameters.

**Parámetros de consulta:**
- `number` (requerido): Número entero a evaluar

**Ejemplo:**
```
GET /api/parity/check-query?number=17
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "number": 17,
    "parity": "odd",
    "timestamp": "2025-07-09T20:00:00.000Z",
    "processingTime": "1ms"
  },
  "message": "Number parity determined successfully"
}
```

---

### 📜 Historial de Verificaciones

#### `GET /api/parity/history`

Obtiene el historial de todas las verificaciones de paridad realizadas.

**Parámetros de consulta opcionales:**
- `limit` (número): Limitar cantidad de resultados (por defecto: 100)
- `parity` (string): Filtrar por paridad ('even' o 'odd')

**Ejemplos:**
```
GET /api/parity/history
GET /api/parity/history?limit=10
GET /api/parity/history?parity=even
GET /api/parity/history?limit=5&parity=odd
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "id": "uuid-1",
        "number": 42,
        "parity": "even",
        "timestamp": "2025-07-09T20:00:00.000Z"
      },
      {
        "id": "uuid-2",
        "number": 17,
        "parity": "odd",
        "timestamp": "2025-07-09T19:59:00.000Z"
      }
    ],
    "totalCount": 2,
    "filteredCount": 2
  },
  "message": "Parity history retrieved successfully"
}
```

---

### 📊 Estadísticas

#### `GET /api/parity/stats`

Obtiene estadísticas de las verificaciones realizadas.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "totalChecks": 150,
    "evenCount": 75,
    "oddCount": 75,
    "evenPercentage": 50.0,
    "oddPercentage": 50.0,
    "lastCheck": "2025-07-09T20:00:00.000Z",
    "mostCheckedNumber": {
      "number": 42,
      "count": 5
    },
    "averageNumber": 21.5
  },
  "message": "Parity statistics retrieved successfully"
}
```

---

## 📝 Documentación Interactiva

### Swagger UI
- **URL**: `/api-docs`
- **Descripción**: Documentación clásica con Swagger UI

### Scalar
- **URL**: `/docs/scalar`
- **Descripción**: Interfaz moderna y rápida para explorar la API

### ReDoc
- **URL**: `/docs/redoc`
- **Descripción**: Documentación elegante y fácil de leer

### OpenAPI JSON
- **URL**: `/api-docs.json`
- **Descripción**: Especificación OpenAPI en formato JSON

---

## 🔍 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | Operación exitosa |
| `400` | Error de validación o datos incorrectos |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

---

## 📊 Estructura de Respuesta

### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    // Datos específicos del endpoint
  },
  "message": "Mensaje descriptivo"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensaje de error",
    "details": [] // Detalles adicionales (opcional)
  }
}
```

---

## 🧪 Ejemplos con cURL

### Verificar si 42 es par (POST)

```bash
curl -k -X POST https://localhost:3443/api/parity/check \
  -H "Content-Type: application/json" \
  -d '{"number": 42}'
```

### Verificar si 17 es par (GET)

```bash
curl -k "https://localhost:3443/api/parity/check-query?number=17"
```

### Obtener historial

```bash
curl -k "https://localhost:3443/api/parity/history"
```

### Obtener estadísticas

```bash
curl -k "https://localhost:3443/api/parity/stats"
```

### Health check

```bash
curl -k "https://localhost:3443/api/parity/health"
```

---

## 🐍 Ejemplos con Python

```python
import requests
import json

# Configuración
base_url = "https://localhost:3443"
headers = {"Content-Type": "application/json"}

# Desactivar verificación SSL para desarrollo
requests.packages.urllib3.disable_warnings()

# Verificar paridad
response = requests.post(
    f"{base_url}/api/parity/check",
    headers=headers,
    data=json.dumps({"number": 42}),
    verify=False
)

print(response.json())

# Obtener historial
response = requests.get(
    f"{base_url}/api/parity/history",
    verify=False
)

print(response.json())
```

---

## 🌐 Ejemplos con JavaScript (Fetch)

```javascript
// Configuración base
const baseURL = 'https://localhost:3443';

// Verificar paridad
async function checkParity(number) {
  try {
    const response = await fetch(`${baseURL}/api/parity/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number }),
    });
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Obtener estadísticas
async function getStats() {
  try {
    const response = await fetch(`${baseURL}/api/parity/stats`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Uso
checkParity(42);
getStats();
```

---

## ⚠️ Limitaciones Actuales

- **Persistencia**: Los datos se almacenan en memoria (se pierden al reiniciar)
- **Autenticación**: No implementada
- **Rate Limiting**: No implementado
- **Cache**: No implementado
- **Paginación**: Limitación básica con parámetro `limit`

---

## 🔜 Próximas Mejoras

- Base de datos persistente (PostgreSQL/MongoDB)
- Autenticación con JWT
- Rate limiting
- Cache con Redis
- Paginación avanzada
- Websockets para actualizaciones en tiempo real
- Métricas y monitoreo
