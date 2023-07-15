'use client';
import { createOrEditTest } from '@app/action';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

// it is used in both create and edit page
const TestForm = ({existingTest}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  existingTest = existingTest || {
    _id: '',
    title: '',
    content: '',
    testCases: [{input:'',output:''}],
  };

  const array = existingTest.testCases.map((_, i) => i);
  const [cases, setCases] = useState(array);

  const handleAddTest = () => {
    if (cases.length === 10) return;
    setCases([...cases, cases[cases.length - 1] + 1]);
  }

  const handleDeleteTest = (key) => {
    if (cases.length === 1) return;
    setCases(cases.filter((item) => item !== key));
  }

  const handleAction = (formData) => {
    // take the data from the form and send it to the server
    const title = formData.get('title');
    const content = formData.get('content');
    const testCases = [];
    for (let i = 1; i <= cases.length; i++) {
      testCases.push({
        input: formData.get(`input ${i}`),
        output: formData.get(`output ${i}`),
      });
    }
    startTransition(async() => {
      const { data, error } = await createOrEditTest(existingTest._id, title, content, testCases);
      if (error) {
        alert(error);
      }
      else {
        router.push(`/tests/${data}`);
      }
    })
  }

  return (
    <form action={handleAction} className='max-w-screen-lg mx-auto'>
      <table className='w-full'>
        <tbody>
          <tr>
            <td className='w-[10%]'>
              <label className='form_label'>Title</label>
            </td>
            <td>
              <input className='form_input font-bold' name="title" type="text" required defaultValue={existingTest.title} />
            </td>
          </tr>
          <tr>
            <td>
              <label className='form_label'>Content</label>
            </td>
            <td>
              <textarea className='content_textarea' name="content" required defaultValue={existingTest.content} />
            </td>
          </tr>
        </tbody>
      </table>
      <table className='w-full mt-3'>
        <thead>
          <tr>
            <th className='w-[2%]'></th>
            <th className='w-[40%]'>Input</th>
            <th className='w-[40%]'>Output</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((key, i) => (
            <tr key={key}>
              <td className='form_label'>{i+1}</td>
              <td>
                <textarea 
                  className='case_textarea' 
                  name={`input ${i+1}`} 
                  defaultValue={existingTest.testCases[key]?.input || ''} 
                />
              </td>
              <td>
                <textarea 
                  className='case_textarea' 
                  name={`output ${i+1}`} 
                  defaultValue={existingTest.testCases[key]?.output || ''} 
                  required 
                />
              </td>
              <td>
                <button type='button' className='red-btn' onClick={() => handleDeleteTest(key)} disabled={cases.length <= 1}>
                  ×
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-center" colSpan="3">
              <button type='button' className='blue-btn' onClick={handleAddTest} disabled={cases.length >= 10}>
                Add Test
              </button>
              <button type='submit' className='purple-btn' disabled={pending}>
                {pending ? 'Submitting...' : 'Submit'}
              </button>
              <button type='button' className='red-btn' onClick={() => {
                if(confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) router.back()
              }}>
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