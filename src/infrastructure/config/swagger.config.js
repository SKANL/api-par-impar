const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Configuración de Swagger para documentación de la API
 */
class SwaggerConfig {
  constructor() {
    this.options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Par/Impar - Clean Architecture',
          version: '1.0.0',
          description: `
            Una API REST desarrollada con Node.js y Express que implementa la arquitectura ONION (Clean Architecture) 
            para determinar si un número es par o impar.
            
            ## Características
            - ✅ Clean Architecture (ONION)
            - ✅ HTTPS con certificados SSL
            - ✅ Validaciones robustas
            - ✅ Manejo centralizado de errores
            - ✅ Logging detallado
            - ✅ Repository Pattern
            - ✅ Dependency Injection
          `,
          contact: {
            name: 'API Support',
            url: 'https://github.com/your-repo/api-par-impar',
            email: 'support@example.com'
          },
          license: {
            name: 'ISC',
            url: 'https://opensource.org/licenses/ISC'
          }
        },
        servers: [
          {
            url: 'https://localhost:8443/api',
            description: 'Servidor de desarrollo HTTPS'
          }
        ],
        tags: [
          {
            name: 'Health',
            description: 'Endpoints de health check y monitoreo'
          },
          {
            name: 'Parity',
            description: 'Endpoints para verificación de paridad'
          },
          {
            name: 'History',
            description: 'Endpoints para consultar historial'
          },
          {
            name: 'Statistics',
            description: 'Endpoints para obtener estadísticas'
          }
        ],
        components: {
          schemas: {
            SuccessResponse: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true
                },
                statusCode: {
                  type: 'integer',
                  example: 200
                },
                message: {
                  type: 'string',
                  example: 'Operation completed successfully'
                },
                data: {
                  type: 'object'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-07-09T19:16:04.157Z'
                }
              },
              required: ['success', 'statusCode', 'message', 'timestamp']
            },
            ErrorResponse: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                statusCode: {
                  type: 'integer',
                  example: 400
                },
                message: {
                  type: 'string',
                  example: 'Validation failed'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time'
                },
                details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        type: 'string'
                      },
                      message: {
                        type: 'string'
                      },
                      value: {
                        type: 'string'
                      }
                    }
                  }
                }
              },
              required: ['success', 'statusCode', 'message', 'timestamp']
            },
            ParityRequest: {
              type: 'object',
              properties: {
                number: {
                  type: 'integer',
                  description: 'Número entero para verificar paridad',
                  example: 42
                }
              },
              required: ['number']
            },
            ParityResult: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1
                },
                number: {
                  type: 'integer',
                  example: 42
                },
                parity: {
                  type: 'string',
                  enum: ['even', 'odd'],
                  example: 'even'
                },
                isEven: {
                  type: 'boolean',
                  example: true
                },
                isOdd: {
                  type: 'boolean',
                  example: false
                },
                description: {
                  type: 'string',
                  example: 'El número 42 es par'
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-07-09T19:16:04.156Z'
                },
                success: {
                  type: 'boolean',
                  example: true
                }
              }
            },
            HealthCheck: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  example: 'healthy'
                },
                service: {
                  type: 'string',
                  example: 'Parity API'
                },
                version: {
                  type: 'string',
                  example: '1.0.0'
                },
                uptime: {
                  type: 'number',
                  example: 29.9493434
                }
              }
            },
            HistoryResponse: {
              type: 'object',
              properties: {
                history: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer'
                      },
                      value: {
                        type: 'integer'
                      },
                      parity: {
                        type: 'string',
                        enum: ['even', 'odd']
                      },
                      isEven: {
                        type: 'boolean'
                      },
                      isOdd: {
                        type: 'boolean'
                      },
                      timestamp: {
                        type: 'string',
                        format: 'date-time'
                      }
                    }
                  }
                },
                count: {
                  type: 'integer',
                  example: 4
                },
                limit: {
                  type: 'integer',
                  example: 10
                },
                success: {
                  type: 'boolean',
                  example: true
                }
              }
            },
            StatsResponse: {
              type: 'object',
              properties: {
                totalChecks: {
                  type: 'integer',
                  example: 6
                },
                evenCount: {
                  type: 'integer',
                  example: 3
                },
                oddCount: {
                  type: 'integer',
                  example: 3
                },
                evenPercentage: {
                  type: 'string',
                  example: '50.00'
                },
                oddPercentage: {
                  type: 'string',
                  example: '50.00'
                },
                lastCheck: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer'
                    },
                    value: {
                      type: 'integer'
                    },
                    parity: {
                      type: 'string'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time'
                    }
                  }
                },
                success: {
                  type: 'boolean',
                  example: true
                }
              }
            }
          },
          responses: {
            BadRequest: {
              description: 'Solicitud inválida',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            NotFound: {
              description: 'Recurso no encontrado',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            },
            InternalServerError: {
              description: 'Error interno del servidor',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                  }
                }
              }
            }
          }
        }
      },
      apis: [
        './src/infrastructure/web/routes/*.js',
        './src/infrastructure/adapters/controllers/*.js',
        './index.js'
      ]
    };

    this.specs = swaggerJsdoc(this.options);
  }

  /**
   * Configuración personalizada de Swagger UI
   */
  getUIOptions() {
    return {
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .scheme-container { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          border-radius: 8px;
        }
      `,
      customSiteTitle: 'API Par/Impar - Documentation',
      customfavIcon: '/favicon.ico',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true
      }
    };
  }

  /**
   * Obtiene las especificaciones de Swagger
   * @returns {Object}
   */
  getSpecs() {
    return this.specs;
  }

  /**
   * Configura las rutas de Swagger en la aplicación Express
   * @param {Express} app 
   * @param {string} docsPath 
   */
  setupSwaggerRoutes(app, docsPath = '/api-docs') {
    // Swagger JSON endpoint
    app.get(`${docsPath}.json`, (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(this.specs);
    });

    // Swagger UI
    app.use(docsPath, swaggerUi.serve);
    app.get(docsPath, swaggerUi.setup(this.specs, this.getUIOptions()));

    console.log(`📚 Swagger UI available at: ${docsPath}`);
    console.log(`📄 OpenAPI JSON available at: ${docsPath}.json`);
  }
}

/**
 * Factory function para crear la configuración de Swagger
 * @returns {SwaggerConfig}
 */
function createSwaggerConfig() {
  return new SwaggerConfig();
}

module.exports = { 
  SwaggerConfig, 
  createSwaggerConfig 
};
