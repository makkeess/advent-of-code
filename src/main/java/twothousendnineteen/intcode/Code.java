package twothousendnineteen.intcode;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Code {
    ADD("1", 4),
    MULTIPLY("2", 4),
    STORE_AT_ADDRESS("3", 2),
    OUTPUT("4", 2),
    BREAK("99", 0),
    BROKEN("0", 4);

    private final String opCode;
    private final int stepBy;

    Code(String opCode, int stepBy) {
        this.opCode = opCode;
        this.stepBy = stepBy;
    }

    public static Code byOpCode(String code) {
        return Arrays.stream(values())
                .filter(c -> c.getOpCode().equals(code))
                .findFirst()
                .orElse(BROKEN);
    }
}