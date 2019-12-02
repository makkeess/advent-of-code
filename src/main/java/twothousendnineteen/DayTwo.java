package twothousendnineteen;

import utils.FileReader;

import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class DayTwo {

    public static void main(String[] args) throws IOException {
        DayTwo dayTwo = new DayTwo();
        String fileContent = FileReader.readFileAsString(dayTwo.getClassLoader(), "dayTwo/input.txt");

        int[] baseMemory = Arrays.stream(fileContent.split(","))
                .map(String::trim)
                .mapToInt(Integer::parseInt)
                .toArray();


        int resPartOne = dayTwo.solvePartOne(Arrays.copyOf(baseMemory, baseMemory.length), 12, 2);
        System.out.println("ResPartOne, value in place zero: " + resPartOne);

        int answer = dayTwo.solveDayOnePartTwo(Arrays.copyOf(baseMemory, baseMemory.length));
        System.out.println("The answer for part two is: " + answer);
    }

    public ClassLoader getClassLoader() {
        return getClass().getClassLoader();
    }

    public int solveDayOnePartTwo(int[] input) {
        final int expected = 19690720;
        for (int noun = 0; noun < 99; noun++) {
            for (int verb = 0; verb < 99; verb++) {
                if (expected == solvePartOne(input, noun, verb)) {
                    return 100 * noun + verb;
                }
            }
        }
        return 0;
    }

    public int solvePartOne(int[] inp, int noun, int verb) {
        int[] input = Arrays.copyOf(inp, inp.length);

        int[] counters = new int[] {0,1,2,3};
        input[1] = noun;
        input[2] = verb;


        int stepBy = 4;
        for (int i = 0; i < input.length; i+= stepBy) {
            int op = input[counters[0]];
            if (op == 99) {
                break;
            }
            int pos = input[counters[3]];

            int valOne = input[input[counters[1]]];
            int valTwo = input[input[counters[2]]];
            if (1 == op) {
                input[pos] = valOne + valTwo;
            } else if (2 == op) {
                input[pos] = valOne * valTwo;
            }

            counters[0] += 4;
            counters[1] += 4;
            counters[2] += 4;
            counters[3] += 4;
        }

        return input[0];
    }
}
