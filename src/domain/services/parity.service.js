const { ParityValueObject } = require('../value-objects/parity.value-object');

/**
 * Servicio de dominio para operaciones relacionadas con la paridad
 */
class ParityService {
  /**
   * Determina la paridad de un número
   * @param {NumberEntity} numberEntity 
   * @returns {ParityValueObject}
   */
  static checkParity(numberEntity) {
    if (numberEntity.isEven()) {
      return ParityValueObject.createEven();
    }
    return ParityValueObject.createOdd();
  }

  /**
   * Verifica si un número es par
   * @param {NumberEntity} numberEntity 
   * @returns {boolean}
   */
  static isEven(numberEntity) {
    return numberEntity.isEven();
  }

  /**
   * Verifica si un número es impar
   * @param {NumberEntity} numberEntity 
   * @returns {boolean}
   */
  static isOdd(numberEntity) {
    return numberEntity.isOdd();
  }

  /**
   * Obtiene información detallada sobre la paridad
   * @param {NumberEntity} numberEntity 
   * @returns {Object}
   */
  static getParityInfo(numberEntity) {
    const parity = this.checkParity(numberEntity);
    return {
      value: numberEntity.value,
      parity: parity.type,
      isEven: parity.isEven(),
      isOdd: parity.isOdd(),
      description: `El número ${numberEntity.value} es ${parity.type === 'even' ? 'par' : 'impar'}`
    };
  }
}

module.exports = { ParityService };
