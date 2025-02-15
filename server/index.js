// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
const cors = require("cors")

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Create a temporary directory to hold code files and outputs
const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
  console.log(`Temporary directory created at ${TEMP_DIR}`);
}

// Dummy auto formatter
function autoFormat(language, code) {
  return code.trim().replace(/\r\n/g, "\n");
}

// Create a unique working folder for a submission.
function createWorkingFolder() {
  const folderName = `run_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
  const folderPath = path.join(TEMP_DIR, folderName);
  fs.mkdirSync(folderPath);
  console.log(`Created working folder: ${folderPath}`);
  return folderPath;
}

// Executes the given code based on language and fileName.
async function executeCode({ language, fileName, code, input }) {
  const workDir = createWorkingFolder();
  const formattedCode = autoFormat(language, code);
  const filePath = path.join(workDir, fileName);
  
  try {
    fs.writeFileSync(filePath, formattedCode);
    console.log(`Written file: ${filePath}`);
  } catch (err) {
    console.error(`Error writing file: ${err}`);
    throw new Error("Failed to write source file.");
  }

  let command = "";
  let isRun = true; // flag if we should execute (or just echo file)

  switch (language.toLowerCase()) {
    case "python":
    case "py":
      command = `python "${filePath}"`;
      break;
    case "cpp":
      // If fileName is "Solution.cpp", do not compile.
      if (fileName === "Solution.cpp") {
        isRun = false;
      } else {
        const exePath = path.join(workDir, "a.out");
        try {
          await execPromise(`g++ "${filePath}" -o "${exePath}"`);
          console.log(`Compiled C++ code to ${exePath}`);
        } catch (compileErr) {
          console.error(`Compilation error: ${compileErr}`);
          throw new Error("Compilation failed.");
        }
        command = `"${exePath}"`;
      }
      break;
    case "javascript":
    case "js":
      command = `node "${filePath}"`;
      break;
    case "java":
      // Extract class name from file name.
      const className = fileName.replace(".java", "");
      command = `javac "${filePath}" && java -cp "${workDir}" ${className}`;
      break;
    default:
      throw new Error("Unsupported language");
  }

  // If input is provided, write to a temporary file.
  let inputFile = null;
  if (input && input.trim().length > 0) {
    inputFile = path.join(workDir, "input.txt");
    try {
      fs.writeFileSync(inputFile, input);
      console.log(`Written input file: ${inputFile}`);
    } catch (err) {
      console.error(`Error writing input file: ${err}`);
      throw new Error("Failed to write input file.");
    }
  }

  let finalOutput = "";
  try {
    if (!isRun) {
      finalOutput = "No compilation/execution needed. File saved.";
    } else {
      // If input exists, add redirection to the command.
      if (inputFile) {
        command += ` < "${inputFile}"`;
      }
      console.log(`Executing command: ${command}`);
      const { stdout, stderr } = await execPromise(command, { timeout: 5000 });
      finalOutput = stdout || stderr;
      console.log(`Execution complete. Output: ${finalOutput}`);
    }
  } catch (err) {
    console.error(`Execution error: ${err}`);
    finalOutput = err.stderr || err.toString();
  }

  // Optional: Clean up the working folder after a delay (if desired).
  // setTimeout(() => fs.rmSync(workDir, { recursive: true, force: true }), 30000);

  return { output: finalOutput, workDir };
}

// Merge two test generator Python files.
function mergeTestGen(testGen1, testGen2) {
  const merged =
    testGen1.trim() +
    "\n\n# The following section is commented out:\n" +
    testGen2
      .split("\n")
      .map((line) => "# " + line)
      .join("\n");
  return merged;
}

// Endpoint to execute a file.
app.post("/execute", async (req, res) => {
  const { language, fileName, code, input } = req.body;
  console.log(`[EXECUTE] Request received for language: ${language}, fileName: ${fileName}`);
  if (!language || !fileName || !code) {
    console.error("[EXECUTE] Missing required parameters.");
    return res.status(400).json({ error: "Missing language, fileName, or code" });
  }
  try {
    const result = await executeCode({ language, fileName, code, input });
    console.log(`[EXECUTE] Success. WorkDir: ${result.workDir}`);
    return res.json({ output: result.output, workDir: result.workDir });
  } catch (err) {
    console.error(`[EXECUTE] Error: ${err}`);
    return res.status(500).json({ error: err.toString() });
  }
});

// Endpoint to merge test generator files.
app.post("/mergeTestGen", (req, res) => {
  const { testGen1, testGen2 } = req.body;
  console.log("[MERGE TESTGEN] Request received.");
  if (!testGen1 || !testGen2) {
    console.error("[MERGE TESTGEN] Missing test generator code.");
    return res.status(400).json({ error: "Missing test generator code" });
  }
  try {
    const merged = mergeTestGen(testGen1, testGen2);
    console.log("[MERGE TESTGEN] Merge successful.");
    return res.json({ mergedTestGen: merged });
  } catch (err) {
    console.error(`[MERGE TESTGEN] Error: ${err}`);
    return res.status(500).json({ error: err.toString() });
  }
});

// Endpoint to save outputs locally.
app.post("/save", (req, res) => {
  const { cpp, js, java, py, testGen } = req.body;
  console.log("[SAVE] Request received to save outputs.");
  if ([cpp, js, java, py, testGen].some((item) => item === undefined)) {
    console.error("[SAVE] Missing one or more file outputs.");
    return res.status(400).json({ error: "Missing one or more file outputs" });
  }
  const saveFolder = path.join(__dirname, "saved_outputs", `save_${Date.now()}`);
  try {
    fs.mkdirSync(saveFolder, { recursive: true });
    fs.writeFileSync(path.join(saveFolder, "cpp.txt"), cpp);
    fs.writeFileSync(path.join(saveFolder, "js.txt"), js);
    fs.writeFileSync(path.join(saveFolder, "java.txt"), java);
    fs.writeFileSync(path.join(saveFolder, "py.txt"), py);
    fs.writeFileSync(path.join(saveFolder, "testGen.py"), testGen);
    console.log(`[SAVE] Files saved successfully in ${saveFolder}`);
    return res.json({ message: "Files saved successfully", folder: saveFolder });
  } catch (err) {
    console.error(`[SAVE] Error saving files: ${err}`);
    return res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
