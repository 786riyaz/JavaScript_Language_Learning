var sumOddLengthSubarrays = function(arr) {
    let total = 0;
    let n = arr.length;

    for (let i = 0; i < n; i++) {

        // Total subarrays containing arr[i]
        let totalSubarrays = (i + 1) * (n - i);

        // Odd-length subarrays count
        let oddCount = Math.floor((totalSubarrays + 1) / 2);

        // Contribution
        total += arr[i] * oddCount;
    }

    return total;
};

input = [10,11,12]; // 66
console.log("Sum :: ", sumOddLengthSubarrays(input));