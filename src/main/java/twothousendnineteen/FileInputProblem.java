package twothousendnineteen;

import utils.FileReader;

import java.io.IOException;

public class FileInputProblem {

    public String readFileContent(String path) throws IOException {
        return FileReader.readFileAsString(getClassLoader(), path);
    }

    public ClassLoader getClassLoader() {
        return getClass().getClassLoader();
    }

}
