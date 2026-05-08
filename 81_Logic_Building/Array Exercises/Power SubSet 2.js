/*
power subset in any order 
[1,2,3]
[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
*/

let input = [1, 2, 3];
for (let i = 0; i < 1 << input.length; i++) {
  let subset = [];
  for (let j = 0; j < input.length; j++) {
    console.log("-------------------> ||| j :", j, "||| (1 << j) :", 1 << j, "||| i :", i, "||| (i & (1 << j)) :::", i & (1 << j));
    if (i & (1 << j)) {
      // console.log("===================> ||| i :", i, "||| j :", j, "|||");
      // console.log("subset before push :", subset);
      subset.push(input[j]);
      console.log("subset after push :", subset);
    }
  }
  console.log(subset);
  console.log("================================================================");
}
