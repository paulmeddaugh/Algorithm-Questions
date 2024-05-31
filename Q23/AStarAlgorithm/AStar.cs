using AStarAlgorithm;

class AStar(bool[][] board)
{
    readonly NodeBaseBoard NBBoard = new(board);
    public List<NodeBase> FindPath(int startX, int startY, int endX, int endY) {

        var startNode = NBBoard.GetNodeBaseAt(startX, startY) 
            ?? throw new Exception("Starting position must be a coordinate on the board.");
        var targetNode = NBBoard.GetNodeBaseAt(endX, endY)
            ?? throw new Exception("Target position must be a coordinate on the board.");

        var toSearch = new List<NodeBase>() { startNode };
        var processed = new List<NodeBase>();

        while (toSearch.Count > 0) {
            var current = toSearch[0];
            foreach (var t in toSearch) {
                if (t.F < current.F || t.F == current.F && t.H < current.H) {
                    current = t;
                }
            }

            processed.Add(current);
            toSearch.Remove(current);

            // path found
            if (current == targetNode) {
                var currentPathTile = targetNode;
                var path = new List<NodeBase>();
                while (currentPathTile != startNode) {
                    path.Add(currentPathTile);
                    currentPathTile = currentPathTile.Connection;
                }

                return path;
            } 

            // checks neighbors of current node for next step
            foreach (var neighbor in current.Neighbors.Where(t => !t.IsWall && !processed.Contains(t))) {
                var inSearch = toSearch.Contains(neighbor);
                
                var costToNeighbor = current.G + current.GetDistance(neighbor);

                if (!inSearch || costToNeighbor < neighbor.G) {
                    // updates G cast based on the current node's G cast (with lowest F and H cast)
                    neighbor.SetG(costToNeighbor);
                    neighbor.SetConnection(current);

                    if (!inSearch) {
                        neighbor.SetH(neighbor.GetDistance(targetNode));
                        toSearch.Add(neighbor);
                    }
                }
            }
        }

        return null;
    }

    public void PrintBoard() {
        NBBoard.Print();
    }

    public void VisualizePath (List<NodeBase> path) {
        NBBoard.VisualizePath(path);
    }
}