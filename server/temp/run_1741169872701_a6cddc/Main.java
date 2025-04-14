import java.util.Scanner;

class Reader4 {
    private static String fileContent;
    private static int filePointer;

    public static void setFile(String content) {
        fileContent = content;
        filePointer = 0;
    }

    public static int read4(char[] buf4) {
        int i = 0;
        while (i < 4 && filePointer < fileContent.length()) {
            buf4[i++] = fileContent.charAt(filePointer++);
        }
        return i;
    }
}

class Solution {
    /**
     * @param buf Destination buffer
     * @param n   Number of characters to read
     * @return    The number of actual characters read
     */
    public int read(char[] buf, int n) {
        int copiedChars = 0;
        int readChars = 4;
        int remainingChars = n;

        while (remainingChars >= 4 && readChars == 4) {
            char[] buf4 = new char[4];
            readChars = Reader4.read4(buf4);
            System.arraycopy(buf4, 0, buf, copiedChars, readChars);
            copiedChars += readChars;
            remainingChars -= readChars;
        }

        if (remainingChars > 0 && readChars > 0) {
            char[] buf4 = new char[4];
            readChars = Reader4.read4(buf4);
            System.arraycopy(buf4, 0, buf, copiedChars, Math.min(remainingChars, readChars));
            copiedChars += Math.min(remainingChars, readChars);
        }

        return Math.min(n, copiedChars);
    }
}

public class Main {  // Ensure file name matches: Read4Driver.java
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        sc.nextLine(); 

        for (int t = 1; t <= T; t++) {
            String testCase = sc.nextLine();
            System.out.println(testCase);
            
            String fileContent = sc.nextLine();
            int n = sc.nextInt();
            sc.nextLine();

            Reader4.setFile(fileContent);
            Solution solution = new Solution();
            char[] buf = new char[1000];
            int charsRead = solution.read(buf, n);

            System.out.println(charsRead);
            System.out.println(new String(buf, 0, charsRead));
        }
        sc.close();
    }
}