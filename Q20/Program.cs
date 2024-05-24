/**
 * This problem was asked by Google.
 * 
 * Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.
 * 
 * For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.
 * 
 * In this example, assume nodes with the same value are the exact same node objects.
 * 
 * Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.
*/
namespace Example
{
    class Program
    {
        // Finds the intersecting node within two linked lists in O(M + N) time.
        // Returns the intersecting node value if found, and null if not found.
        static int? FindIntersectingNode (LinkedList<int> list1, LinkedList<int> list2) 
        {
            Dictionary < int, int > list1Map = new Dictionary < int, int > ();

            // O(M): builds dictionary from list1
            int index = 0;
            foreach(int node in list1)
            {
                list1Map.Add(node, index++);
            }

            // O(N): finds list2 node in dictionary
            foreach(int node in list2)
            {
                if (list1Map.ContainsKey(node) == true) {
                    return node;
                }
            }

            return null;
        }

        static void Main(string[] args)
        {
            LinkedList<int> linkedList1 = new LinkedList<int>();
            linkedList1.AddLast(3);
            linkedList1.AddLast(7);
            linkedList1.AddLast(8);
            linkedList1.AddLast(10);

            LinkedList<int> linkedList2 = new LinkedList<int>();
            linkedList2.AddLast(99);
            linkedList2.AddLast(1);
            linkedList2.AddLast(8);
            linkedList2.AddLast(10);

            Console.WriteLine(FindIntersectingNode(linkedList1, linkedList2));
        }
    }
}
