package twothousendnineteen;

import org.eclipse.collections.impl.list.Interval;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DayFour {

    public static void main(String[] args) {
        DayFour dayFour = new DayFour();
        System.out.println("Total number of matching passwords: " + dayFour.solvePartOne());
    }

    long solvePartOne() {
        List<Integer> range = Interval.fromTo(271973, 785961).toList();
        return findNumberOfInuts(range);
    }

    private long findNumberOfInuts(List<Integer> range) {
        return range.stream().filter(this::isValidPassWord).count();
    }

    boolean isValidPassWord(int possiblePass) {
        List<Integer> ints = splitIntoParts(possiblePass);
        Integer prev = ints.get(0);
        Set<Integer> doubles = new HashSet<>();
        int prevDouble = Integer.MAX_VALUE;
        for (int i = 1; i < ints.size(); i++) {
            Integer current = ints.get(i);
            if (prev > current) {
                return false;
            }

            if (prev.equals(current) && current != prevDouble) {
                doubles.add(current);
                prevDouble = current;
            } else if (prev.equals(current)) {
                doubles.remove(current);
            } else {
                prevDouble = Integer.MAX_VALUE;
            }
            prev = current;
        }

        return doubles.size() >= 1;
    }

    List<Integer> splitIntoParts(int possiblePass) {
        return Arrays.asList(
                (possiblePass / 100000) % 10,
                (possiblePass / 10000) % 10,
                (possiblePass / 1000) % 10,
                (possiblePass / 100) % 10,
                (possiblePass / 10) % 10,
                possiblePass % 10);
    }
}
