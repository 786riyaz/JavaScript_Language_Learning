/**
 * @param {number[]} nums
 * @return {number[]}
 */
var prefixSum = function (nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    nums[i] = sum;
  }
  // console.log(nums);
  return nums;
};

let input = [1, 2, 3, 4, 5];
console.log("Prefix Sum Array ==> ", prefixSum(input));

var prefixSum2 = function (nums) {
  console.log("Inside New ");
  let sum = 0;
  let newnums = nums.map((element) => {
    sum += element;
    console.log("Adding ===> ", element);
    console.log("Added ==", sum);
    return sum;
  });
  return newnums;
};
console.log("Prefix Sum Array ==> ", prefixSum2(input));

var prefixSum3 = function (nums) {
  let result = [];

  nums.reduce((sum, curr) => {
    sum += curr;
    result.push(sum);
    return sum;
  }, 0);

  return result;
};
console.log("Prefix Sum Array ==> ", prefixSum3(input));
