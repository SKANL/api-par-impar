const { body, query, validationResult } = require('express-validator');
const { ResponseUtil } = require('../../shared/utils/response.util');
const { HTTP_STATUS } = require('../../shared/constants/http-status.constants');

/**
 * Validaciones para el endpoint de verificación de paridad
 */
const validateParityCheck = [
  body('number')
    .notEmpty()
    .withMessage('Number is required')
    .isInt()
    .withMessage('Number must be an integer')
    .toInt(),
];

/**
 * Validaciones para parámetros de query
 */
const validateParityQuery = [
  query('number')
    .notEmpty()
    .withMessage('Number query parameter is required')
    .isInt()
    .withMessage('Number must be an integer')
    .toInt(),
];

/**
 * Validaciones para el historial
 */
const validateHistoryQuery = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100')
    .toInt(),
];

/**
 * Middleware para manejar errores de validación
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    return res.status(HTTP_STATUS.BAD_REQUEST)
      .json(ResponseUtil.validationError('Validation failed', formattedErrors));
  }

  next();
}

/**
 * Middleware para validar Content-Type JSON
 */
function validateJsonContentType(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const contentType = req.get('Content-Type');
    
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .json(ResponseUtil.validationError('Content-Type must be application/json'));
    }
  }
  
  next();
}

module.exports = { 
  validateParityCheck,
  validateParityQuery,
  validateHistoryQuery,
  handleValidationErrors,
  validateJsonContentType
};
