package twothousendnineteen;

import java.io.IOException;
import java.util.List;

import static utils.FileReader.readLines;

public class DayOne {

    public static void main(String[] args) throws IOException {
        DayOne dayOne = new DayOne();
        int fuelRequirement = dayOne.solvePartOne();
        System.out.println("The fuel requirement of day one part one is :: " + fuelRequirement);

        int adjustedFuelRequirement = dayOne.solvePartTwo();
        System.out.println("The fuel requirement of day one part two is :: " + adjustedFuelRequirement);
    }

    private int solvePartOne() throws IOException {
        List<String> input = readLines(getClass().getClassLoader(), "dayOne/input.txt");

        return input.stream()
                .map(Integer::valueOf)
                .mapToInt(this::calculateRequiredFuel)
                .sum();
    }

    public int solvePartTwo() throws IOException {
        List<String> input = readLines(getClass().getClassLoader(), "dayOne/input.txt");
        return input.stream()
                .map(Integer::valueOf)
                .mapToInt(this::calculateFuelRequirementPartTwo)
                .sum();
    }

    public int calculateFuelRequirementPartTwo(int mass) {
        int fuelReq = calculateRequiredFuel(mass);
        return fuelReq + resolveFuelRequirement(fuelReq);
    }

    private int resolveFuelRequirement(int mass) {
        return resolveFuelRequirement(mass, true);
    }

    private int resolveFuelRequirement(int mass, boolean first) {
        int reqFuel = calculateRequiredFuel(mass);
        if (reqFuel <= 0) {
            return mass;
        }

        if (first) {
            return resolveFuelRequirement(reqFuel, false);
        }

        return mass + resolveFuelRequirement(reqFuel, false);
    }

    private int calculateRequiredFuel(Integer mass) {
        return (int) Math.floor(mass / 3) - 2;
    }
}
