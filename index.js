const express = require('express');

// Configuración
const { createSSLConfig } = require('./src/infrastructure/config/ssl.config');
const { createServerConfig } = require('./src/infrastructure/config/server.config');
const { SwaggerConfig } = require('./src/infrastructure/config/swagger.config');
const { apiReference } = require('@scalar/express-api-reference');

// Infraestructura Web
const { Server } = require('./src/infrastructure/web/server');
const { createParityRoutes } = require('./src/infrastructure/web/routes/parity.routes');

// Middlewares
const { loggerMiddleware, detailedLoggerMiddleware } = require('./src/infrastructure/middleware/logger.middleware');
const { errorHandlerMiddleware, notFoundMiddleware } = require('./src/infrastructure/middleware/error-handler.middleware');

// Dependency Injection - Repositories
const { InMemoryNumberRepository } = require('./src/infrastructure/adapters/repositories/in-memory-number.repository');

// Dependency Injection - Use Cases
const { CheckParityUseCase } = require('./src/application/use-cases/check-parity.use-case');
const { GetParityHistoryUseCase } = require('./src/application/use-cases/get-parity-history.use-case');
const { GetParityStatsUseCase } = require('./src/application/use-cases/get-parity-stats.use-case');

// Dependency Injection - Controllers
const { ParityController } = require('./src/infrastructure/adapters/controllers/parity.controller');

// Utilidades
const { ResponseUtil } = require('./src/shared/utils/response.util');

/**
 * Configuración de la aplicación
 */
function createApp() {
  const app = express();
  const serverConfig = createServerConfig();

  // Middlewares básicos
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Trust proxy para obtener IP real
  app.set('trust proxy', true);

  // Middlewares de logging
  if (serverConfig.isDevelopment) {
    app.use(detailedLoggerMiddleware);
  } else {
    app.use(loggerMiddleware);
  }

  // Headers de seguridad básicos
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  return app;
}

/**
 * Configuración de dependencias (Dependency Injection Container)
 */
function setupDependencies() {
  // Repositories
  const numberRepository = new InMemoryNumberRepository();

  // Use Cases
  const checkParityUseCase = new CheckParityUseCase(numberRepository);
  const getParityHistoryUseCase = new GetParityHistoryUseCase(numberRepository);
  const getParityStatsUseCase = new GetParityStatsUseCase(numberRepository);

  // Controllers
  const parityController = new ParityController(
    checkParityUseCase,
    getParityHistoryUseCase,
    getParityStatsUseCase
  );

  return {
    numberRepository,
    checkParityUseCase,
    getParityHistoryUseCase,
    getParityStatsUseCase,
    parityController
  };
}

/**
 * Configuración de rutas
 */
function setupRoutes(app, dependencies) {
  const serverConfig = createServerConfig();
  
  // Ruta raíz
  app.get('/', (req, res) => {
    res.json(ResponseUtil.success({
      message: 'API Par/Impar - Clean Architecture',
      version: '1.0.0',
      description: 'API para determinar si un número es par o impar',
      endpoints: {
        health: `${serverConfig.apiPrefix}/parity/health`,
        checkParity: `${serverConfig.apiPrefix}/parity/check`,
        checkParityQuery: `${serverConfig.apiPrefix}/parity/check-query?number=X`,
        history: `${serverConfig.apiPrefix}/parity/history`,
        stats: `${serverConfig.apiPrefix}/parity/stats`
      },
      documentation: {
        swagger: '/api-docs',
        scalar: '/docs/scalar', 
        redoc: '/docs/redoc',
        openapi_json: '/api-docs.json'
      },
      features: [
        '✅ Clean Architecture (ONION)',
        '✅ HTTPS con certificados SSL',
        '✅ Validaciones robustas',
        '✅ Manejo centralizado de errores',
        '✅ Logging detallado',
        '✅ Repository Pattern',
        '✅ Dependency Injection',
        '✅ Documentación interactiva (Swagger, Scalar, Redoc)'
      ]
    }, 'Welcome to Parity API'));
  });

  // Configuración de Swagger UI
  const swaggerConfig = new SwaggerConfig();
  swaggerConfig.setupSwaggerRoutes(app, '/api-docs');
  
  // Configuración de Scalar (Alternativa moderna a Swagger UI)
  app.use('/docs/scalar', apiReference({
    theme: 'kepler',
    spec: {
      content: swaggerConfig.getSpecs(),
    },
  }));

  // Redoc como tercera alternativa
  app.get('/docs/redoc', (req, res) => {
    const redocHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Par/Impar - ReDoc</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
        <style>
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <redoc spec-url='/api-docs.json'></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
    `;
    res.send(redocHTML);
  });

  // Rutas de la API
  app.use(`${serverConfig.apiPrefix}/parity`, createParityRoutes(dependencies.parityController));

  // Middleware para rutas no encontradas
  app.use(notFoundMiddleware);

  // Middleware de manejo de errores (debe ir al final)
  app.use(errorHandlerMiddleware);
}

/**
 * Función principal
 */
function main() {
  try {
    console.log('🚀 Initializing Parity API...');
    console.log('🏗️  Setting up Clean Architecture...');

    // Crear aplicación Express
    const app = createApp();

    // Configurar dependencias
    const dependencies = setupDependencies();
    console.log('✅ Dependencies configured');

    // Configurar rutas
    setupRoutes(app, dependencies);
    console.log('✅ Routes configured');

    // Configurar SSL
    const sslConfig = createSSLConfig();
    console.log('✅ SSL configuration loaded');

    // Crear y iniciar servidor
    const server = new Server(app, sslConfig);
    server.start();

  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Iniciar aplicación
main();