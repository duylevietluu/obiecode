export const grader = async (code, testCases) => {
  const response = await fetch(process.env.PYTHON_RUN_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store' // Disable caching
    },
    body: JSON.stringify({ code, testCases })
  });
  const data = await response.json();
  return data;
}
