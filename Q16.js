/*
This problem was asked by Twitter.

You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
You should be as efficient with time and space as possible.
*/

// Testing: `node ./Q16.js`

// Implementation with an array
class LimitedArray {
    /* In JS, Sets are not as performant dominant over arrays as in Java. According to this article
    (https://stackoverflow.com/a/39010462), arrays are better at insertion and Set's deletion is
    much better than the slice method. */
    arr;
    n;

    constructor (n) {
        this.arr = [];
        this.n = n;
    }

    record(order_id) {
        this.arr.push(order_id);
        if (this.arr.length > this.n) {
            this.arr.shift();
        }
    }

    get_last(i) {
        i = Math.min(i, this.n);
        // returns reversed array of the limited size
        const limitedArr = [];
        const lowestIndex = Math.max(0, this.arr.length - i);
        for (let num = this.arr.length - 1; num >= lowestIndex; num--) {
            limitedArr.push(this.arr[num]);
        }
        return limitedArr;
    }
}

function test(DataStructure) {
    const l = new DataStructure(10);
    l.record(5);
    l.record(6);
    l.record(7);
    l.record(8);
    l.record(9);
    l.record(10);
    l.record(11);
    l.record(12);
    l.record(13);
    l.record(14);
    l.record(15);
    l.record(16);

    console.log('get_last(5)', l.get_last(5));
    console.log('get_last(8)', l.get_last(8));
    console.log('get_last(18)', l.get_last(18));
}

console.log('--- LimitedArray ---');
test(LimitedArray);

// Implementation with a double linked link structure
class Node {
    val;
    previousNode = null;
    nextNode = null

    constructor (val, prevNode, nextNode) {
        this.val = val;
        this.previousNode = prevNode;
        this.nextNode = nextNode;
    }
}

class LimitedDoubleLinkedList {
    lastNode = null;
    firstNode = null;
    length = 0;
    n;

    constructor (n) {
        this.n = n;
    }

    record (val) {
        const newNode = new Node(val, this.firstNode);
        if (this.firstNode) { // links previous first node with new one
            this.firstNode.nextNode = newNode;
        }
        this.firstNode = newNode;
        if (!this.lastNode) {
            this.lastNode = newNode;
        }
        if (this.length === this.n) { // reasigns last node if at n
            this.lastNode = this.lastNode.nextNode;
        } else {
            this.length++;
        }
    }

    get_last(i) {
        i = Math.min(i, this.n);

        // traverses linked list and adds values to returning array
        const arr = [];
        let node = this.firstNode;
        while (i && node) {
            arr.push(node.val);
            i--;
            node = node.previousNode;
        }
        return arr;
    }
}

console.log('--- LimitedDoubleLinkedList ---');
test(LimitedDoubleLinkedList);