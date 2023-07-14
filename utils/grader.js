import { gradePython } from "./pythonWorker";

export const grader = async (code, testCases) => {
  const results = [];
  let grade = 0;
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    // use gradePython
    const result = await gradePython(code, testCase.input, testCase.output);
    results.push(result);
    if (result.success) {
      grade++;
    }
  }
  grade = Math.round(grade / testCases.length * 10000) / 100;
  return { results, grade };
}