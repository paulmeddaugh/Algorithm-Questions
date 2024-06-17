/*
 * This problem was asked by Google.
 * 
 * Implement locking in a binary tree. A binary tree node can be locked or unlocked only if all of its descendants or ancestors are not locked.
 * 
 * Design a binary tree node class with the following methods:
 * 
 * is_locked, which returns whether the node is locked
 * lock, which attempts to lock the node. If it cannot be locked, then it should return false. Otherwise, it should lock it and return true.
 * unlock, which unlocks the node. If it cannot be unlocked, then it should return false. Otherwise, it should unlock it and return true.
 * You may augment the node to add parent pointers or any other property you would like. You may assume the class is used in a single-threaded program, 
 * so there is no need for actual locks or mutexes. Each method should run in O(h), where h is the height of the tree.
 */

class Q24 {
    public static void Main (string[] args) {
        BinaryTree bt = new([19, 3, 12, 24, 1, 8, 20, 40]);
        bt.Lock(12);
        bt.Lock(8);
        bt.Unlock(8);
        // bt.PrintTree();

        BinaryTree bt2 = new([60, 12, 92, 29, 4, 128, 50, 52, 91, 3, 28, 35, 10, 84]);
        bt2.Lock(92);
        bt2.Lock(50);
        Console.WriteLine($"92 locked: {bt2.IsLocked(92)}");
        Console.WriteLine($"50 locked: {bt2.IsLocked(50)}");
        Console.WriteLine($"52 locked: {bt2.IsLocked(52)}");
        bt2.Unlock(50);
        bt2.PrintTree();
    }
}