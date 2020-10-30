package twothousendnineteen;

import java.util.Arrays;

public class IntcodeComputer {

    public static final String BREAK_CODE = "99";
    public static final String ADD_CODE = "1";
    public static final String MULTIPLICATION_CODE = "2";
    public static final String STORE_AT_ADDRESS = "3";
    public static final String OUTPUT = "4";

    public String solveWithReplacement(String[] inp, String noun, String verb) {
        String[] input = Arrays.copyOf(inp, inp.length);
        input[1] = noun;
        input[2] = verb;
        return solve(input);
    }

    private String solve(String[] input) {
        int idxCount = 0, stepBy = 4;
        boolean running = true;
        while (running) {
            String opCode = input[idxCount];
            int pos = Integer.parseInt(input[idxCount + 3]);
            int valOne = Integer.parseInt(input[Integer.parseInt(input[idxCount + 1])]);
            int valTwo = Integer.parseInt(input[Integer.parseInt(input[idxCount + 2])]);

            switch (opCode) {
                case BREAK_CODE -> running = false;
                case ADD_CODE -> input[pos] = String.valueOf(valOne + valTwo);
                case MULTIPLICATION_CODE -> input[pos] = String.valueOf(valOne * valTwo);
                case STORE_AT_ADDRESS -> input[valTwo - 1] = String.valueOf(valOne);
                case OUTPUT -> System.out.printf("Output OP, value=%s%n", input[valTwo - 1]);
            }
            idxCount += stepBy;
            if (idxCount > input.length) {
                running = false;
            }
        }
        return input[0];
    }
}
