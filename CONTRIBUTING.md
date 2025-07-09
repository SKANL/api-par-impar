# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a la API Par/Impar! Esta guía te ayudará a entender cómo contribuir de manera efectiva al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#-código-de-conducta)
- [¿Cómo contribuir?](#-cómo-contribuir)
- [Reportar Bugs](#-reportar-bugs)
- [Sugerir Mejoras](#-sugerir-mejoras)
- [Proceso de Desarrollo](#-proceso-de-desarrollo)
- [Estándares de Código](#-estándares-de-código)
- [Tests](#-tests)
- [Documentación](#-documentación)
- [Pull Requests](#-pull-requests)

## 🤝 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código.

### Nuestros Principios

- **Sé respetuoso**: Trata a todos con respeto y profesionalismo
- **Sé constructivo**: Proporciona feedback constructivo y útil
- **Sé inclusivo**: Fomenta un ambiente acogedor para todos
- **Sé paciente**: Comprende que todos tienen diferentes niveles de experiencia

## 🚀 ¿Cómo contribuir?

Hay muchas formas de contribuir al proyecto:

### 🐛 Reportar Bugs
- Usar la plantilla de issues para bugs
- Incluir pasos para reproducir
- Proporcionar información del entorno

### ✨ Sugerir Mejoras
- Usar la plantilla de feature request
- Explicar el problema que resuelve
- Describir la solución propuesta

### 💻 Contribuir Código
- Fork el repositorio
- Crear una rama para tu feature
- Seguir los estándares de código
- Escribir tests
- Enviar un Pull Request

### 📖 Mejorar Documentación
- Corregir errores tipográficos
- Agregar ejemplos
- Clarificar explicaciones
- Traducir contenido

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Verifica** que no sea un duplicate
2. **Reproduce** el bug en la última versión
3. **Revisa** si ya existe un issue

### Template de Bug Report

```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer clic en '...'
3. Scroll down to '...'
4. Ver error

**Comportamiento Esperado**
Descripción clara de lo que esperabas que ocurriera.

**Comportamiento Actual**
Descripción de lo que realmente ocurrió.

**Screenshots**
Si es aplicable, agrega screenshots.

**Información del Entorno:**
- OS: [e.g. Windows 10]
- Node.js: [e.g. 16.14.0]
- NPM: [e.g. 8.3.1]
- Versión del proyecto: [e.g. 1.0.0]

**Información Adicional**
Cualquier otro contexto sobre el problema.
```

## ✨ Sugerir Mejoras

### Template de Feature Request

```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema. Ej: "Me frustra que [...]"

**Describe la solución que te gustaría**
Descripción clara y concisa de lo que quieres que ocurra.

**Describe alternativas que hayas considerado**
Descripción de soluciones o features alternativas.

**Información adicional**
Cualquier otro contexto o screenshots sobre el feature request.
```

## 🛠️ Proceso de Desarrollo

### 1. Setup del Entorno

```bash
# Fork y clonar el repositorio
git clone https://github.com/tu-usuario/api-par-impar.git
cd api-par-impar

# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar en modo desarrollo
npm run dev
```

### 2. Crear una Rama

```bash
# Crear rama desde main
git checkout -b feature/nueva-funcionalidad

# O para bugs
git checkout -b fix/descripcion-del-bug
```

### 3. Convenciones de Nombres de Ramas

- `feature/`: Nuevas funcionalidades
- `fix/`: Corrección de bugs
- `docs/`: Cambios en documentación
- `refactor/`: Refactoring de código
- `test/`: Agregar o modificar tests

### 4. Desarrollo

```bash
# Hacer cambios y commits frecuentes
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Push de la rama
git push origin feature/nueva-funcionalidad
```

## 📝 Estándares de Código

### Convenciones de Naming

```javascript
// Classes: PascalCase
class NumberEntity {}

// Functions/Variables: camelCase
const checkParity = () => {};
const numberValue = 42;

// Constants: UPPER_SNAKE_CASE
const MAX_NUMBER_VALUE = 1000000;

// Files: kebab-case
parity-service.js
number.entity.js
```

### Estructura de Archivos

```javascript
// Orden de imports
const express = require('express'); // Librerías externas
const path = require('path'); // Librerías built-in

const { ParityService } = require('./domain/services/parity.service'); // Imports relativos

// Orden de elementos en una clase
class ExampleClass {
  constructor() {} // Constructor primero
  
  // Métodos públicos
  publicMethod() {}
  
  // Métodos privados al final
  #privateMethod() {}
}
```

### ESLint y Prettier

El proyecto usa ESLint y Prettier para mantener consistencia:

```bash
# Verificar lint
npm run lint

# Arreglar problemas automáticamente
npm run lint:fix

# Formatear código
npm run format
```

### Comentarios y Documentación

```javascript
/**
 * Calcula la paridad de un número
 * @param {number} number - El número a evaluar
 * @returns {ParityValueObject} Objeto con la paridad calculada
 * @throws {ValidationException} Si el número está fuera del rango válido
 */
function calculateParity(number) {
  // Validar entrada
  if (!Number.isInteger(number)) {
    throw new ValidationException('Number must be an integer');
  }
  
  // Calcular paridad usando operador módulo
  const isEven = number % 2 === 0;
  
  return new ParityValueObject(isEven ? 'even' : 'odd');
}
```

## 🧪 Tests

### Estructura de Tests

```
tests/
├── unit/           # Tests unitarios
│   ├── domain/     # Tests de entidades y servicios
│   └── application/ # Tests de casos de uso
├── integration/    # Tests de integración
└── e2e/           # Tests end-to-end
```

### Escribir Tests

```javascript
// Tests unitarios - domain/parity.service.test.js
describe('ParityService', () => {
  describe('calculateParity', () => {
    it('should return even for even numbers', () => {
      // Arrange
      const number = 4;
      
      // Act
      const result = ParityService.calculateParity(number);
      
      // Assert
      expect(result.value).toBe('even');
    });
    
    it('should throw error for invalid input', () => {
      // Arrange
      const invalidInput = 'not-a-number';
      
      // Act & Assert
      expect(() => {
        ParityService.calculateParity(invalidInput);
      }).toThrow(ValidationException);
    });
  });
});
```

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage

# Tests específicos
npm test -- --grep "ParityService"
```

### Cobertura de Código

El proyecto mantiene > 80% de cobertura:

```bash
# Generar reporte de cobertura
npm run test:coverage

# Ver reporte en navegador
open coverage/lcov-report/index.html
```

## 📖 Documentación

### Tipos de Documentación

1. **README.md**: Información general y quick start
2. **API.md**: Documentación de endpoints
3. **ARCHITECTURE.md**: Arquitectura y patrones
4. **INSTALLATION.md**: Guía de instalación detallada
5. **JSDoc**: Documentación en código

### Actualizar Documentación

```bash
# Generar documentación JSDoc
npm run docs:generate

# Verificar enlaces de documentación
npm run docs:check
```

## 🔄 Pull Requests

### Antes de Enviar

- [ ] Tests pasan
- [ ] Lint pasa
- [ ] Documentación actualizada
- [ ] CHANGELOG.md actualizado
- [ ] Commit messages siguen convenciones

### Template de Pull Request

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se ha probado?
Describe las pruebas realizadas.

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, especialmente en áreas complejas
- [ ] He realizado cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban mi fix o funcionalidad
- [ ] Tests nuevos y existentes pasan localmente
```

### Convenciones de Commit

Usamos [Conventional Commits](https://conventionalcommits.org/):

```bash
# Formato
<tipo>[scope opcional]: <descripción>

# Ejemplos
feat: agregar endpoint para estadísticas
fix: corregir validación de números negativos
docs: actualizar guía de API
refactor: extraer lógica de validación
test: agregar tests para ParityService
```

### Tipos de Commit

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan significado (espacios, formato)
- `refactor`: Cambio de código que no es fix ni feature
- `test`: Agregar tests faltantes o corregir existentes
- `chore`: Cambios en build process o herramientas auxiliares

## 🏆 Reconocimiento

Los contribuyentes serán reconocidos en:

- Lista de contributors en GitHub
- Sección de agradecimientos en README
- Release notes para contribuciones significativas

## 🆘 ¿Necesitas Ayuda?

- **GitHub Issues**: Para preguntas sobre el código
- **GitHub Discussions**: Para discusiones generales
- **Documentation**: Revisa la documentación existente

## 📋 Checklist del Contributor

### Primera Contribución
- [ ] Leer esta guía completa
- [ ] Fork del repositorio
- [ ] Setup del entorno local
- [ ] Ejecutar tests existentes
- [ ] Hacer un cambio pequeño
- [ ] Enviar Pull Request

### Contribuciones Regulares
- [ ] Revisar issues abiertos
- [ ] Discutir cambios grandes en issues
- [ ] Mantener fork actualizado
- [ ] Seguir convenciones establecidas
- [ ] Ayudar a otros contributors

¡Gracias por contribuir! 🎉
