package twothousendnineteen;

import org.junit.jupiter.api.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

class DayThreeTest {

    @Test
    void test() {
        DayThree dayThree = new DayThree();

        String[] first = "R8,U5,L5,D3".split(",");
        String[] second = "U7,R6,D4,L4".split(",");
        double distance = dayThree.solvePartOne(first, second);
        assertThat(distance, is(equalTo(6D)));

        first = "R75,D30,R83,U83,L12,D49,R71,U7,L72".split(",");
        second = "U62,R66,U55,R34,D71,R55,D58,R83".split(",");
        distance = dayThree.solvePartOne(first, second);
        assertThat(distance, is(equalTo(159D)));

        first = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51".split(",");
        second = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7".split(",");
        distance = dayThree.solvePartOne(first, second);
        assertThat(distance, is(equalTo(135D)));

    }
}