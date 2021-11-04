import summarize from '../solution/js/summarize';

describe('summarize ', () => {
  test('should return the sum of numbers', () => {
    const numbers = [10, 20, 30];

    const result = summarize(...numbers);

    expect(result).toBe(60);
  });

  test('should return the sum of numbers and skip non-integer values', () => {
    const numbers = [10, 20, 30.1];

    const result = summarize(...numbers);

    expect(result).toBe(30);
  });

  test('should return the sum of numbers as Bigint if any partial result is Bigint', () => {
    const numbers = [1, 9007199254740990, 1];

    const result = summarize(...numbers);

    expect(typeof result).toBe('bigint');
    expect(result.toString()).toBe('9007199254740992');
  });

  test('should return the sum of numbers as Bigint if any parameter is not a safe integer', () => {
    const numbers = [10, 20, 1e20];

    const result = summarize(...numbers);

    expect(typeof result).toBe('bigint');
    expect(result.toString()).toBe('100000000000000000030');
  });
});
