namespace AStarAlgorithm;

class NodeBaseBoard(bool[][] board)
{
    public bool[][] OriginalBoard { get; private set; } = board;
    public NodeBase[,] NBBoard { get; private set; } = ConvertBoolBoard(board);

    public static NodeBase[,] ConvertBoolBoard (bool[][] board) {
        int rows = board.Length;
        int cols = board[0].Length;
        var nbBoard = new NodeBase[rows, cols];

        // convert units to NodeBase units
        for (int x = 0; x < rows; x++) {
            for (int y = 0; y < cols; y++) {
                // initialize unit
                var newNode = nbBoard[y, x] = new NodeBase(x, y, board[y][x]);

                // add neighbors to unit
                var northNeighbor = GetNodeBaseAt(nbBoard, x, y - 1);
                var westNeighbor = GetNodeBaseAt(nbBoard, x - 1, y);
                var initialNeighbors = new List<NodeBase>() { northNeighbor, westNeighbor };
                foreach (var neighbor in initialNeighbors) {
                    if (neighbor == null) continue;
                    neighbor.Neighbors.Add(newNode);
                    newNode.Neighbors.Add(neighbor);
                }
            }
        }

        return nbBoard;
    }

    public static NodeBase? GetNodeBaseAt(NodeBase[,] nbBoard, int x, int y) {
        try {
            return nbBoard[y, x];
        } catch (IndexOutOfRangeException) {
            return null;
        }
    }
    public NodeBase? GetNodeBaseAt(int x, int y) {
        return GetNodeBaseAt(NBBoard, x, y);
    }

    public IEnumerable<NodeBase> GetRow(int y) {
        int rows = board[0].Length;
        for (int x = 0; x < rows; x++) {
            yield return NBBoard[y, x];
        }
    }

    public void Print() {
        int cols = board.Length;
        for (int y = 0; y < cols; y++) {
            Console.WriteLine("[{0}]", string.Join(", ", GetRow(y)));
        }
    }

    public void VisualizePath (List<NodeBase> path) {
        int rows = board.Length;
        int cols = board[0].Length;
        string[][] visualBoard = new string[rows][];

        // original board charting
        for (int y = 0; y < cols; y++) {
            visualBoard[y] = new string[cols];
            for (int x = 0; x < rows; x++) {
                visualBoard[y][x] = board[y][x] ? "-" : " ";
            }
        }

        // path charting
        foreach (NodeBase node in path) {
            visualBoard[node.Y][node.X] = "X";
        }

        // print visual board
        for (int y = 0; y < cols; y++) {
            Console.WriteLine("[{0}]", string.Join(",", visualBoard[y]));
        }
    }
}