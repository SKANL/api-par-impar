/**
 * Caso de uso para obtener el historial de verificaciones
 */
class GetParityHistoryUseCase {
  constructor(numberRepository) {
    this.numberRepository = numberRepository;
  }

  /**
   * Ejecuta el caso de uso
   * @param {number} limit - Límite de registros a obtener
   * @returns {Promise<Object>} Historial de verificaciones
   */
  async execute(limit = 10) {
    try {
      if (typeof limit !== 'number' || limit <= 0) {
        limit = 10;
      }

      const history = await this.numberRepository.getHistory(limit);
      
      return {
        history: history,
        count: history.length,
        limit: limit,
        success: true
      };

    } catch (error) {
      console.error('Error in GetParityHistoryUseCase:', error);
      throw new Error('Internal server error while getting history');
    }
  }
}

module.exports = { GetParityHistoryUseCase };
