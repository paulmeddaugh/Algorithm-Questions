
/**
 * The goal of this task is to reproduce the 2048 game(NSFW !!) mechanics on a single horizontal line.
 * Given an array of integers, we want to be able to slide & merge it to the left or to the right. 
 * Identical numbers, if they are contiguous or separated by zeros, should be merged (See example)
 * 
 * alex@~/0x09-slide_line$ ./0-slide_line L 2 2 0 0
 * Line: 2, 2, 0, 0
 * Slide to the left
 * Line: 4, 0, 0, 0
 * alex@~/0x09-slide_line$ ./0-slide_line L 2 2 0 0 0 0 0 2 0 0 0 2 0 4
 * Line: 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 4
 * Slide to the left
 * Line: 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
 * alex@~/0x09-slide_line$ ./0-slide_line R 2 2 2 2
 * Line: 2, 2, 2, 2
 * Slide to the right
 * Line: 0, 0, 4, 4
 */

// Tests -------------------------------------
test('R', 2, 2, 2, 2);
test('L', 2, 4, 2, 4, 2, 4);
test('R', 2, 0, 2, 2, 4, 4);
test('L', 0, 2, 0, 2, 0, 4);
test('L', 2, 4, 2, 0, 2, 4);
test('R', 4, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 4);

function do2048(...nums) {

    // Checks if valid parameters
    const valid = nums.every((val, i) => 
        (i == 0) ? 
            typeof val == 'string' && (val.toLowerCase() === 'l' || val.toLowerCase() === 'r') :
            typeof val == 'number'
    );

    if (!valid) {
        throw new TypeError("Parameters must be in the format of '('L' || 'R'), [Number], [Number], etc.'");
    }
    
    const left = nums.shift().toLowerCase() == 'l'; // Direction to swipe row

    let currIndex = (left) ? 0 : nums.length - 1;
    let i = (left) ? 1 : nums.length - 2;

    while ((left && i != nums.length) || (!left && i != -1)) { // runs till other side of array is reached
        if (nums[i] != 0) { // simply moves on if element is 0

            const sameNum = (nums[currIndex] == nums[i]);
            const nextShiftIndex = (left) ? currIndex + 1 : currIndex - 1;
            let swapped = true;

            if (nums[currIndex] == 0) { // simply shifts element to index if 0
                nums[currIndex] = nums[i];
            } else if (sameNum) { // doubles element if same
                nums[currIndex] = nums[i] * 2;
            } else { // shifts element to next space if not the same
                nums[nextShiftIndex] = nums[i];
                if (nextShiftIndex == i) swapped = false;
            } 

            // Remains on currIndex if previous value was not filled (0); otherwise, moves to next
            if (nums[currIndex] != nums[i]) currIndex = nextShiftIndex;

            if (swapped) {
                nums[i] = 0; // Clears value if shifted
            }
        }

        i = (left) ? i + 1 : i - 1;
    }

    return nums;
}

function test(...nums) {
    this.testNum = this.testNum == undefined ? 1 : this.testNum + 1;
    const left = nums.shift().toLowerCase() == 'l';

    console.log(`Original test ${this.testNum} ${left ? 'left' : 'right'}: `);
    console.log(nums);

    console.log(`Shifted ${left ? 'left' : 'right'}: `);
    console.log(do2048((left) ? 'L' : 'R', ...nums));
    console.log('');
}