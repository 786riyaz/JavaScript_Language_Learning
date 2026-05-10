/**
 * @param {number[]} arr
 * @return {number}
 */
var missing_elements = function(arr) {

    let n = arr.length + 1;

    let xor = 0;

    // XOR all numbers from 1 to n
    for (let i = 1; i <= n; i++) {
        xor ^= i;
    }

    // XOR array elements
    for (let num of arr) {
        xor ^= num;
    }

    return xor;
};

console.log(missing_elements([1,2,4,5])); // 3