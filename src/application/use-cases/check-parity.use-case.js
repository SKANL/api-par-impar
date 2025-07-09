const { NumberEntity } = require('../../domain/entities/number.entity');
const { ParityService } = require('../../domain/services/parity.service');
const { ValidationException } = require('../../shared/exceptions/validation.exception');

/**
 * Caso de uso para verificar la paridad de un número
 */
class CheckParityUseCase {
  constructor(numberRepository) {
    this.numberRepository = numberRepository;
  }

  /**
   * Ejecuta el caso de uso
   * @param {number} number - El número a verificar
   * @returns {Promise<Object>} Resultado de la verificación
   */
  async execute(number) {
    try {
      // Validación de entrada
      if (typeof number !== 'number') {
        throw new ValidationException('Input must be a number');
      }

      if (!Number.isInteger(number)) {
        throw new ValidationException('Input must be an integer');
      }

      // Crear entidad de dominio
      const numberEntity = new NumberEntity(number);
      
      // Aplicar lógica de negocio
      const parityInfo = ParityService.getParityInfo(numberEntity);
      const parity = ParityService.checkParity(numberEntity);
      
      // Guardar en repositorio (historial)
      const savedRecord = await this.numberRepository.save(numberEntity, parity);
      
      // Retornar resultado
      return {
        id: savedRecord.id,
        number: number,
        parity: parity.type,
        isEven: parity.isEven(),
        isOdd: parity.isOdd(),
        description: parityInfo.description,
        timestamp: savedRecord.timestamp || new Date().toISOString(),
        success: true
      };

    } catch (error) {
      if (error instanceof ValidationException) {
        throw error;
      }
      
      // Log del error en un sistema real
      console.error('Error in CheckParityUseCase:', error);
      throw new Error('Internal server error while checking parity');
    }
  }
}

module.exports = { CheckParityUseCase };
