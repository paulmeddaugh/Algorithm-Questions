namespace BinaryTreeStructure;
class Node (int id) {
    public int Id { get; private set; } = id;
    public bool IsLocked { get; set; } = false;
    public bool IsLockable { get; set; } = true;
    public Node? ParentNode { get; private set; }
    public Node? LeftNode { get; private set; }
    public Node? RightNode { get; private set; }

    public void SetLeftNode (Node? node) => LeftNode = node;
    public void SetRightNode (Node? node) => RightNode = node;
    public void SetParentNode (Node? node) => ParentNode = node;

    override public string ToString () {
        return $"{id}";
    }
}