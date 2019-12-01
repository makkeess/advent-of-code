package twothousendnineteen;


import org.junit.jupiter.api.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class DayOneTest {

    @Test
    void day_one_part_two_should_calculate_corretly() {
        DayOne dayOne = new DayOne();
        int req = dayOne.calculateFuelRequirementPartTwo(100756);
        assertThat(req, is(equalTo(50346)));
    }
}