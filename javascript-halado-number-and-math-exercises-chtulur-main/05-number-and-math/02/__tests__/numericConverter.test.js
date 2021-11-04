import numericConverter from '../solution/js/numericConverter';

describe('numericConverter ', () => {
  test('should return an object with binary, hex and octal properties, and these contain the matching values', () => {
    expect(numericConverter(333)).toEqual({
      binary: '101001101',
      hexa: '14d',
      octal: '515',
    });
  });
});
