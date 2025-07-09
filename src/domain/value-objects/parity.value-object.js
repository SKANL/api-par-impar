const { ValidationException } = require('../../shared/exceptions/validation.exception');

/**
 * Value Object que representa la paridad de un número
 */
class ParityValueObject {
  static EVEN = 'even';
  static ODD = 'odd';

  constructor(type) {
    const validTypes = [ParityValueObject.EVEN, ParityValueObject.ODD];
    if (!validTypes.includes(type)) {
      throw new ValidationException(`Invalid parity type. Must be one of: ${validTypes.join(', ')}`);
    }
    this._type = type;
  }

  get type() {
    return this._type;
  }

  /**
   * Verifica si es par
   * @returns {boolean}
   */
  isEven() {
    return this._type === ParityValueObject.EVEN;
  }

  /**
   * Verifica si es impar
   * @returns {boolean}
   */
  isOdd() {
    return this._type === ParityValueObject.ODD;
  }

  /**
   * Representación en string
   * @returns {string}
   */
  toString() {
    return this._type;
  }

  /**
   * Compara dos objetos Parity
   * @param {ParityValueObject} other 
   * @returns {boolean}
   */
  equals(other) {
    return other instanceof ParityValueObject && this._type === other._type;
  }

  /**
   * Crea una instancia para número par
   * @returns {ParityValueObject}
   */
  static createEven() {
    return new ParityValueObject(ParityValueObject.EVEN);
  }

  /**
   * Crea una instancia para número impar
   * @returns {ParityValueObject}
   */
  static createOdd() {
    return new ParityValueObject(ParityValueObject.ODD);
  }
}

module.exports = { ParityValueObject };
