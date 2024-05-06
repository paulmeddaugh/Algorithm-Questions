/* 
    [Hard] This problem was asked by Quora.

    Word sense disambiguation is the problem of determining which sense a word takes on in a particular setting, 
    if that word has multiple meanings. For example, in the sentence "I went to get money from the bank", bank 
    probably means the place where people deposit money, not the land beside a river or lake.

    Suppose you are given a list of meanings for several words, formatted like so:

    {
        "word_1": ["meaning one", "meaning two", ...],
        ...
        "word_n": ["meaning one", "meaning two", ...]
    }
    Given a sentence, most of whose words are contained in the meaning list above, create an algorithm that 
    determines the likely sense of each possibly ambiguous word.
*/

const words = {
    'bank': ['a financial institution where people deposit money', 'land beside a river or lake'],
    'cloud': ['in the sky and produces rain', 'digital place to store electronic files'],
    'flat': ['apartment', 'without affect', 'without significant topographic variance'],
}

const STOPWORDS = new Set(['a', 'in', 'or', 'the', 'and']);

String.prototype.removeAppostraphe = function () {
    const word = this.toString();
    const appostrapheIndex = word.indexOf("'");
    return appostrapheIndex === -1 
        ? word
        : word.substring(0, word.length - 2);
}

String.prototype.removePastTense = function () {
    const word = this.toString();
    return word.endsWith('ed')
        ? word.substring(0, word.length - 2)
        : word;
}

String.prototype.lemontize = function () {
    return String(this)
        .removeAppostraphe()
        .removePastTense()
        .replace(/\./, '');
}

function normalize (sentence) {
    return String(sentence)
        .split(' ')
        .reduce((words, word) => {
            if (!STOPWORDS.has(word)) words.push(String(word).lemontize());
            return words;
        }, []);
}

// Time complexity: O(m + n + b) where m is meaning word count, n is sentence word count, and b is meaning count
// Space complexity: O(m)
// This could be faster by pre-processing the word meanings into mappings of all the words in meanings beforehand, eliminating 'm'
function determineAmbiguousWordFromSentence(sentence, word) {
    if (!words[word]) return 'No definition found for word.';

    // O(m): converts meanings into a word mapping to the meaning indices
    const meaningList = words[word], meaningWordMap = new Map();
    meaningList?.forEach((meaning, i) => {
        const meaningWords = String(meaning).split(' ');
        for (let word of meaningWords) {
            const current = meaningWordMap.get(word);
            meaningWordMap.set(word, current ? `${current},${i}` : `${i}`);
        }
    });

    // O(n)
    const sentenceWords = normalize(sentence);
    const meaningsCount = [];
    for (let word of sentenceWords) {
        const wordStem = String(word).lemontize();
        const meanings = meaningWordMap.get(wordStem)?.split(',');
        meanings?.forEach((index) => {
            meaningsCount[index] = (meaningsCount[index] ?? 0) + 1
        });
    }

    // O(b)
    const topMeaningObj = meaningsCount.reduce((prevObj, count, index) => {
        return prevObj.count > count ? prevObj : { index, count };
    }, { index: 0, count: 0 })
    console.log('topMeaningObj', topMeaningObj);
    return meaningList[topMeaningObj.index];
}

console.log(determineAmbiguousWordFromSentence('John went to the bank today and deposited some money.', 'bank'));
console.log(determineAmbiguousWordFromSentence("John went to the river's bank to fish.", 'bank'));