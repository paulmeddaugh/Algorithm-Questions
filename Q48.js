/**
 * Given an array of numbers, find the maximum sum of any contiguous subarray of the array.
 * 
 * For example, given the array [34, -50, 42, 14, -5, 86], the maximum sum would be 137, since we would take 
 * elements 42, 14, -5, and 86.
 * 
 * Given the array [-5, -1, -8, -9], the maximum sum would be 0, since we would not take any elements.
 * Do this in O(N) time.
 */

console.log(contiguousSubarray([34, -50, 42, 14, -5, 86]));
console.log(contiguousSubarray([-5, -1, -8, -9]));
console.log(contiguousSubarray([4, 10, -9, -1]));

function contiguousSubarray (arr) {
    let highestTotal = 0;
    arr.reduce(
        function (prev, curr) {
        if (prev + curr > 0) {
            return (total + curr > highestTotal) ? highestTotal = total + curr : total + curr;
        } else {
            return 0;
        }
        }
    , 0);
    return highestTotal;
}