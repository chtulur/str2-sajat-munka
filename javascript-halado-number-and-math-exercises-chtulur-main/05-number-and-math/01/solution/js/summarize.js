const summarize = (...nums) => {
  let result = nums.filter((num) => Number.isInteger(num));
  if (result.some((num) => !Number.isSafeInteger(num))) {
    result = result.map((num) => BigInt(num)).reduce((a, b) => a + b);
  } else {
    result = result.reduce((a, b) => a + b);
    !Number.isSafeInteger(result)
      ? (result = BigInt(result))
      : console.log("nothing");
  }
  return result;
};

export default summarize;
