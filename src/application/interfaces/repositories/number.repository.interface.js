/**
 * Interfaz del repositorio de números (Puerto)
 * Define el contrato que deben implementar los adaptadores de repositorio
 */
class NumberRepositoryInterface {
  /**
   * Guarda un resultado de verificación de paridad
   * @param {NumberEntity} numberEntity 
   * @param {ParityValueObject} parity 
   * @returns {Promise<Object>}
   */
  async save(numberEntity, parity) {
    throw new Error('Method save() must be implemented');
  }

  /**
   * Encuentra un número por su valor
   * @param {number} value 
   * @returns {Promise<Object|null>}
   */
  async findByValue(value) {
    throw new Error('Method findByValue() must be implemented');
  }

  /**
   * Obtiene el historial de verificaciones
   * @param {number} limit 
   * @returns {Promise<Array>}
   */
  async getHistory(limit = 10) {
    throw new Error('Method getHistory() must be implemented');
  }

  /**
   * Obtiene estadísticas de paridad
   * @returns {Promise<Object>}
   */
  async getStats() {
    throw new Error('Method getStats() must be implemented');
  }

  /**
   * Limpia el historial
   * @returns {Promise<void>}
   */
  async clear() {
    throw new Error('Method clear() must be implemented');
  }
}

module.exports = { NumberRepositoryInterface };
