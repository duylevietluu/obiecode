export const fetchCache = 'force-no-store';

export const grader = async (code, testCases) => {
  const response = await fetch(process.env.PYTHON_RUN_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, testCases })
  }, {
    cache: 'no-store'
  });
  const data = await response.json();
  return data;
}
