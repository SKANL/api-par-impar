/**
 * Excepción base para todas las excepciones personalizadas
 */
class BaseException extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    
    // Mantiene el stack trace limpio
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convierte la excepción a un objeto JSON
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp
    };
  }
}

module.exports = { BaseException };
