public class Q2 {
    public static void main(String[] args) {
        
        /** Question: From an array of integers, return an array of integers with the product of 
         * every index in the original array excluding the current index, i.e., [1, 2, 3, 4, 5] -> 
         * [120, 60, 40, 30, 24]
         */

        int[] array = {1, 2, 3, 4, 5};
        int[] prods = withoutDivision(array);

        for (int i : prods) {
            System.out.println(i);
        }
    }

    
    public static int[] withDivision(int[] array) {
        // O(2n)
        int productTotal = 1;
        for (int i : array) {
            productTotal *= i;
        }

        int[] products = new int[array.length];
        for (int i = 0; i < array.length; i++) {
            products[i] = productTotal / array[i];
        }

        return products;
    }

    /**
     * Time complexity: O(n)
     * Space complexity O(1)
     * Determines the products by first storing the products on the left of the index at the index
     * that is excluded. It then sweeps from end to beginning to determine the product of indices on
     * the right, determining the answers as it iterates through.
     * 
     * @param arr The array of integers to determine the products of every index except itself
     * @return An array of integers with the product of all indices except the original array's index value.
     */
    public static int[] withoutDivision (int[] arr) {

        // Base case
        if (arr.length == 1) {
            return new int[] {0};
        }
        
        int prod[] = new int[arr.length];
        // Initialize first index to 1, as no ele
        prod[0] = 1;
 
        /* Determines the product of every number on the left of the index to calculate,
         * offset to be at the index excluded. */
        for (int i = 1; i < arr.length; i++)
            prod[i] = arr[i - 1] * prod[i - 1];
 
        /* Keeps a running total the products of every number on the right of the index to calculate,
         * offset to be at the index excluded, and determines answer. */
        int rightProd = 1;
        for (int j = arr.length - 2; j >= 0; j--) {
            rightProd *= arr[j + 1];
            prod[j] = prod[j] * rightProd;
        }

        return prod;
    }

}
