function find_maximum_subarray(arr, length) {

    let currentSum = arr[0];
    let maxSum = arr[0];

    // console.log(`Element: ${arr[0]}, Current Sum: ${currentSum}, Max Sum: ${maxSum}`);
    for (let i = 1; i < length; i++) {

        console.log(`currentSum + arr[i]: ${currentSum} + ${arr[i]} = ${currentSum + arr[i]}`);
        currentSum = Math.max(arr[i], currentSum + arr[i]);

        maxSum = Math.max(maxSum, currentSum);
        console.log(`Element: ${arr[i]}, Current Sum: ${currentSum}, Max Sum: ${maxSum}`);
    }

    return maxSum;e
}

// let input = [1,2,3,4,5];
// let input = [1,2,3,-4,-5];
// let input = [5,2,-4,-5, 3,-1,2,3,1];
// let input = [1,2,-2,5,-10,1,2];
// let input = [1,2,3,-2,5];
let input = [-1,-2,-3,-4,-5,-6];
console.log(find_maximum_subarray(input,input.length));