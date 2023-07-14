'use client';

import  { useState } from "react";

const CreateForm = ({action}) => {
  const [cases, setCases] = useState([0]);

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
      <table className='w-full'>
        <tbody>
          <tr>
            <td className='w-[10%]'>
              <label className='form_label'>Title</label>
            </td>
            <td>
              <input className='form_input font-bold' name="title" type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <label className='form_label'>Content</label>
            </td>
            <td>
              <textarea className='content_textarea' name="content"/>
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
                <textarea className='case_textarea' name={`input ${i+1}`} />
              </td>
              <td>
                <textarea className='case_textarea' name={`output ${i+1}`} />
              </td>
              <td>
                <button type='button' className='red-btn' onClick={() => handleDelete(key)} disabled={cases.length <= 1}>
                  {/* time symbols */}
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
            </td>
          </tr>
        </tbody>
      </table>
      

    </form>
  )
}

export default CreateForm

