
boxes = [[1, 5, 5, 5, 5, 5], [2], [0, 4, 1], [3], [], [4, 1], [5, 6]];
console.log(canUnlockAll(boxes));

boxes = [[1], [2], [3], [4], []];
console.log(canUnlockAll(boxes));

boxes = [[1, 4, 6], [2], [0, 4, 1], [5, 6, 2], [3], [4, 1], [6]];
console.log(canUnlockAll(boxes));

boxes = [[1, 4], [2], [0, 4, 1], [3], [], [4, 1], [5, 6]];
console.log(canUnlockAll(boxes));

// Almost O(n)
function canUnlockAll(boxes) {
    let keys = [...boxes[0]];
    boxes[0] = -1;
    let locked = boxes.length - 1;

    while (keys.length !== 0) {
        let key = keys.shift();
        if (boxes[key] !== -1) { // already unlocked
            if (boxes[key].length !== 0) { // case of empty box
                for (let newKey of boxes[key]) { // only adds key if box not unlocked, though can add duplicates
                    if (boxes[newKey] !== -1) keys.push(newKey);
                }
            }
            boxes[key] = -1;
            if (--locked === 0) return true;
        }
    }

    if (locked !== 0) return false;
}