package twothousendnineteen.intcode;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class IntcodeComputerTest {

    @ParameterizedTest
    @ValueSource(strings = {"1", "01", "101", "001", "1101", "01101"})
    void determineCode_should_work_with_any_input_sixe(String input) {
        Code code = new IntcodeComputer().determineCode(input);
        assertEquals(Code.ADD, code);
    }

    @Test
    void should_handle_BREAK_code() {
        Code code = new IntcodeComputer().determineCode("99");
        assertEquals(Code.BREAK, code);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1", "01"})
    @NullAndEmptySource
    void determineMode_should_handle_only_ops_or_empty(String inp) {
        int[] ints = new IntcodeComputer().determineMode(inp);
        assertEquals(ints.length, 3);
        assertEquals(ints[0], 0);
        assertEquals(ints[1], 0);
        assertEquals(ints[2], 0);
    }

    @Test
    void determineMode_should_set_correct_values_with_size_three() {
        int[] ints = new IntcodeComputer().determineMode("101");
        assertEquals(ints.length, 3);
        assertEquals(ints[0], 0);
        assertEquals(ints[1], 0);
        assertEquals(ints[2], 1);
    }

    @Test
    void determineMode_should_set_correct_values_with_size_four() {
        int[] ints = new IntcodeComputer().determineMode("1001");
        assertEquals(ints.length, 3);
        assertEquals(ints[0], 0);
        assertEquals(ints[1], 1);
        assertEquals(ints[2], 0);
    }

    @Test
    void determineMode_should_set_correct_values_with_size_five() {
        int[] ints = new IntcodeComputer().determineMode("11001");
        assertEquals(ints.length, 3);
        assertEquals(ints[0], 1);
        assertEquals(ints[1], 1);
        assertEquals(ints[2], 0);
    }
}