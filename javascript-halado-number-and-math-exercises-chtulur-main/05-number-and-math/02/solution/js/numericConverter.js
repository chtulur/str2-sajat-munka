const numericConverter = (decimal) => {
  let obj = {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    hexa: decimal.toString(16),
  };
  return obj;
};

export default numericConverter;
