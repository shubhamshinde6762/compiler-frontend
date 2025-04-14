import java.util.*;

class Solution {
    public List<int[]> findRLEArray(int[][] encoded1, int[][] encoded2) {
        int sz1 = encoded1.length, sz2 = encoded2.length;
        int i = 0, j = 0;
        List<int[]> output = new ArrayList<>();
        
        while (i < sz1 && j < sz2) {
            int freq = Math.min(encoded1[i][1], encoded2[j][1]);
            int val = encoded1[i][0] * encoded2[j][0];
            encoded1[i][1] -= freq;
            encoded2[j][1] -= freq;
            
            if (!output.isEmpty() && val == output.get(output.size() - 1)[0]) {
                output.get(output.size() - 1)[1] += freq;
            } else {
                output.add(new int[]{val, freq});
            }
            
            if (encoded1[i][1] == 0) i++;
            if (encoded2[j][1] == 0) j++;
        }
        
        return output;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        
        while (t-- > 0) {
            String tc = sc.next();
            System.out.println(tc);
            
            int n = sc.nextInt(), sz = sc.nextInt();
            int[][] encoded1 = new int[n][2];
            for (int i = 0; i < n; i++) {
                encoded1[i][0] = sc.nextInt();
                encoded1[i][1] = sc.nextInt();
            }
            
            int m = sc.nextInt();
            sz = sc.nextInt();
            int[][] encoded2 = new int[m][2];
            for (int i = 0; i < m; i++) {
                encoded2[i][0] = sc.nextInt();
                encoded2[i][1] = sc.nextInt();
            }
            
            Solution obj = new Solution();
            List<int[]> res = obj.findRLEArray(encoded1, encoded2);
            
            for (int[] row : res) {
                System.out.print(row[0] + " " + row[1] + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}