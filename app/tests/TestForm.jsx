'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TestForm = ({action,existingTest}) => {
  const router = useRouter();
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

  const handleDelete = (key) => {
    if (cases.length === 1) return;
    setCases(cases.filter((item) => item !== key));
  }

  return (
    <form action={action} className='max-w-screen-lg mx-auto'>
      {/* this is to get into Formdata */}
      <input hidden type="text" name='_id' value={existingTest._id} readOnly />
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
          <tr>
            <td>
              <label className='form_label'>Number of Test Cases</label>
            </td>
            <td>
              <input className='form_input' name="numTestCases" value={cases.length} readOnly />
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
                <button type='button' className='red-btn' onClick={() => handleDelete(key)} disabled={cases.length <= 1}>
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
              <button type='submit' className='purple-btn'>Submit</button>
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