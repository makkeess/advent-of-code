package utils;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

public class FileReader {
    public static File readFile(ClassLoader classLoader, String relativeFilePath) {
        return new File(classLoader.getResource(relativeFilePath).getFile());
    }

    public static List<String> readLines(ClassLoader classLoader, String relativeFilePath) throws IOException {
        File file = readFile(classLoader, relativeFilePath);
        return FileUtils.readLines(file, Charset.defaultCharset());
    }
}
