const { NumberRepositoryInterface } = require('../../../application/interfaces/repositories/number.repository.interface');

/**
 * Implementación en memoria del repositorio de números
 */
class InMemoryNumberRepository extends NumberRepositoryInterface {
  constructor() {
    super();
    this.records = [];
    this.nextId = 1;
  }

  /**
   * Guarda un resultado de verificación de paridad
   * @param {NumberEntity} numberEntity 
   * @param {ParityValueObject} parity 
   * @returns {Promise<Object>}
   */
  async save(numberEntity, parity) {
    const record = {
      id: this.nextId++,
      value: numberEntity.value,
      parity: parity.type,
      isEven: parity.isEven(),
      isOdd: parity.isOdd(),
      timestamp: new Date().toISOString()
    };

    this.records.push(record);
    return record;
  }

  /**
   * Encuentra un número por su valor
   * @param {number} value 
   * @returns {Promise<Object|null>}
   */
  async findByValue(value) {
    const record = this.records.find(r => r.value === value);
    return record || null;
  }

  /**
   * Obtiene el historial de verificaciones
   * @param {number} limit 
   * @returns {Promise<Array>}
   */
  async getHistory(limit = 10) {
    return this.records
      .slice(-limit)
      .reverse(); // Los más recientes primero
  }

  /**
   * Obtiene estadísticas de paridad
   * @returns {Promise<Object>}
   */
  async getStats() {
    const totalChecks = this.records.length;
    const evenCount = this.records.filter(r => r.isEven).length;
    const oddCount = this.records.filter(r => r.isOdd).length;
    const lastCheck = this.records.length > 0 ? this.records[this.records.length - 1] : null;

    return {
      totalChecks,
      evenCount,
      oddCount,
      lastCheck
    };
  }

  /**
   * Limpia el historial
   * @returns {Promise<void>}
   */
  async clear() {
    this.records = [];
    this.nextId = 1;
  }

  /**
   * Obtiene todos los registros (útil para testing)
   * @returns {Promise<Array>}
   */
  async getAll() {
    return [...this.records];
  }
}

module.exports = { InMemoryNumberRepository };
