// Ejemplo de test unitario para NumberEntity
// Para ejecutar: npm install jest --save-dev && npx jest

const { NumberEntity } = require('../../../src/domain/entities/number.entity');
const { ValidationException } = require('../../../src/shared/exceptions/validation.exception');

describe('NumberEntity', () => {
  describe('constructor', () => {
    it('should create a NumberEntity with valid integer', () => {
      const number = new NumberEntity(42);
      expect(number.value).toBe(42);
    });

    it('should throw ValidationException for non-integer', () => {
      expect(() => new NumberEntity(3.14)).toThrow(ValidationException);
      expect(() => new NumberEntity('42')).toThrow(ValidationException);
      expect(() => new NumberEntity(null)).toThrow(ValidationException);
    });
  });

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(new NumberEntity(2).isEven()).toBe(true);
      expect(new NumberEntity(0).isEven()).toBe(true);
      expect(new NumberEntity(-4).isEven()).toBe(true);
    });

    it('should return false for odd numbers', () => {
      expect(new NumberEntity(1).isEven()).toBe(false);
      expect(new NumberEntity(3).isEven()).toBe(false);
      expect(new NumberEntity(-5).isEven()).toBe(false);
    });
  });

  describe('isOdd', () => {
    it('should return true for odd numbers', () => {
      expect(new NumberEntity(1).isOdd()).toBe(true);
      expect(new NumberEntity(3).isOdd()).toBe(true);
      expect(new NumberEntity(-5).isOdd()).toBe(true);
    });

    it('should return false for even numbers', () => {
      expect(new NumberEntity(2).isOdd()).toBe(false);
      expect(new NumberEntity(0).isOdd()).toBe(false);
      expect(new NumberEntity(-4).isOdd()).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true for equal numbers', () => {
      const num1 = new NumberEntity(42);
      const num2 = new NumberEntity(42);
      expect(num1.equals(num2)).toBe(true);
    });

    it('should return false for different numbers', () => {
      const num1 = new NumberEntity(42);
      const num2 = new NumberEntity(24);
      expect(num1.equals(num2)).toBe(false);
    });
  });
});
