namespace AStarAlgorithm;
public class NodeBase(int x, int y, bool isWall)
{
    public int X { get; private set; } = x;
    public int Y { get; private set; } = y;
    public bool IsWall { get; private set; } = isWall;

    public List<NodeBase> Neighbors { get; protected set; } = [];
    public float G { get; private set; }
    public float H { get; private set; }
    public float F => G + H;
    public NodeBase? Connection { get; private set; }

    public void SetG(float g) => G = g;
    public void SetH(float h) => H = h;
    public void SetNeighbors (List<NodeBase> neighbors) => Neighbors = neighbors;
    public void SetConnection(NodeBase nodeBase) => Connection = nodeBase;

    public int GetDistance (NodeBase node) {
        return Math.Abs(node.X - X) + Math.Abs(node.Y - Y);
    }

    public bool AtSamePlace(NodeBase node) {
        return X == node.X && Y == node.Y;
    }

    override public string ToString() {
        return $"Nodebase({X}, {Y}, {IsWall})";
    }
}