import java.util.Arrays;

public class Q4 {
    public static void main(String[] args) {
        /* Question: Given an array of integers, find the first missing positive 
        integer in linear time and constant space. In other words, find the lowest 
        positive integer that does not exist in the array. The array can contain 
        duplicates and negative numbers as well.

        For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] 
        should give 3. You can modify the input array in-place. */


        // int[] array = {-2, -1, 0};
        // System.out.println(findNextPositive(array));
        // array = new int[] {3, 4, -1, 1};
        // System.out.println(findNextPositive(array));
        // array = new int[] {7, 8, 9, 10, 11};
        // System.out.println(findNextPositive(array));

        System.out.println(findLowestPositiveWithPositives(new int[] {5, 2, 4, 1}));
    }

    public static int findNextPositive(int[] array) {
        // O(n logn + n)
        mergeSort(array);

        // O(n logn + n)
        int num = 0;
        for (int i : array) {
            if (i >= num) {
                if (i != ++num) {
                    return num;
                }
            }
        }
        return 0;
    }

    // Uses the boolean idea to mark the positive integers included at that value's array index, marked 
    // with a negative sign, as, within an array of all positive numbers, positive[0] should equal 1, 
    // positive[1] should equal 2, positive[2] = 3, etc. if all positive numbers are there. It also diregards
    // the values greater than positive.length, allowing lesser space complexity
    public static int findLowestPositiveWithPositives(int[] positives) {
        int size = positives.length;

        for (int i = 0; i < positives.length; i++) {
            int x = Math.abs(positives[i]);
            if (x - 1 < size && positives[x - 1] > 0)
            positives[x - 1] = -positives[x - 1];
        }

        // Finds the first index not marked (that's positive)
        int i;
        for (i = 1; i < positives.length; i++) {
            if (positives[i - 1] >= 1) {
                return i;
            }
        }

        return i;
    }

    public static void mergeSort(int[] array) {
        mergeSort(0, array.length - 1, array);
    }

    public static void mergeSort(int low, int high, int[] array) {
        if (high - low != 0) {
            int low1 = low;
            int high1 = low + (high - low) / 2;
            mergeSort(low1, high1, array);

            int low2 = high1 + 1;
            int high2 = high;
            mergeSort(low2, high2, array);

            mergeSort(low1, high1, low2, high2, array);
        }
    }

    public static void mergeSort(int low1, int high1, int low2, int high2, int[] array) {
        int listIndex = low1;
        int[] temp = new int[high2 - low1 + 1];
        int tempIndex = 0;

        while (low1 <= high1 && low2 <= high2) {
            if (array[low1] < array[low2]) {
                temp[tempIndex++] = array[low1++];
            } else {
                temp[tempIndex++] = array[low2++];
            }
        }

        while (low1 <= high1) {
            temp[tempIndex++] = array[low1++];
        }

        while (low2 <= high2) {
            temp[tempIndex++] = array[low2++];
        }

        for (int i : temp) {
            array[listIndex++] = i;
        }


    }
}