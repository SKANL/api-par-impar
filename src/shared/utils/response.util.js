const { HTTP_STATUS, HTTP_MESSAGES } = require('../constants/http-status.constants');

/**
 * Utilidad para generar respuestas HTTP estandarizadas
 */
class ResponseUtil {
  /**
   * Respuesta exitosa
   * @param {*} data - Datos de la respuesta
   * @param {string} message - Mensaje opcional
   * @param {number} statusCode - Código de estado HTTP
   * @returns {Object}
   */
  static success(data = null, message = 'Success', statusCode = HTTP_STATUS.OK) {
    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Respuesta de error
   * @param {string} message - Mensaje de error
   * @param {number} statusCode - Código de estado HTTP
   * @param {*} details - Detalles adicionales del error
   * @returns {Object}
   */
  static error(message = 'Error', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = null) {
    const response = {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString()
    };

    if (details) {
      response.details = details;
    }

    return response;
  }

  /**
   * Respuesta de validación fallida
   * @param {string} message - Mensaje de error
   * @param {*} errors - Errores de validación
   * @returns {Object}
   */
  static validationError(message = 'Validation failed', errors = null) {
    return this.error(message, HTTP_STATUS.BAD_REQUEST, errors);
  }

  /**
   * Respuesta para recurso no encontrado
   * @param {string} message - Mensaje personalizado
   * @returns {Object}
   */
  static notFound(message = 'Resource not found') {
    return this.error(message, HTTP_STATUS.NOT_FOUND);
  }

  /**
   * Respuesta de error interno del servidor
   * @param {string} message - Mensaje de error
   * @returns {Object}
   */
  static internalError(message = 'Internal server error') {
    return this.error(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  /**
   * Respuesta de recurso creado
   * @param {*} data - Datos del recurso creado
   * @param {string} message - Mensaje opcional
   * @returns {Object}
   */
  static created(data = null, message = 'Resource created successfully') {
    return this.success(data, message, HTTP_STATUS.CREATED);
  }
}

module.exports = { ResponseUtil };
