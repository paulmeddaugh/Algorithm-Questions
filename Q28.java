import java.util.ArrayList;
import java.util.Arrays;

public class Q28 {
    /**
     * Write an algorithm to justify text. Given a sequence of words and an integer line length k, 
     * return a list of strings which represents each line, fully justified.
     * 
     * More specifically, you should have as many words as possible in each line. There should be at 
     * least one space between each word. Pad extra spaces when necessary so that each line has exactly 
     * length k. Spaces should be distributed as equally as possible, with the extra spaces, if any, 
     * distributed starting from the left.
     * 
     * If you can only fit one word on a line, then you should pad the right-hand side with spaces.
     * Each word is guaranteed not to be longer than k.
     * 
     * For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", 
     * "the", "lazy", "dog"] and k = 16, you should return the following:
     * ["the  quick brown", # 1 extra space on the left
     * "fox  jumps  over", # 2 extra spaces distributed evenly
     * "the   lazy   dog"] # 4 extra spaces distributed evenly
     */
    
    public static void main (String[] args) {
        String[] lines = justifyLines(new String[] {"the", "quick", "brown", "fox", "jumps", "over", 
            "the", "lazy", "dog"}, 16);

        for (String line : lines) {
            System.out.println(line);
        }
    }

    public static String[] justifyLines (String[] words, int k) {
        ArrayList<String> lines = new ArrayList<>();

        int wordCount = 0;
        do {
            int lineLength = 0;
            final int wordCountBegin = wordCount;
            
            do {
                if (lineLength != 0) lineLength++; // for the space
                lineLength += words[wordCount++].length();
            } while (wordCount != words.length &&
                     lineLength + words[wordCount].length() < k);

            String line = ""; // type String, anticipating short line lengths

            for (int i = wordCountBegin; i < wordCount; i++) {
                // place spaces
                if (i != wordCountBegin) {
                    int leftover = (k - lineLength);
                    int wordsInLine = (wordCount - wordCountBegin);
                    int spaceCount = (int) Math.ceil(((double) leftover / wordsInLine));
                    for (int j = 0; j < spaceCount; j++) {
                        line += " ";
                        lineLength++;
                    }
                    // the space automatically accounted for
                    line += " ";
                }

                line += words[i];
            }
            
            lines.add(line);

        } while (wordCount < words.length);

        return lines.toArray(new String[lines.size()]);
    }
}