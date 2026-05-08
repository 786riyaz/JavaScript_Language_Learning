var sumOddLengthSubarrays = function (arr) {
  let sum = 0;
  console.log(`Input Array: ${arr}`);
  let target = 1;
  while (true) {
    console.log("Target :: ", target);
    for (let i = 0; i < arr.length; i++) {
        console.log(`I have to add from ${i} to less than ${i+target} and less than ${arr.length}`);
      for (let j = i; j < i + target && (i+target) <= arr.length; j++) {
        console.log(`From ${i} to ${j} ===>`);
        console.log("Adding ===> ", arr[j]);
        sum += arr[j];
      }

      console.log("===============");
    }

    console.log("---------------------------- Sum Till Target", target, " = ", sum);
    target += 2;
    if (target > arr.length) {
      break;
    }
  }

  return sum;
};

input = [1,2]; // 58
console.log("Sum :: ", sumOddLengthSubarrays(input));
