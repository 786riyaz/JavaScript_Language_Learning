
/**
 * @param {number[]} arr
 * @return {number}
 */
var missing_elements = function(arr) {
    let currentTotal = arr.reduce((acc,curr)=>acc+curr,0);
    let expectedLength = arr.length + 1;
    let expectedTotal = Math.floor((expectedLength * (expectedLength + 1))/2);
    let difference = expectedTotal - currentTotal;
    // console.log(currentTotal, expectedLength, expectedTotal, difference);
    return difference;
    
};

let input = [1, 2, 4, 5];
console.log(missing_elements(input)); // Output: 3