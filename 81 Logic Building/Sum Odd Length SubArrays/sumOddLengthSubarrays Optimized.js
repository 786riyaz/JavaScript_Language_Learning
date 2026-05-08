var sumOddLengthSubarrays = function(arr) {
    let total = 0;

    for (let start = 0; start < arr.length; start++) {

        let currentSum = 0;

        for (let end = start; end < arr.length; end++) {

            currentSum += arr[end];

            let length = end - start + 1;

            if (length % 2 !== 0) {
                total += currentSum;
            }
        }
    }

    return total;
};

input = [10,11,12]; // 66
console.log("Sum :: ", sumOddLengthSubarrays(input));