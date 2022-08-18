import java.util.Stack;

public class Q27 {

    /**
     * Given a string of round, curly, and square open and closing brackets, return whether the 
     * brackets are balanced (well-formed).
     * 
     * For example, given the string "([])[]({})", you should return true.
     * Given the string "([)]" or "((()", you should return false.
     */

    public static void main (String[] args) {
        System.out.println(wellFormedBrackets("([])[]({})"));
    }

    /**
     * Time complexity - O(n), Space complexity - O(n / 2)
     * 
     * @param s the String with brackets to validate.
     * @return a boolean of true or false.
     */
    public static boolean wellFormedBrackets(String s) {
        Stack<Character> brackets = new Stack<>();

        for (char c : s.toCharArray()) {
            switch (c) {
                case '(': 
                case '{':
                case '[':
                    brackets.add(c); break;
                case ')':
                    if (brackets.pop() != '(') return false; break;
                case '}':
                    if (brackets.pop() != '{') return false; break;
                case ']':
                    if (brackets.pop() != '[') return false; break;
            }
        }

        return true;
    }
}