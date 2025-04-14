const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
const cors = require("cors");

const app = express();
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const PORT = process.env.PORT || 5000;
const TEMP_DIR = path.join(__dirname, "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
  console.log(`Temporary directory created at ${TEMP_DIR}`);
}

function autoFormat(language, code) {
  return code.trim().replace(/\r\n/g, "\n");
}

function createWorkingFolder() {
  const folderName = `run_${Date.now()}_${crypto
    .randomBytes(3)
    .toString("hex")}`;
  const folderPath = path.join(TEMP_DIR, folderName);
  fs.mkdirSync(folderPath);
  console.log(`Created working folder: ${folderPath}`);
  return folderPath;
}

async function executeCode({ language, fileName, code, input }) {
  const workDir = createWorkingFolder();
  const formattedCode = autoFormat(language, code);
  const filePath = path.join(workDir, fileName);

  try {
    fs.writeFileSync(filePath, formattedCode);
    console.log(`Written file: ${filePath}`);
  } catch (err) {
    console.error(`Error writing file: ${err.stack}`);
    throw new Error("Failed to write source file: " + err.toString());
  }

  let command = "";
  let isRun = true;
  switch (language.toLowerCase()) {
    case "python":
    case "py":
      command = `python "${filePath}"`;
      break;
    case "cpp":
      if (fileName === "Solution.cpp") {
        isRun = false;
      } else {
        const exePath = path.join(workDir, "a.out");
        try {
          await execPromise(`g++ "${filePath}" -o "${exePath}"`);
          console.log(`Compiled C++ code to ${exePath}`);
        } catch (compileErr) {
          console.error(`Compilation error: ${compileErr.stack}`);
          throw new Error("Compilation failed: " + compileErr.toString());
        }
        command = `"${exePath}"`;
      }
      break;
    case "javascript":
    case "js":
      command = `node "${filePath}"`;
      break;
    case "java":
      const className = fileName.replace(".java", "");
      command = `javac "${filePath}" && java -cp "${workDir}" ${className}`;
      break;
    default:
      throw new Error("Unsupported language");
  }

  let inputFile = null;
  if (input && input.trim().length > 0) {
    inputFile = path.join(workDir, "input.txt");
    try {
      fs.writeFileSync(inputFile, input);
      console.log(`Written input file: ${inputFile}`);
    } catch (err) {
      console.error(`Error writing input file: ${err.stack}`);
      throw new Error("Failed to write input file: " + err.toString());
    }
  }

  let finalOutput = "";
  try {
    if (!isRun) {
      finalOutput = "No compilation/execution needed. File saved.";
    } else {
      if (inputFile) {
        command += ` < "${inputFile}"`;
      }
      console.log(`Executing command: ${command}`);
      // Increase timeout to 120 seconds and maxBuffer to 10MB
      const { stdout, stderr } = await execPromise(command, {
        timeout: 250000,
        maxBuffer: 1024 * 1024 * 1000,
      });
      finalOutput = stdout || stderr;
      console.log(`Execution complete. Output: ${finalOutput}`);
    }
  } catch (err) {
    console.error(`Execution error (code: ${err.code}): ${err.stack}`);
    finalOutput = err.stderr || err.toString();
    // Cleanup still scheduled
    setTimeout(() => {
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
        console.log(`Cleaned up working folder: ${workDir}`);
      } catch (cleanupErr) {
        console.error(`Error cleaning up working folder: ${cleanupErr.stack}`);
      }
    }, 10000);
    throw new Error(
      `Execution failed (code: ${err.code}): ${err.stderr || err.toString()}`
    );
  }

  // Schedule cleanup after 10 seconds
  setTimeout(() => {
    try {
      fs.rmSync(workDir, { recursive: true, force: true });
      console.log(`Cleaned up working folder: ${workDir}`);
    } catch (cleanupErr) {
      console.error(`Error cleaning up working folder: ${cleanupErr.stack}`);
    }
  }, 10000);

  return { output: finalOutput, workDir };
}

function mergeTestGen(testGen1, testGen2) {
  return (
    testGen1.trim() +
    "\n\n# The following section is commented out:\n" +
    testGen2
      .split("\n")
      .map((line) => "# " + line)
      .join("\n")
  );
}

app.post("/execute", async (req, res) => {
  const { language, fileName, code, input } = req.body;
  console.log(
    `[EXECUTE] Request received for language: ${language}, fileName: ${fileName}`
  );
  if (!language || !fileName || !code) {
    console.error("[EXECUTE] Missing required parameters.");
    return res
      .status(400)
      .json({ error: "Missing language, fileName, or code" });
  }
  try {
    const result = await executeCode({ language, fileName, code, input });
    console.log(`[EXECUTE] Success. WorkDir: ${result.workDir}`);
    return res.json({ output: result.output, workDir: result.workDir });
  } catch (err) {
    console.error(`[EXECUTE] Error: ${err.stack}`);
    return res.status(500).json({ error: err.toString(), stack: err.stack });
  }
});

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
    console.error(`[MERGE TESTGEN] Error: ${err.stack}`);
    return res.status(500).json({ error: err.toString(), stack: err.stack });
  }
});

app.post("/save", (req, res) => {
  const { cpp, js, java, py, testGen } = req.body;
  console.log("[SAVE] Request received to save outputs.");
  if ([cpp, js, java, py, testGen].some((item) => item === undefined)) {
    console.error("[SAVE] Missing one or more file outputs.");
    return res.status(400).json({ error: "Missing one or more file outputs" });
  }
  const saveFolder = path.join(
    __dirname,
    "saved_outputs",
    `save_${Date.now()}`
  );
  try {
    fs.mkdirSync(saveFolder, { recursive: true });
    fs.writeFileSync(path.join(saveFolder, "cpp.txt"), cpp);
    fs.writeFileSync(path.join(saveFolder, "js.txt"), js);
    fs.writeFileSync(path.join(saveFolder, "java.txt"), java);
    fs.writeFileSync(path.join(saveFolder, "py.txt"), py);
    fs.writeFileSync(path.join(saveFolder, "testGen.py"), testGen);
    console.log(`[SAVE] Files saved successfully in ${saveFolder}`);
    return res.json({
      message: "Files saved successfully",
      folder: saveFolder,
    });
  } catch (err) {
    console.error(`[SAVE] Error saving files: ${err.stack}`);
    return res.status(500).json({ error: err.toString(), stack: err.stack });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
