/**
 * @param {number[][]} arr
 * @return {int}
 */
var min_array = function (arr) {
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      min = Math.min(min, arr[i][j]);
    }
  }
  return min;
};

console.log(
  min_array([
    [10, 5],
    [7, 8],
    [3, 5],
  ]),
); // 3
