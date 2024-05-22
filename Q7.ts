const map: { [key: string]: string } = {};
for (let ascii = 97; ascii <= 122; ascii++) {
    map[String(ascii - 96)] = String.fromCharCode(ascii);
}

interface EncodedChar {
    position: number,
    code: number,
    char: string,
}

/**
 * This problem was asked by Facebook.
 *  
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
 * 
 * For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
 * 
 * You can assume that the messages are decodable. For example, '001' is not allowed.
 * 
 * ----
 * Uses a backtracking approach to find all ways the message could be encoded.
 * 
 * To run this typescript code, use
 * ```
 * ts-node ./Q7.ts
 * ```
 */
function getEncodedMessageCount(message: string) {
    let count: number = 0;
    let codeCount: number = 1; // uses a codeCount for codes array below because Array.splice() is less performant
    const codes: (EncodedChar | null)[] = [getNextEncodedCharFromPosition(message, 0, 0)];

    while (codes[0] !== null) {
        // keep appending codes till hitting null
        let position = getEndPositionOfEncodedChar(codes[codeCount - 1]);
        const startingCode = codes[codeCount]?.code ?? 0;
        const nextEncodedChar = getNextEncodedCharFromPosition(message, position, startingCode);

        if (nextEncodedChar !== null) {
            codes[codeCount++] = nextEncodedChar;
            position = getEndPositionOfEncodedChar(nextEncodedChar);
            if (position === message.length) { // valid encryption found
                count++;
                printCodeCombination(codes);
            }
        } else { // backtrack
            codes[codeCount--] = null;
        }
    }

    return count;
}

function getNextEncodedCharFromPosition(message: string, position: number, previousCode: number) {
    const codeLength = String(previousCode).length
    if (position >= message.length || codeLength === 2) {
        return null;
    }
    
    let endingPosition = previousCode === 0
        ? position + 1
        : position + 2;
    const code = Number(message.slice(position, endingPosition));

    if (code <= previousCode || code > 26) return null;
    const char = map[code];
    return { position, code, char };
}

function getEndPositionOfEncodedChar (charInfo: EncodedChar | null) {
    return (charInfo?.position ?? 0) + getCodeStringLength(charInfo);
}

function getCodeStringLength (charInfo: EncodedChar | null) {
    return charInfo 
        ? String(charInfo?.code).length
        : 0;
}

function printCodeCombination (codes: (EncodedChar | null)[]) {
    console.log(codes
        .map(code => code?.char)
        .join('')
    );
}

const messages = [
    '111',
    '12915',
    '52214',
    '85121215', // hello
];
for (let message of messages) {
    console.log('message', message);
    console.log(getEncodedMessageCount(message));
}