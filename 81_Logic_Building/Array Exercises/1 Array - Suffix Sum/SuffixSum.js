/**
 * @param {number[]} nums
 * @return {number[]}
 */
var suffixSum = function (nums) {
  let result = [];
  let sum = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    sum += nums[i];
    result[i] = sum;
  }
  return result;
};

console.log(suffixSum([1, 2, 3, 4, 5]));

var suffixSum1 = function (nums) {
  let sum = 0;

  return nums.reduceRight((result, curr, index) => {
    sum += curr;
    result[index] = sum;

    return result;
  }, []);
};

console.log(suffixSum1([1, 2, 3, 4, 5]));
