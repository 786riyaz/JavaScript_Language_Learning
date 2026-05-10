/**
 * @param {number[][]} arr
 * @return {int}
 */

var printIn2D = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
};
var maximumWealth = function (arr) {
//   printIn2D(arr);
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = 0; j < arr[i].length; j++) {
      sum += arr[i][j];
    }
    if (max < sum) {
      max = sum;
    }
  }
  return max;
};

console.log(
  maximumWealth([
    [2, 8, 7],
    [7, 1, 3],
    [1, 9, 5],
  ]),
); // 17
