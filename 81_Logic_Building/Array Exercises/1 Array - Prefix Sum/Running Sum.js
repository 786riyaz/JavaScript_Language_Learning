
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++){
        sum += nums[i];
        nums[i] = sum;
    }
    return nums;
    
};


console.log(runningSum([1,2,3,4,5]));

var runningSum1 = function (nums) {
    
    for (let i = 1; i < nums.length; i++){
        nums[i] += nums[i-1];               // num[i] + num[i+1]
    }
    return nums;
    
};

console.log(runningSum1([1,2,3,4,5]));