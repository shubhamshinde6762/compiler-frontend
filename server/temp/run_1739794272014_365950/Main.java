import java.util.*;

class TwoSum {
    private Map<Integer, Integer> freq = new HashMap<>();

    public void add(int number) {
        freq.put(number, freq.getOrDefault(number, 0) + 1);
    }

    public boolean find(int value) {
        for (int num : freq.keySet()) {
            int complement = value - num;
            if ((complement != num && freq.containsKey(complement)) || (complement == num && freq.get(num) > 1)) {
                return true;
            }
        }
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int T = Integer.parseInt(scanner.nextLine());

        for (int t = 0; t < T; t++) {
            String caseName = scanner.nextLine();
            System.out.println(caseName);
            int n = Integer.parseInt(scanner.nextLine());
            TwoSum ts = new TwoSum();
            String[] operations = scanner.nextLine().split(" ");
            StringBuilder output = new StringBuilder();

            for (String op : operations) {
                if (op.startsWith("add(")) {
                    int x = Integer.parseInt(op.substring(4, op.length() - 1));
                    ts.add(x);
                    output.append("null ");
                } else if (op.startsWith("find(")) {
                    int x = Integer.parseInt(op.substring(5, op.length() - 1));
                    output.append(ts.find(x) ? "true " : "false ");
                }
            }
            System.out.println(output.toString());
        }
        scanner.close();
    }
}