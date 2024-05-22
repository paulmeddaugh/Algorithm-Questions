/**
 * 
 * This problem was asked by Google.
 * 
 * Suppose we represent our file system by a string in the following manner:
 * 
 * The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:
 * 
 * dir
 *     subdir1
 *     subdir2
 *         file.ext
 * The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.
 * 
 * The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
 * 
 * dir
 *     subdir1
 *         file1.ext
 *         subsubdir1
 *     subdir2
 *         subsubdir2
 *             file2.ext
 * The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.
 * 
 * We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).
 * 
 * Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.
 * 
 * Note:
 * 
 * The name of a file contains at least a period and an extension.
 * 
 * The name of a directory or sub-directory will not contain a period.
 * 
 */

function getLongestFilePathInDirectory (fileSystemStr) {
    if (typeof fileSystemStr !== 'string') {
        throw new Error('the file system must be represented in a string formatted like "dir\\n\\tsubdir1"');
    }

    let currentDir = '';
    let currentLevel = -1;
    let longestFilePathLength = 0;

    let prevLineIndex = 0, newLineIndex = 0;
    while ((newLineIndex = getNextPathIndex(fileSystemStr, newLineIndex)) !== null) {
        const tabLevel = getTabLevelOfPath(fileSystemStr, prevLineIndex);
        const isFile = isAFile(fileSystemStr, prevLineIndex, newLineIndex);
        const name = getFileOrFolderName(fileSystemStr, prevLineIndex, newLineIndex, tabLevel);
        
        currentDir = ((tabLevel > currentLevel) 
            ? currentDir 
            : decreaseDirectoryLevelBy(currentDir, currentLevel - tabLevel)
        ) + (!isFile ? `${name}/` : '');

        currentLevel = tabLevel + (!isFile ? 1 : 0);

        if (isFile) {
            const filePath = `${currentDir}${name}`;
            if (filePath.length > longestFilePathLength) {
                console.log('found longer', filePath);
                longestFilePathLength = filePath.length;
            }
        }

        prevLineIndex = newLineIndex;
    }

    return longestFilePathLength;
}

function decreaseDirectoryLevelBy (currentDir, level) {
    let index = currentDir.length - 1;
    // finds previous '/' however many levels to decrease
    while (level-- > 0) {
        index = String(currentDir).lastIndexOf('/', index - 1);
    }
    return currentDir.substring(0, index + 1);
}

function isAFile (fileSystemStr, startingPathIndex, endingPathIndex) {
    return fileSystemStr
        .substring(startingPathIndex, endingPathIndex)
        .slice(-4)
        .includes('.');
}

function getFileOrFolderName (fileSystemStr, startingPathIndex, endingPathIndex, level) {
    const startsWithSlash = startingPathIndex !== 0;
    return fileSystemStr.slice(startingPathIndex + level + (startsWithSlash ? 1 : 0), endingPathIndex);
}

function getTabLevelOfPath (fileSystemStr, startingPathIndex) {
    let level = 0;
    while (fileSystemStr.charAt(startingPathIndex + 1 + level) === '\t') {
        level++;
    }
    return level;
}

/**
 * Determines the index for the next path. This will return the fileSystemStr length if no more '\n' are found
 * and null if the starting index equals the fileSystemStr length or greater.
 * 
 * @param {*} fileSystemStr The entire file system string.
 * @param {*} startingIndex The position to start searching from.
 * @returns the index of the next '\n' character, the fileSystemStr length if none are found, and null if searching 
 * at or greater than the fileSystemStr length.
 */
function getNextPathIndex (fileSystemStr, startingIndex) {
    if (startingIndex >= fileSystemStr.length) {
        return null;
    }
    const index = fileSystemStr.indexOf('\n', startingIndex + 1);
    return index === -1
        ? fileSystemStr.length
        : index;
}

const paths = [
    'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext',
    'dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext',
    'dir\n\tsubdir1\n\t\tsubsubdir\n\t\t\tsubsubsubdir\n\t\thowyousay\n\tnosweat'
];

for (let path of paths) {
    console.log('path', path);
    console.log(getLongestFilePathInDirectory(path));
}