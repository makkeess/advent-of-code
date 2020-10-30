package twothousendnineteen;

import java.io.IOException;
import java.util.Arrays;

public class DayTwo extends FileInputProblem {

    public static void main(String[] args) throws IOException {
        DayTwo dayTwo = new DayTwo();
        String input = dayTwo.readFileContent("dayTwo/input.txt");

        String[] baseMemory = input.split(",");
        IntcodeComputer comp = new IntcodeComputer();

        String resPartOne = comp.solveWithReplacement(Arrays.copyOf(baseMemory, baseMemory.length), "12", "2");
        System.out.println("ResPartOne, value in place zero: " + resPartOne);

        int answer = dayTwo.solveDayTwoPartTwo(Arrays.copyOf(baseMemory, baseMemory.length));
        System.out.println("The answer for part two is: " + answer);
    }

    public int solveDayTwoPartTwo(String[] input) {
        final String expected = "19690720";
        IntcodeComputer comp = new IntcodeComputer();
        for (int noun = 0; noun < 99; noun++) {
            for (int verb = 0; verb < 99; verb++) {
                if (expected.equals(comp.solveWithReplacement(input, String.valueOf(noun), String.valueOf(verb)))) {
                    return 100 * noun + verb;
                }
            }
        }
        return 0;
    }
}