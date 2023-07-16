'use client';
import { createOrEditTest } from '@app/action';
import { auto } from 'async';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

let counter = 0; const generateKey = () => (counter++).toString();

const newTestCase = () => ({
    key: generateKey(),
    input: '',
    output: '',
})

// it is used in both create and edit page
const TestForm = ({existingTest}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [testCases, setTestCases] = useState(existingTest?.testCases.map(
    (testCase) => ({...testCase, key: testCase._id})
  ) || [newTestCase()]);

  const handleAddTest = () => {
    toast.success("Added a test case", { autoClose: 1000, toastId: 'addTestToast' });
    setTestCases([...testCases, newTestCase()]);
  }

  const handleDeleteTest = (key) => () => {
    toast.warning("Deleted a test case", { autoClose: 1000, toastId: 'deleteTestToast' });
    setTestCases(testCases.filter((testCase) => testCase.key !== key));
  }

  const handleAction = (formData) => {
    // take the data from the form and send it to the server
    const title = formData.get('title');
    const content = formData.get('content');
    startTransition(async() => {
      const id = toast.loading("Submitting the test...", { autoClose: false });
      const { data, error } = await createOrEditTest(existingTest?._id, title, content, testCases);
      if (error) {
        toast.update(id, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      else {
        toast.update(id, { render: "Submitted the test!", type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
        router.push(`/tests/${data}`);
      }
    })
  }

  const handleCancel = () => {
    if(confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) router.back()
  }

  const updateTest = (key, property) => (event) => {
    const newTestCases = testCases.map((testCase) => 
      (testCase.key === key ? {...testCase, [property]: event.target.value} : testCase)
    );
    setTestCases(newTestCases);
  };

  return (
    <form action={handleAction} className='max-w-screen-lg mx-auto'>
      {/* title and content */}
      <table className='w-full'>
        <tbody>
          <tr>
            <td className='w-[10%]'>
              <label className='form_label'>Title</label>
            </td>
            <td>
              <input className='form_input font-bold' name="title" type="text" required defaultValue={existingTest?.title} />
            </td>
          </tr>
          <tr>
            <td>
              <label className='form_label'>Content</label>
            </td>
            <td>
              <textarea className='content_textarea' name="content" required defaultValue={existingTest?.content} />
            </td>
          </tr>
        </tbody>
      </table>
      {/* testCases */}
      <table className='w-full mt-3'>
        <thead>
          <tr>
            <th className='w-[2%]'></th>
            <th className='w-[40%]'>Input</th>
            <th className='w-[40%]'>Output</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map(({key, input, output}, i) => (
            <tr key={key}>
              <td className='form_label'>{i+1}</td>
              <td>
                <textarea className='case_textarea' value={input} onChange={updateTest(key, 'input')} />
              </td>
              <td>
                <textarea className='case_textarea' value={output} onChange={updateTest(key, 'output')} required />
              </td>
              <td>
                <button type='button' className='red-btn' onClick={handleDeleteTest(key)} disabled={testCases.length <= 1}>
                  ×
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-center" colSpan="3">
              <button type='button' className='blue-btn' onClick={handleAddTest} disabled={testCases.length >= 10}>
                Add Test
              </button>
              <button type='submit' className='purple-btn' disabled={pending}>
                {pending ? 'Submitting...' : 'Submit'}
              </button>
              <button type='button' className='red-btn' onClick={handleCancel}>
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default TestForm;