/**
 * This problem was asked by Google.
 * 
 * You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. Each False boolean represents a tile you can walk on.
 * 
 * Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. If there is no possible path, then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.
 * 
 * For example, given the following board:
 * 
 * [[f, f, f, f],
 * [t, t, f, t],
 * [f, f, f, f],
 * [f, f, f, f]]
 * and start = (3, 0) (y, x; bottom left) and end = (0, 0) (y, x; top left), the minimum number of steps required to reach the end is 7, since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
 *
 * -----------
 *
 * Largely utilized this resource for AStar algorithm: https://www.youtube.com/watch?v=i0x5fj4PqP4
 */
class Q23 {
    static int? FindMinimumNumberOfStepsForPath(bool[][] board, int startX, int startY, int endX, int endY) {
        var aStar = new AStar(board);
        var path = aStar.FindPath(startX, startY, endX, endY);
        aStar.VisualizePath(path);
        return path?.Count;
    }
    static void Main (string[] args) {
        Console.WriteLine(FindMinimumNumberOfStepsForPath(
            [[false, false, false, false],
            [true, true, false, true],
            [false, false, false, false],
            [false, false, false, false]],
            0, 3, // start (x, y)
            0, 0 // end (x, y)
        ));

        Console.WriteLine(FindMinimumNumberOfStepsForPath(
            [[false, true, false, false],
            [false, true, true, false],
            [false, true, false, false],
            [false, false, false, true]],
            0, 0, // start (x, y)
            2, 0 // end (x, y)
        ));
    }
}
