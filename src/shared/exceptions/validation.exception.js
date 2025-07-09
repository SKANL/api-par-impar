const { BaseException } = require('./base.exception');

/**
 * Excepción para errores de validación
 */
class ValidationException extends BaseException {
  constructor(message, field = null) {
    super(message, 400);
    this.field = field;
  }

  /**
   * Convierte la excepción a un objeto JSON
   * @returns {Object}
   */
  toJSON() {
    const json = super.toJSON();
    if (this.field) {
      json.field = this.field;
    }
    return json;
  }
}

module.exports = { ValidationException };
