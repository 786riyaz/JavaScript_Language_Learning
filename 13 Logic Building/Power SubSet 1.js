/*
power subset in any order 
[1,2,3]
[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
*/

let input = [1,2,3,4,5];
let length = input.length;
let finalArray = [];

for (let i=0; i < 1 << length; i++) {
    let binaryRep = i.toString(2).padStart(length, '0');
    let subset = [];
    for(let j=0; j < binaryRep.length; j++) {
        if(binaryRep[j] === '1') {
            subset.push(input[j]);
        }
    }
    finalArray.push(subset);
}

console.log(finalArray);