import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import AceEditor from 'react-ace';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaUndo, FaPlay, FaCopy, FaCodeBranch, FaTimes, FaExternalLinkAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { diffWords } from 'diff';
import 'react-toastify/dist/ReactToastify.css';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

window.AceEnvironment = window.AceEnvironment || {};
window.AceEnvironment.document = document;

const defaultTemplates = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int Solve(vector<int>& v) { 
        return 0;
    }
};

int main() {
    int T;
    cin >> T;
    for (int tc = 0; tc < T; tc++) {
        cout << 100 << endl;
    }
    return 0;
}
`,
  js: `function solve(arr) {
  return 0;
}

function main() {
  
}

main();
`,
  java: `import java.util.*;
public class Main {
    public static int solve(ArrayList<Integer> v) {
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        for (int tc = 0; tc < T; tc++) {
            String testCaseName = sc.next();
            System.out.println(testCaseName);
            System.out.println(solve(v));
        }
    }
}
`,
  py: `def solve(arr):
    return 0

if __name__ == "__main__":
    T = int(input())
    for _ in range(T):
        test_case_name = input().trim()
        print(test_case_name)
        print(solve([]))
`
};

const defaultTestGenTemplate = "# Write your test generator code here";

const LS_KEYS = {
  darkMode: 'localCompiler_darkMode',
  codeEditors: 'localCompiler_codeEditors',
  testGen: 'localCompiler_testGen',
  testInputs: 'localCompiler_testInputs',
  outputs: 'localCompiler_outputs'
};

const leftTabs = [
  { key: 'cpp', label: 'CPP' },
  { key: 'js', label: 'JS' },
  { key: 'java', label: 'JAVA' },
  { key: 'py', label: 'PY' },
  { key: 'waTestGen', label: 'WA TestGen' },
  { key: 'tleTestGen', label: 'TLE TestGen' }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.darkMode);
    return stored ? JSON.parse(stored) : true;
  });
  const [activeLeftTab, setActiveLeftTab] = useState('cpp');
  const [codeEditors, setCodeEditors] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.codeEditors);
    return stored ? JSON.parse(stored) : {
      cpp: { code: defaultTemplates.cpp, fileName: 'Main.cpp' },
      js: { code: defaultTemplates.js, fileName: 'Main.js' },
      java: { code: defaultTemplates.java, fileName: 'Main.java' },
      py: { code: defaultTemplates.py, fileName: 'Main.py' },
    };
  });
  const [testGen, setTestGen] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.testGen);
    return stored ? JSON.parse(stored) : { wa: defaultTestGenTemplate, tle: defaultTestGenTemplate };
  });
  const [activeInputTab, setActiveInputTab] = useState('wa');
  const [testInputs, setTestInputs] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.testInputs);
    return stored ? JSON.parse(stored) : { wa: '', tle: '' };
  });
  const [outputs, setOutputs] = useState(() => {
    const stored = localStorage.getItem(LS_KEYS.outputs);
    return stored ? JSON.parse(stored) : { cpp: '', js: '', java: '', py: '' };
  });
  const [showDiff, setShowDiff] = useState(false);
  const [showDiffModal, setShowDiffModal] = useState(false);
  const [hideOutput, setHideOutput] = useState(1);

  useEffect(() => { localStorage.setItem(LS_KEYS.darkMode, JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { localStorage.setItem(LS_KEYS.codeEditors, JSON.stringify(codeEditors)); }, [codeEditors]);
  useEffect(() => { localStorage.setItem(LS_KEYS.testGen, JSON.stringify(testGen)); }, [testGen]);
  useEffect(() => { localStorage.setItem(LS_KEYS.testInputs, JSON.stringify(testInputs)); }, [testInputs]);
  useEffect(() => { localStorage.setItem(LS_KEYS.outputs, JSON.stringify(outputs)); }, [outputs]);

  
  const getAceMode = (lang) => {
    switch (lang) {
      case 'cpp': return 'c_cpp';
      case 'js': return 'javascript';
      case 'java': return 'java';
      case 'py': return 'python';
      default: return 'text';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.info("Copied to clipboard!"))
      .catch(() => toast.error("Copy failed!"));
  };

  const resetCodeEditor = (lang) => {
    setCodeEditors(prev => ({
      ...prev,
      [lang]: { code: defaultTemplates[lang], fileName: lang === 'cpp' ? 'Main.cpp' : lang === 'js' ? 'Main.js' : lang === 'java' ? 'Main.java' : 'Main.py' }
    }));
    toast.info(`${lang.toUpperCase()} editor reset.`);
  };

  const resetTestGenEditor = (tabKey) => {
    const key = tabKey === 'waTestGen' ? 'wa' : 'tle';
    setTestGen(prev => ({ ...prev, [key]: defaultTestGenTemplate }));
    toast.info(`${tabKey.replace('TestGen', ' TestGen').toUpperCase()} editor reset.`);
  };

  const runCodeForLang = async (lang) => {
    try {
      const response = await axios.post('http://localhost:5000/execute', {
        language: lang,
        fileName: codeEditors[lang].fileName,
        code: codeEditors[lang].code,
        input: testInputs[activeInputTab],
      });
      setOutputs(prev => ({ ...prev, [lang]: response.data.output }));
      toast.success(`${lang.toUpperCase()} executed successfully!`);
    } catch (err) {
      setOutputs(prev => ({ ...prev, [lang]: 'Error executing code.' }));
      toast.error(`Error executing ${lang.toUpperCase()} code.`);
    }
  };

  const runAllCodes = () => {
    ['cpp', 'js', 'java', 'py'].forEach(lang => runCodeForLang(lang));
  };

  const runTestGenForTab = async (tabKey) => {
    const key = tabKey === 'waTestGen' ? 'wa' : 'tle';
    try {
      const response = await axios.post('http://localhost:5000/execute', {
        language: 'py',
        fileName: 'testGen.py',
        code: testGen[key],
        input: '',
      });
      setTestInputs(prev => ({ ...prev, [key]: response.data.output }));
      toast.success('Test generator executed successfully!');
    } catch (err) {
      setTestInputs(prev => ({ ...prev, [key]: 'Error running test generator.' }));
      toast.error('Error running test generator.');
    }
  };

  const getDiff = (a, b) => {
    const diff = diffWords(a, b);
    return diff.map((part, i) => (
      <span key={i} style={{ backgroundColor: part.added ? (darkMode ? '#005500' : '#a6f3a6') : part.removed ? (darkMode ? '#550000' : '#f3a6a6') : 'transparent' }}>
        {part.value}
      </span>
    ));
  };

  const nonEmptyOutputsArr = Object.entries(outputs).filter(([, out]) => out && out.trim());
  const outputsAreSame = nonEmptyOutputsArr.length > 0 && nonEmptyOutputsArr.every(([, out]) => out === nonEmptyOutputsArr[0][1]);
  const mergedHeader = nonEmptyOutputsArr.map(([lang]) => lang.toUpperCase()).join('-');

  const outputGroups = {};
  Object.entries(outputs).forEach(([lang, out]) => {
    const normalized = out.trim();
    if (normalized) {
      outputGroups[normalized] = outputGroups[normalized] || [];
      outputGroups[normalized].push(lang);
    }
  });
  const summaryItems = Object.values(outputGroups).map(group =>
    group.length > 1
      ? `Same: ${group.map(l => l.toUpperCase()).join(' & ')}`
      : `Unique: ${group[0].toUpperCase()}`
  );
  

  const containerClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';

  const openDiffModal = () => { setShowDiffModal(true); };
  const closeDiffModal = () => { setShowDiffModal(false); };
  const viewOutputInNewTab = (output) => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <motion.div className={`${containerClass} min-h-screen flex flex-col relative transition-colors duration-300`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Split direction="horizontal" sizes={[50, 50]} minSize={200} gutterSize={10} className="flex flex-1">
        <motion.div className="flex flex-col h-full border-r p-2 space-y-4"
          initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex space-x-2 mb-2">
            {leftTabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveLeftTab(tab.key)}
                className={`px-3 py-2 rounded focus:outline-none flex-1 whitespace-nowrap ${activeLeftTab === tab.key ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-200 text-gray-900'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {['cpp','js','java','py'].includes(activeLeftTab) ? (
                <>
                  <label className="text-sm">File Name:</label>
                  <input type="text" value={codeEditors[activeLeftTab].fileName}
                    onChange={e => setCodeEditors({ ...codeEditors, [activeLeftTab]: { ...codeEditors[activeLeftTab], fileName: e.target.value } })}
                    className={`w-1/2 border rounded p-1 text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} />
                </>
              ) : (
                <span className="text-sm font-semibold">
                  {activeLeftTab === 'waTestGen' ? 'WA TestGen Editor' : 'TLE TestGen Editor'}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() =>
                copyToClipboard(
                  ['cpp','js','java','py'].includes(activeLeftTab)
                    ? codeEditors[activeLeftTab].code
                    : testGen[activeLeftTab === 'waTestGen' ? 'wa' : 'tle']
                )} className="p-1 border rounded focus:outline-none">
                <FaCopy size={16} />
              </button>
              {['cpp','js','java','py'].includes(activeLeftTab) ? (
                <button onClick={() => resetCodeEditor(activeLeftTab)}
                  className="text-sm text-blue-500 underline flex items-center space-x-1">
                  <FaUndo size={14} /><span>Reset Template</span>
                </button>
              ) : (
                <button onClick={() => resetTestGenEditor(activeLeftTab)}
                  className="text-sm text-blue-500 underline flex items-center space-x-1">
                  <FaUndo size={14} /><span>Reset Template</span>
                </button>
              )}
            </div>
          </div>
          {['cpp','js','java','py'].includes(activeLeftTab) ? (
            <div className="flex flex-col h-[81vh]">
              <AceEditor mode={getAceMode(activeLeftTab)} theme={darkMode ? 'monokai' : 'github'} name="code-editor"
                onChange={value => setCodeEditors({ ...codeEditors, [activeLeftTab]: { ...codeEditors[activeLeftTab], code: value } })}
                value={codeEditors[activeLeftTab].code} width="100%" height="100%" fontSize={16}
                setOptions={{ tabSize: 4, useSoftTabs: true, showLineNumbers: true, useWorker: false }}
                className="flex-grow border rounded" />
              <div className="flex justify-end space-x-2 mt-2">
                <button onClick={() => runCodeForLang(activeLeftTab)}
                  className="px-3 py-1 bg-green-500 text-white rounded flex items-center space-x-1">
                  <FaPlay size={14} /><span>Run {activeLeftTab.toUpperCase()} Code</span>
                </button>
                <button onClick={runAllCodes}
                  className="px-3 py-1 bg-indigo-500 text-white rounded flex items-center space-x-1">
                  <FaPlay size={14} /><span>Run All Codes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-[81vh]">
              <AceEditor mode="python" theme={darkMode ? 'monokai' : 'github'} name="testgen-editor"
                onChange={value => setTestGen({ ...testGen, [activeLeftTab === 'waTestGen' ? 'wa' : 'tle']: value })}
                value={activeLeftTab === 'waTestGen' ? testGen.wa : testGen.tle} width="100%" height="100%" fontSize={16}
                setOptions={{ tabSize: 4, useSoftTabs: true, showLineNumbers: true, useWorker: false }}
                className="flex-grow border rounded" />
              <div className="flex justify-end space-x-2 mt-2">
                <button onClick={() => runTestGenForTab(activeLeftTab)}
                  className="px-3 py-1 bg-purple-600 text-white rounded flex items-center space-x-1">
                  <FaPlay size={14} /><span>Run TestGen</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
        <motion.div className="flex flex-col h-screen p-2 space-y-2" initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex space-x-2 w-full">
              {['wa','tle'].map(tab => (
                <button key={tab} onClick={() => setActiveInputTab(tab)}
                  className={`px-4 py-2 rounded focus:outline-none flex-1 whitespace-nowrap ${activeInputTab === tab ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-200 text-gray-900'}`}>
                  {tab.toUpperCase()} Input
                </button>
              ))}
              <button onClick={() => copyToClipboard(testInputs[activeInputTab])}
                className="px-2 py-1 border rounded focus:outline-none">
                <FaCopy size={16} />
              </button>
              <button onClick={() => setDarkMode(prev => !prev)}
                className="px-2 py-1 border rounded focus:outline-none">
                {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
              </button>
              <button onClick={() => setHideOutput(prev => !prev)}
                className="px-2 py-1 border rounded focus:outline-none">
                {hideOutput ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>
          <textarea className={`w-full border rounded p-2 resize-y flex-grow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            rows="4" value={testInputs[activeInputTab]}
            onChange={e => setTestInputs({ ...testInputs, [activeInputTab]: e.target.value })}
            placeholder={`Enter ${activeInputTab.toUpperCase()} input...`} />
          <div className="flex items-center justify-between border-b pb-2">
            <div className="text-sm italic">
              {summaryItems.map((item, idx) => (<div key={idx}>{item}</div>))}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowDiff(prev => !prev)}
                className="px-2 py-1 border rounded text-sm flex items-center space-x-1">
                <FaCodeBranch size={14} /><span>{showDiff ? 'Hide Diff' : 'Show Diff'}</span>
              </button>
              <button onClick={() => setShowDiffModal(true)}
                className="px-2 py-1 border rounded text-sm flex items-center space-x-1">
                <FaCodeBranch size={14} /><span>Full Diff</span>
              </button>
            </div>
          </div>
          <div className="max-h-72 overflow-auto">
            {nonEmptyOutputsArr.length > 0 && (
              <>
                {outputsAreSame ? (
                  <div className="border rounded p-2 mb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">Merged Output ({mergedHeader}.txt)</h3>
                      <div className="flex space-x-2">
                        <button onClick={() => copyToClipboard(nonEmptyOutputsArr[0][1])}
                          className="px-2 py-1 border rounded focus:outline-none text-sm">
                          <FaCopy size={16} />
                        </button>
                        <button onClick={() => viewOutputInNewTab(nonEmptyOutputsArr[0][1])}
                          className="px-2 py-1 border rounded focus:outline-none text-sm">
                          <FaExternalLinkAlt size={16} />
                        </button>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm">{hideOutput ? 'Output hidden' : nonEmptyOutputsArr[0][1]}</pre>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {['cpp','js','java','py'].map(lang =>
                      outputs[lang] && (
                        <div key={lang} className="border rounded p-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold">{lang.toUpperCase()} Output</h3>
                            <div className="flex space-x-2">
                              <button onClick={() => copyToClipboard(outputs[lang])}
                                className="px-2 py-1 border rounded focus:outline-none text-sm">
                                <FaCopy size={16} />
                              </button>
                              <button onClick={() => viewOutputInNewTab(outputs[lang])}
                                className="px-2 py-1 border rounded focus:outline-none text-sm">
                                <FaExternalLinkAlt size={16} />
                              </button>
                            </div>
                          </div>
                          <pre className="whitespace-pre-wrap text-sm">{hideOutput ? 'Output hidden' : (showDiff && nonEmptyOutputsArr[0][1] !== outputs[lang] ? getDiff(nonEmptyOutputsArr[0][1], outputs[lang]) : outputs[lang])}</pre>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </Split>
      {showDiffModal && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className={`p-4 rounded w-[90%] h-[90%] overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <button onClick={closeDiffModal} className="absolute top-2 right-2 p-2 border rounded focus:outline-none">
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Diff Details</h2>
            {['cpp','js','java','py'].map(lang => outputs[lang] && (
              <div key={lang} className="mb-4">
                <h3 className="font-semibold">{lang.toUpperCase()} Diff:</h3>
                <div className="border p-2">
                  {getDiff(nonEmptyOutputsArr[0][1], outputs[lang])}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
      <ToastContainer position="bottom-left" autoClose={500} hideProgressBar />
    </motion.div>
  );
}

export default App;
