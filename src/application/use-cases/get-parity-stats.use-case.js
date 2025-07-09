/**
 * Caso de uso para obtener estadísticas de paridad
 */
class GetParityStatsUseCase {
  constructor(numberRepository) {
    this.numberRepository = numberRepository;
  }

  /**
   * Ejecuta el caso de uso
   * @returns {Promise<Object>} Estadísticas de paridad
   */
  async execute() {
    try {
      const stats = await this.numberRepository.getStats();
      
      return {
        totalChecks: stats.totalChecks,
        evenCount: stats.evenCount,
        oddCount: stats.oddCount,
        evenPercentage: stats.totalChecks > 0 ? ((stats.evenCount / stats.totalChecks) * 100).toFixed(2) : 0,
        oddPercentage: stats.totalChecks > 0 ? ((stats.oddCount / stats.totalChecks) * 100).toFixed(2) : 0,
        lastCheck: stats.lastCheck,
        success: true
      };

    } catch (error) {
      console.error('Error in GetParityStatsUseCase:', error);
      throw new Error('Internal server error while getting stats');
    }
  }
}

module.exports = { GetParityStatsUseCase };
