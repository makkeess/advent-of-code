package twothousendnineteen;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

class DayFourTest {

    @Test
    void isValidPassWord() {
        DayFour dayFour = new DayFour();
        assertThat(dayFour.isValidPassWord(223344), is(true));
        assertThat(dayFour.isValidPassWord(111122), is(true));
        assertThat(dayFour.isValidPassWord(222344), is(true));
        assertThat(dayFour.isValidPassWord(223450), is(false));
        assertThat(dayFour.isValidPassWord(123789), is(false));
        assertThat(dayFour.isValidPassWord(123444), is(false));
    }

    @Test
    void splitIntoPartsDoItRight() {
        DayFour dayFour = new DayFour();
        List<Integer> integers = dayFour.splitIntoParts(123456);
        assertThat(integers, is(equalTo(Arrays.asList(1,2,3,4,5,6))));

    }
}