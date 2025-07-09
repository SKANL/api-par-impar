# 🏗️ Guía de Arquitectura

## 📐 Principios de Clean Architecture

Este proyecto implementa los principios de **Clean Architecture** (también conocida como Arquitectura Hexagonal u Onion Architecture) propuesta por Robert C. Martin.

### 🎯 Objetivos

- **Independencia de frameworks**: La lógica de negocio no depende de Express.js
- **Testeable**: Lógica de negocio puede probarse sin UI, base de datos o servidor web
- **Independiente de UI**: La UI puede cambiar sin afectar el resto del sistema
- **Independiente de la base de datos**: Puede cambiar de base de datos sin afectar la lógica
- **Independiente de servicios externos**: La lógica no conoce el mundo exterior

## 📊 Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────┐
│                        FRAMEWORKS                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 ADAPTERS                            │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │              APPLICATION                    │   │   │
│  │  │  ┌─────────────────────────────────────┐   │   │   │
│  │  │  │             DOMAIN                  │   │   │   │
│  │  │  │                                     │   │   │   │
│  │  │  └─────────────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura de Directorios

### 🎯 Domain Layer (Core)

```
src/domain/
├── entities/           # Entidades de negocio
├── value-objects/      # Objetos de valor inmutables
└── services/          # Servicios de dominio
```

**Responsabilidades:**
- Contiene la lógica de negocio pura
- Define las reglas de negocio
- No depende de ninguna capa externa

**Ejemplos:**
- `NumberEntity`: Representa un número con su valor y paridad
- `ParityValueObject`: Representa el concepto de paridad (par/impar)
- `ParityService`: Lógica para determinar paridad

### 🔄 Application Layer

```
src/application/
├── use-cases/          # Casos de uso de la aplicación
└── interfaces/         # Puertos (interfaces)
```

**Responsabilidades:**
- Orquesta los objetos del dominio
- Define casos de uso específicos
- Define interfaces para dependencias externas

**Ejemplos:**
- `CheckParityUseCase`: Caso de uso para verificar paridad
- `NumberRepositoryInterface`: Puerto para persistencia

### 🔌 Infrastructure Layer

```
src/infrastructure/
├── adapters/           # Implementaciones de interfaces
│   ├── controllers/    # Controladores HTTP
│   └── repositories/   # Implementaciones de repositorios
├── config/            # Configuraciones
├── middleware/        # Middlewares de Express
└── web/              # Servidor y rutas
```

**Responsabilidades:**
- Implementa las interfaces definidas en Application
- Contiene detalles técnicos (base de datos, HTTP, etc.)
- Adaptadores para servicios externos

### 🔧 Shared Layer

```
src/shared/
├── constants/         # Constantes globales
├── exceptions/        # Excepciones personalizadas
└── utils/            # Utilidades compartidas
```

## 🔄 Flujo de Dependencias

### Regla de Dependencia

Las dependencias siempre apuntan hacia el centro:

```
Framework → Adapters → Application → Domain
```

### Inversión de Dependencias

```javascript
// ❌ Incorrecto: Use Case depende de implementación
class CheckParityUseCase {
  constructor() {
    this.repository = new DatabaseRepository(); // Dependencia concreta
  }
}

// ✅ Correcto: Use Case depende de abstracción
class CheckParityUseCase {
  constructor(numberRepository) { // Dependencia inyectada
    this.numberRepository = numberRepository;
  }
}
```

## 🏛️ Patrones Implementados

### 1. Repository Pattern

```javascript
// Puerto (Application Layer)
class NumberRepositoryInterface {
  async save(numberEntity) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
}

// Adaptador (Infrastructure Layer)
class InMemoryNumberRepository extends NumberRepositoryInterface {
  async save(numberEntity) {
    this.numbers.push(numberEntity);
  }
}
```

### 2. Dependency Injection

```javascript
// Manual DI Container en index.js
function setupDependencies() {
  const repository = new InMemoryNumberRepository();
  const useCase = new CheckParityUseCase(repository);
  const controller = new ParityController(useCase);
  
  return { repository, useCase, controller };
}
```

### 3. Value Objects

```javascript
class ParityValueObject {
  constructor(value) {
    this.value = Object.freeze(value); // Inmutable
  }
  
  isEven() {
    return this.value === 'even';
  }
}
```

### 4. Use Case Pattern

```javascript
class CheckParityUseCase {
  async execute(number) {
    // 1. Validar entrada
    // 2. Crear entidad de dominio
    // 3. Aplicar lógica de negocio
    // 4. Persistir resultado
    // 5. Retornar respuesta
  }
}
```

## 🔌 Puertos y Adaptadores

### Puertos (Interfaces)

Los puertos definen contratos para servicios externos:

```javascript
// Puerto para persistencia
interface NumberRepositoryInterface {
  save(numberEntity): Promise<NumberEntity>
  findAll(): Promise<NumberEntity[]>
}

// Puerto para servicios externos (ejemplo)
interface NotificationServiceInterface {
  sendNotification(message): Promise<void>
}
```

### Adaptadores (Implementaciones)

Los adaptadores implementan los puertos:

```javascript
// Adaptador para base de datos en memoria
class InMemoryNumberRepository implements NumberRepositoryInterface {
  // Implementación específica
}

// Adaptador para base de datos SQL (ejemplo)
class SQLNumberRepository implements NumberRepositoryInterface {
  // Implementación específica
}
```

## 🧪 Beneficios para Testing

### Testeo de Dominio

```javascript
// Test puro sin dependencias externas
describe('ParityService', () => {
  it('should determine even number', () => {
    const result = ParityService.calculateParity(4);
    expect(result.isEven()).toBe(true);
  });
});
```

### Testeo de Application Layer

```javascript
// Test con mocks de dependencias
describe('CheckParityUseCase', () => {
  it('should save result to repository', async () => {
    const mockRepository = {
      save: jest.fn()
    };
    
    const useCase = new CheckParityUseCase(mockRepository);
    await useCase.execute(4);
    
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
```

## 🔄 Extensibilidad

### Agregar Nueva Funcionalidad

1. **Definir nueva regla de negocio** (Domain Layer)
2. **Crear nuevo caso de uso** (Application Layer)
3. **Implementar nuevo endpoint** (Infrastructure Layer)

### Cambiar Persistencia

1. **Crear nueva implementación** del `NumberRepositoryInterface`
2. **Modificar DI container** en `index.js`
3. **Sin cambios** en Domain y Application

### Agregar Nuevo Endpoint

1. **Reutilizar casos de uso** existentes
2. **Crear nuevo controller** o endpoint
3. **Sin cambios** en capas internas

## 🚀 Próximos Pasos

### Mejoras Arquitecturales

- **Event Sourcing**: Para auditoria completa
- **CQRS**: Separar comandos de consultas
- **Domain Events**: Para desacoplamiento
- **Saga Pattern**: Para transacciones distribuidas

### Infraestructura

- **Database Layer**: PostgreSQL, MongoDB
- **Cache Layer**: Redis para performance
- **Message Queue**: Para procesamiento asíncrono
- **API Gateway**: Para múltiples servicios

## 📚 Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design - Eric Evans](https://domainlanguage.com/ddd/)
- [Clean Code - Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
