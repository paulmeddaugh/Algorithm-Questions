/*
    Write a function that draws a 2D Menger Sponge
    •	Prototype: void menger(int level);
    •	Where level is the level of the Menger Sponge to draw
    •	If level is lower than 0, your function must do nothing
    •	You’re allowed to use the math library. Your program will be compiled using the ld flag -lm

    Format:
    •	First, read Menger sponge
    •	Here, we will only draw a 2D version of the Menger sponge, but the principle is the same
    •	A level N sponge is a 3x3 square of level N-1 sponges, except for the center one, which is left empty
    •	A level 0 sponge is represented by the # character

    •	Examples:
    o	A level 0 sponge is a simple 1x1 square
    o	A level 1 sponge is a 3x3 square of level 0 sponges, except for the center one, which is left empty
    o	A level 2 sponge is a 3x3 square of level 1 sponges, except for the center one, which is left empty
    •	TIP: The size of a level N Menger sponge is calculated as follows: 3^N
*/

console.log(menger(4));

/**
 * O(3n)
 * Recursize method that creates each level's string utilizing the previous level's string. Starting
 * at base case level 0 ('#\n'), it determines what one line would be - sections between '\n' - and, 
 * depending on the 1st, 2nd or 3rd iteration of the previous level string, appends each line to
 * the current level string in the form of: 1st count [line] [line] [line], 2nd count 
 * [line] line-sized gap [line], and 3rd count [line] [line] [line].
 * 
 * A level 2 from a level 1 string ('###\n# #\n###\n') would, on first iteration through, print each of
 * the lines three times ('#########\n# ## ## #\n#########'). The second would print the line, a line 
 * sized spacing gap, and the line again ('###   ###\n# #   # #\n###   ###'). The third iteration would 
 * print each line three times as the first.
 */
 function menger(level) {

    if (level == 0) {
        return '#\n';
    } else {
        const prevLevelStr = menger(level - 1);
        const sideLength = prevLevelStr.indexOf('\n');
        let levelStr = '';
        
        // Runs through the previous 
        for (let i = 0; i < 3; i++) {
            let line = 0;
            let lineStr = '';
            for (let ch of prevLevelStr) {
                if (ch == '\n') {
                    if (i == 1) { // Second iteration with the whole in the center
                        levelStr += lineStr + new Array(sideLength).fill(' ').join('') + lineStr + '\n';
                    } else {
                        levelStr += lineStr + lineStr + lineStr + '\n';
                    }

                    line++;
                    lineStr = '';
                } else {
                    lineStr += ch;
                }
            }
        }

        return levelStr;
    }
}

/** 
 * O(n^2): Rows as binary numbers attempt
 * Due to the size of the integers as 32-bit numbers, this algorithm only can reach up to level 3. I 
 * believe there is a work around, though a faster method could perhaps be done recursizely.
 */
function mengerSpongeBinary(level) {
    const lineArr = new Array(Math.pow(3, level));
    const allTrueNum = Math.pow(2, lineArr.length) - 1; // for level 2, 511 (111 111 111)
    lineArr.fill(allTrueNum);

    let currLevel = level;
    while (currLevel > 0) {
        const diff = level - currLevel;
        const times = Math.pow(9, diff);
        for (let i = 0; i < times; i++) {
            const cubeLength = Math.pow(3, currLevel);
            const startX = Math.pow(3, currLevel - 1) + (cubeLength * (i % Math.sqrt(times)));
            const startY = Math.pow(3, currLevel - 1) + (cubeLength * Math.floor(i / Math.sqrt(times)));
            clear(currLevel - 1, startX, startY, lineArr);
        }
        currLevel--;
    }
    
    // print
    for (let lineNum of lineArr) {
        const str = Number(lineNum).toString(2).replace(/1/g, '#').replace(/0/g, ' ');
        console.log(str);
    }
}

// Helper method for rows as binary numbers attempt, clearing a certain binary section in the row
function clear(level, startX, startY, arr) {
    const clearSize = Math.pow(3, level);

    for (let y = startY; y < startY + clearSize; y++) {
        // Summation of powers equations for removing certain binary places
        const clearNum = (Math.pow(2, clearSize + startX) - 1) - (Math.pow(2, startX) - 1);
        // Inverts clearNum binary to allow '1's already knocked down to remain down
        arr[y] = arr[y] & ~clearNum;
    }
}

// Attempt to determine the space chars linearly, incomplete.
function mengerLinear(level) {
    const levelSize = new Array(level).forEach((val, i, arr) => arr[i] = Math.pow(3, i));
    const levelGapSize = new Array(level).forEach((val, i, arr) => arr[i](i != 0) ? Math.pow(3, i - 1) : 0);

    for (let y = 0; y < levelSize[level]; y++) {
        let str = '';
        for (let x = 0; x < levelSize[level]; x++) {
            for (let levIn = 0; levIn < levelSize.length; levIn++) {
                if (levelGapSize[levIn] == x % levelSize[levIn] && 
                    levelGapSize[levIn] == y % levelSize[levIn]) {
                    
                    str += ' ';
                } else {
                    str += '#';
                }
            }
        }
        console.log(str);
    }

    const middleSpace = levelSize + (levelSize / 2);

}