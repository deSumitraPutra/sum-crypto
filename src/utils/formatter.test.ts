import { formatNumber } from './formatter';

describe('formatter', () => {
  describe('#formatNumber', () => {
    it('should return input number when input number is under 1000', () => {
      const inputNumber = 999;

      const result = formatNumber(inputNumber);

      expect(result).toEqual(inputNumber);
    });

    it('should return input number with prefix K when input number is between 1000 and 100.000', () => {
      const inputNumber = 50000;
      const expectedResult = '50K';

      const result = formatNumber(inputNumber);

      expect(result).toEqual(expectedResult);
    });

    it('should return input number with prefix M when input number is between 1.000.000 and 1.000.000.000', () => {
      const inputNumber = 5000000;
      const expectedResult = '5M';

      const result = formatNumber(inputNumber);

      expect(result).toEqual(expectedResult);
    });

    it('should return input number with prefix B when input number is between 1.000.000.000 and 1.000.000.000.000', () => {
      const inputNumber = 5000000000;
      const expectedResult = '5B';

      const result = formatNumber(inputNumber);

      expect(result).toEqual(expectedResult);
    });

    it('should return input number with prefix B when input number is over 1.000.000.000.000.000', () => {
      const inputNumber = 5000000000000;
      const expectedResult = '5T';

      const result = formatNumber(inputNumber);

      expect(result).toEqual(expectedResult);
    });
  });
});
