package twothousendnineteen.intcode;


import java.util.Arrays;
import java.util.Objects;

import static twothousendnineteen.intcode.Code.BROKEN;
import static twothousendnineteen.intcode.Code.OUTPUT;

public class IntcodeComputer {

    public String solveWithReplacement(String[] inp, String noun, String verb) {
        String[] input = Arrays.copyOf(inp, inp.length);
        input[1] = noun;
        input[2] = verb;
        return solve(input);
    }

    public String solve(String[] input) {
        int idxCount = 0;
        boolean running = true;
        while (running) {
            String instruction = input[idxCount];
            Code code = determineCode(instruction);
            int[] modes = determineMode(instruction);


            int valOne = modes[2] == 0 ?
                    Integer.parseInt(input[Integer.parseInt(input[idxCount + 1])]) : Integer.parseInt(input[idxCount + 1]);

            if (OUTPUT.equals(code)) {
                System.out.printf("Output OP, value=%s%n", valOne);
            } else {
                int pos = Integer.parseInt(input[idxCount + 3]);
                int valTwo = modes[1] == 0 ?
                        Integer.parseInt(input[Integer.parseInt(input[idxCount + 2])]) : Integer.parseInt(input[idxCount + 1]);

                switch (code) {
                    case BREAK -> running = false;
                    case ADD -> input[pos] = String.valueOf(valOne + valTwo);
                    case MULTIPLY -> input[pos] = String.valueOf(valOne * valTwo);
                    case STORE_AT_ADDRESS -> input[valOne] = String.valueOf(valOne);
                }
            }
            idxCount += code.getStepBy();
            if (idxCount > input.length) {
                running = false;
            }
        }
        return input[0];
    }

    public int[] determineMode(String instruction) {
        if (Objects.isNull(instruction) || instruction.length() <= 2) {
            return new int[]{0, 0, 0};
        }

        while (instruction.length() < 5) {
            instruction = "0" + instruction;
        }

        return Arrays.stream(instruction.substring(0, instruction.length() - 2).split(""))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    public Code determineCode(String instruction) {
        if (Objects.isNull(instruction) || instruction.length() == 0) {
            return BROKEN;
        }
        if (instruction.length() >= 2) {
            String instr = instruction.substring(instruction.length() - 2);
            String opCode = instr.startsWith("0") ? instr.substring(1) : instr;
            return Code.byOpCode(opCode);
        }
        return Code.byOpCode(instruction);
    }
}
