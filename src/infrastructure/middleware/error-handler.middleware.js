const { ResponseUtil } = require('../../shared/utils/response.util');
const { ValidationException } = require('../../shared/exceptions/validation.exception');
const { BaseException } = require('../../shared/exceptions/base.exception');
const { HTTP_STATUS } = require('../../shared/constants/http-status.constants');

/**
 * Middleware para manejo centralizado de errores
 */
function errorHandlerMiddleware(error, req, res, next) {
  // Log del error (en producción usar un logger apropiado)
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Si ya se envió una respuesta, delegar al manejador de errores por defecto
  if (res.headersSent) {
    return next(error);
  }

  // Manejo de errores específicos
  if (error instanceof ValidationException) {
    return res.status(error.statusCode)
      .json(ResponseUtil.validationError(error.message, error.toJSON()));
  }

  if (error instanceof BaseException) {
    return res.status(error.statusCode)
      .json(ResponseUtil.error(error.message, error.statusCode));
  }

  // Error de sintaxis JSON
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(HTTP_STATUS.BAD_REQUEST)
      .json(ResponseUtil.validationError('Invalid JSON format'));
  }

  // Error genérico del servidor
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(ResponseUtil.internalError('An unexpected error occurred'));
}

/**
 * Middleware para manejo de rutas no encontradas
 */
function notFoundMiddleware(req, res) {
  res.status(HTTP_STATUS.NOT_FOUND)
    .json(ResponseUtil.notFound(`Route ${req.method} ${req.path} not found`));
}

module.exports = { 
  errorHandlerMiddleware, 
  notFoundMiddleware 
};
