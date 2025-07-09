const { ValidationException } = require('../../shared/exceptions/validation.exception');

/**
 * Entidad Number - Representa un número entero en el dominio
 */
class NumberEntity {
  constructor(value) {
    if (!Number.isInteger(value)) {
      throw new ValidationException('Value must be an integer');
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }

  /**
   * Determina si el número es par
   * @returns {boolean}
   */
  isEven() {
    return this._value % 2 === 0;
  }

  /**
   * Determina si el número es impar
   * @returns {boolean}
   */
  isOdd() {
    return !this.isEven();
  }

  /**
   * Representación en string del número
   * @returns {string}
   */
  toString() {
    return this._value.toString();
  }

  /**
   * Compara dos números
   * @param {NumberEntity} other 
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof NumberEntity && this._value === other._value;
  }
}

module.exports = { NumberEntity };
