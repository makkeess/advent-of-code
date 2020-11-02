package twothousendnineteen;

import twothousendnineteen.intcode.IntcodeComputer;

import java.io.IOException;
import java.util.Arrays;

public class DayFive extends FileInputProblem {

    public static void main(String[] args) throws IOException {
        new DayFive().solve();
    }

    void solve() throws IOException {
        String[] baseMemory = readFileContent("dayFive/input.txt").split(",");
        IntcodeComputer comp = new IntcodeComputer();

        String diagnosticCode = comp.solve(Arrays.copyOf(baseMemory, baseMemory.length));
        System.out.printf("Resulting diagnostic code is: %s", diagnosticCode);
    }


}
