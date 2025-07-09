const express = require('express');
const { 
  validateParityCheck, 
  validateParityQuery, 
  validateHistoryQuery,
  handleValidationErrors,
  validateJsonContentType
} = require('../../middleware/validation.middleware');

/**
 * Crea las rutas para los endpoints de paridad
 * @param {ParityController} parityController 
 * @returns {Router}
 */
function createParityRoutes(parityController) {
  const router = express.Router();

  /**
   * @swagger
   * /parity/health:
   *   get:
   *     tags:
   *       - Health
   *     summary: Verificación de salud del servicio
   *     description: Endpoint para verificar que la API esté funcionando correctamente
   *     responses:
   *       200:
   *         description: Servicio funcionando correctamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "Service is healthy"
   *                 data:
   *                   $ref: '#/components/schemas/HealthCheck'
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   */
  router.get('/health', 
    parityController.healthCheck.bind(parityController)
  );

  /**
   * @swagger
   * /parity/check:
   *   post:
   *     tags:
   *       - Parity
   *     summary: Verificar si un número es par o impar
   *     description: |
   *       Determina si un número es par o impar enviando el número en el cuerpo de la petición.
   *       
   *       **Respuesta exitosa:** Siempre retorna código 200 con la información de paridad.
   *       
   *       **Casos de error:** Solo en caso de datos inválidos o errores del servidor.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               number:
   *                 type: integer
   *                 description: Número entero para verificar paridad
   *                 example: 42
   *             required:
   *               - number
   *           examples:
   *             numero_par:
   *               summary: Ejemplo con número par
   *               value:
   *                 number: 42
   *             numero_impar:
   *               summary: Ejemplo con número impar
   *               value:
   *                 number: 13
   *             numero_cero:
   *               summary: Ejemplo con cero
   *               value:
   *                 number: 0
   *             numero_negativo:
   *               summary: Ejemplo con número negativo
   *               value:
   *                 number: -7
   *     responses:
   *       200:
   *         description: ✅ Paridad calculada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                   description: Indica que la operación fue exitosa
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                   description: Código de estado HTTP
   *                 message:
   *                   type: string
   *                   example: "Parity checked successfully"
   *                   description: Mensaje descriptivo de la operación
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       example: 1
   *                       description: ID único del registro
   *                     number:
   *                       type: integer
   *                       example: 42
   *                       description: Número verificado
   *                     parity:
   *                       type: string
   *                       enum: [even, odd]
   *                       example: even
   *                       description: Tipo de paridad (par o impar)
   *                     isEven:
   *                       type: boolean
   *                       example: true
   *                       description: Verdadero si el número es par
   *                     isOdd:
   *                       type: boolean
   *                       example: false
   *                       description: Verdadero si el número es impar
   *                     description:
   *                       type: string
   *                       example: "El número 42 es par"
   *                       description: Descripción en español del resultado
   *                     timestamp:
   *                       type: string
   *                       format: date-time
   *                       example: "2025-07-09T20:00:17.383Z"
   *                       description: Fecha y hora de la verificación
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *                   example: "2025-07-09T20:00:17.383Z"
   *                   description: Fecha y hora de la respuesta
   *             examples:
   *               respuesta_par:
   *                 summary: Respuesta para número par
   *                 value:
   *                   success: true
   *                   statusCode: 200
   *                   message: "Parity checked successfully"
   *                   data:
   *                     id: 1
   *                     number: 42
   *                     parity: "even"
   *                     isEven: true
   *                     isOdd: false
   *                     description: "El número 42 es par"
   *                     timestamp: "2025-07-09T20:00:17.383Z"
   *                   timestamp: "2025-07-09T20:00:17.383Z"
   *               respuesta_impar:
   *                 summary: Respuesta para número impar
   *                 value:
   *                   success: true
   *                   statusCode: 200
   *                   message: "Parity checked successfully"
   *                   data:
   *                     id: 2
   *                     number: 13
   *                     parity: "odd"
   *                     isEven: false
   *                     isOdd: true
   *                     description: "El número 13 es impar"
   *                     timestamp: "2025-07-09T20:00:17.383Z"
   *                   timestamp: "2025-07-09T20:00:17.383Z"
   */
  router.post('/check', 
    validateJsonContentType,
    validateParityCheck,
    handleValidationErrors,
    parityController.checkParity.bind(parityController)
  );

  /**
   * @swagger
   * /parity/check-query:
   *   get:
   *     tags:
   *       - Parity
   *     summary: Verificar paridad usando query parameter
   *     description: Determina si un número es par o impar usando query parameters
   *     parameters:
   *       - in: query
   *         name: number
   *         required: true
   *         schema:
   *           type: integer
   *         description: Número entero para verificar paridad
   *         examples:
   *           par:
   *             summary: Número par
   *             value: 42
   *           impar:
   *             summary: Número impar
   *             value: 13
   *     responses:
   *       200:
   *         description: Paridad calculada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "Parity checked successfully"
   *                 data:
   *                   $ref: '#/components/schemas/ParityResult'
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.get('/check-query',
    validateParityQuery,
    handleValidationErrors,
    parityController.checkParityByQuery.bind(parityController)
  );

  /**
   * @swagger
   * /parity/history:
   *   get:
   *     tags:
   *       - History
   *     summary: Obtener historial de verificaciones
   *     description: Retorna el historial de todas las verificaciones de paridad realizadas
   *     parameters:
   *       - in: query
   *         name: limit
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Número máximo de registros a retornar
   *         example: 10
   *       - in: query
   *         name: offset
   *         required: false
   *         schema:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *         description: Número de registros a omitir
   *         example: 0
   *     responses:
   *       200:
   *         description: Historial obtenido exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "History retrieved successfully"
   *                 data:
   *                   $ref: '#/components/schemas/HistoryResponse'
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.get('/history',
    validateHistoryQuery,
    handleValidationErrors,
    parityController.getHistory.bind(parityController)
  );

  /**
   * @swagger
   * /parity/stats:
   *   get:
   *     tags:
   *       - Statistics
   *     summary: Obtener estadísticas de verificaciones
   *     description: Retorna estadísticas detalladas sobre todas las verificaciones de paridad realizadas
   *     responses:
   *       200:
   *         description: Estadísticas obtenidas exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 message:
   *                   type: string
   *                   example: "Statistics retrieved successfully"
   *                 data:
   *                   $ref: '#/components/schemas/StatsResponse'
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  router.get('/stats',
    parityController.getStats.bind(parityController)
  );

  return router;
}

module.exports = { createParityRoutes };
