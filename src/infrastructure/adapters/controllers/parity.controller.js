const { ResponseUtil } = require('../../../shared/utils/response.util');
const { ValidationException } = require('../../../shared/exceptions/validation.exception');
const { HTTP_STATUS } = require('../../../shared/constants/http-status.constants');

/**
 * Controlador para endpoints relacionados con paridad
 */
class ParityController {
  constructor(checkParityUseCase, getParityHistoryUseCase, getParityStatsUseCase) {
    this.checkParityUseCase = checkParityUseCase;
    this.getParityHistoryUseCase = getParityHistoryUseCase;
    this.getParityStatsUseCase = getParityStatsUseCase;
  }

  /**
   * Verifica la paridad de un número
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  async checkParity(req, res, next) {
    try {
      const { number } = req.body;

      // Validación básica
      if (number === undefined || number === null) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(ResponseUtil.validationError('Number is required'));
      }

      const result = await this.checkParityUseCase.execute(number);
      
      res.status(HTTP_STATUS.OK)
        .json(ResponseUtil.success(result, 'Parity checked successfully'));

    } catch (error) {
      if (error instanceof ValidationException) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(ResponseUtil.validationError(error.message));
      }
      next(error);
    }
  }

  /**
   * Verifica la paridad usando parámetro de query
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  async checkParityByQuery(req, res, next) {
    try {
      const { number } = req.query;

      if (!number) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(ResponseUtil.validationError('Number query parameter is required'));
      }

      const parsedNumber = parseInt(number, 10);
      
      if (isNaN(parsedNumber)) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(ResponseUtil.validationError('Number must be a valid integer'));
      }

      const result = await this.checkParityUseCase.execute(parsedNumber);
      
      res.status(HTTP_STATUS.OK)
        .json(ResponseUtil.success(result, 'Parity checked successfully'));

    } catch (error) {
      if (error instanceof ValidationException) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
          .json(ResponseUtil.validationError(error.message));
      }
      next(error);
    }
  }

  /**
   * Obtiene el historial de verificaciones
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  async getHistory(req, res, next) {
    try {
      const { limit } = req.query;
      const parsedLimit = limit ? parseInt(limit, 10) : 10;

      const result = await this.getParityHistoryUseCase.execute(parsedLimit);
      
      res.status(HTTP_STATUS.OK)
        .json(ResponseUtil.success(result, 'History retrieved successfully'));

    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene estadísticas de paridad
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  async getStats(req, res, next) {
    try {
      const result = await this.getParityStatsUseCase.execute();
      
      res.status(HTTP_STATUS.OK)
        .json(ResponseUtil.success(result, 'Statistics retrieved successfully'));

    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check
   * @param {Request} req 
   * @param {Response} res 
   */
  async healthCheck(req, res) {
    res.status(HTTP_STATUS.OK)
      .json(ResponseUtil.success({
        status: 'healthy',
        service: 'Parity API',
        version: '1.0.0',
        uptime: process.uptime()
      }, 'Service is healthy'));
  }
}

module.exports = { ParityController };
