/*
This problem was asked by Palantir.

A typical American-style crossword puzzle grid is an N x N matrix with black and white squares, which obeys the following rules:

- Every white square must be part of an "across" word and a "down" word.
- No word can be fewer than three letters long.
- Every white square must be reachable from every other white square.
- The grid is rotationally symmetric (for example, the colors of the top left and bottom right squares must match).

Write a program to determine whether a given matrix qualifies as a crossword grid.
*/

class Square {
    color;
    letter;
    isAcrossWord;
    isDownWord;

    constructor(color, letter) {
        this.color = color;
        this.letter = letter;
    }

    getColor () {
        return this.color;
    }

    getLetter() {
        return this.letter;
    }

    setLetter (letter) {
        this.letter = letter;
    }

    acrossWord () {
        return this.isAcrossWord;
    }
    
    setIsAcrossWord(isAcrossWord) {
        this.isAcrossWord = isAcrossWord;
    }

    downWord () {
        return this.isDownWord;
    }

    setIsDownWord(isDownWord) {
        this.isDownWord = isDownWord;
    }

    isAcrossAndDownWord () {
        return this.acrossWord() && this.downWord();
    }
}

class WhiteSquare extends Square {
    constructor () {
        super('white');
    }
}

class BlackSquare extends Square {
    constructor () {
        super('black');
    }
}

class Answer {
    word;
    direction;
    startX;
    startY;
    endX;
    endY;
    count;

    constructor (word, direction, startX, startY, endX, endY, count) {
        this.word = word;
        this.direction = direction;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.count = count;
    }

    getWord() {
        return String(this.word);
    }
}

/* 
    |   | d | e | w |   |
    | a | w | a | i | t |
    | b | a | s | t | e |
    | c | r | e | t | e |
    |   | f | l | y |   |
*/

const grid = [
    [new BlackSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new BlackSquare()],
    [new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare()],
    [new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare()],
    [new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare()],
    [new BlackSquare(), new WhiteSquare(), new WhiteSquare(), new WhiteSquare(), new BlackSquare()],
];

const answers = [
    new Answer('dew', 'across', 1, 0, 3, 0, 1),
    new Answer('dwarf', 'down', 1, 0, 1, 4, 1),
    new Answer('easel', 'down', 2, 0, 2, 4, 2),
    new Answer('witty', 'down', 3, 0, 3, 4, 3),
    new Answer('await', 'across', 0, 1, 4, 1, 4),
    new Answer('abc', 'down', 0, 1, 0, 3, 4),
    new Answer('tee', 'down', 4, 1, 4, 3, 5),
    new Answer('baste', 'across', 0, 2, 4, 2, 6),
    new Answer('crete', 'across', 0, 3, 4, 3, 7),
    new Answer('fly', 'across', 1, 4, 3, 4, 8),
]

console.log(isAmericanCrosswordPuzzle(grid, answers));

function isAmericanCrosswordPuzzle (grid, answers) {
    if (!Array.isArray(grid) || !grid.every(row => Array.isArray(row) && row.length === grid.length)) {
        throw new Error('grid must be a 2-dimensional symmetrical array of columns then rows');
    }

    if (!Array.isArray(answers) || !answers.every(answer => answer.getWord().length >= 3)) {
        throw new Error('answers must be an array with every word having a length of 3 or more.')
    }

    // O(a): answers check
    for (let answer of answers) {
        const { direction, startX, startY, endX, endY, word } = answer;
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const square = getSquare(grid, x, y);
                if (direction === 'across') {
                    square?.setIsAcrossWord(true);
                } else {
                    square?.setIsDownWord(true);
                }

                // helps debugging
                const letter = word.charAt(x - startX + y - startY);
                square?.setLetter(letter);
            }
        }
    }

    // O(n) grid check: is symmetrical, is reachable, and isAcross and isDown
    const len = Math.floor(grid.length / 2);
    for (let y = 0; y <= len; y++) {
        for (let x = 0; x < grid.length; x++) {
            const square = getSquare(grid, x, y);
            if (!(square instanceof Square)) {
                throw new Error('grid[y][x] must be of the Square class');
            }
            
            try {
                if (square.getColor() !== 'black') {
                    console.log(`checking square (${x}, ${y}).`);
                    isValidSquare(grid, x, y);
                }

                const xComplement = getComplement(x, grid.length - 1);
                const yComplement = getComplement(y, grid.length - 1);
                const symmetricalSquare = getSquare(grid, xComplement, yComplement);
                if (square.getColor() !== symmetricalSquare.getColor()) {
                    throw new Error(`square (${x}, ${y}) is not the same color as square (${xComplement}, ${yComplement})`);
                }

                if (symmetricalSquare.getColor() !== 'black') {
                    console.log(`checking square (${xComplement}, ${yComplement}).`);
                    isValidSquare(grid, xComplement, yComplement);
                }

            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }

    return true;
}

function isValidSquare(grid, x, y) {
    const s = getSquare(grid, x, y);
    if (!s.acrossWord()) {
        throw new Error(`square (${x}, ${y}) is not part of an across word.`);
    }

    if (!s.downWord()) {
        throw new Error(`square (${x}, ${y}) is not part of an down word.`);
    }

    if (!isReachable(grid, x, y)) {
        throw new Error(`square (${x}, ${y}) is not reachable.`);
    }

    return true;
}

function getSquare (grid, x, y) {
    return (x < 0 || x >= grid.length || y < 0 || y >= grid.length) 
        ? null
        : grid[y][x];
}

function getRotationallySymmetricSquare(grid, x, y) {
    const xComplement = getComplement(x, grid.length);
    const yComplement = getComplement(y, grid.length);
    return grid[yComplement][xComplement];
}

function isReachable (grid, x, y) {
    if (getSquare(grid, x, y - 1)?.getColor() === 'white') return true;
    if (getSquare(grid, x + 1, y)?.getColor() === 'white') return true;
    if (getSquare(grid, x, y + 1)?.getColor() === 'white') return true;
    if (getSquare(grid, x - 1, y)?.getColor() === 'white') return true;

    return false;
}

function getComplement (num, max) {
    return max - num;
}