'use client';

import ReactCodeMirror from "@uiw/react-codemirror";
import { python, pythonLanguage } from '@codemirror/lang-python';
import { useState } from "react";
import { addPostAction } from "@app/action";

const CodeForm = ({testId, userId}) => {
  const [code, setCode] = useState('');

  if (!userId) return (
    <ReactCodeMirror 
      placeholder="Please login to submit."
      height="70vh"
      value=""
      extensions={[python({ base: python, codeLanguages: pythonLanguage })]}
      className="pb-2 text-lg"
      editable={false}
      onClick={() => {alert("Please login to submit.")}}
    />
  )

  return (
    <form action={addPostAction}>
      <input type="hidden" name="testId" value={testId} />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="code" value={code} />
      <ReactCodeMirror
        placeholder="Please enter Python code."
        height="70vh"
        value=""
        onChange={(value) => { setCode(value) }} 
        extensions={[python({ base: python, codeLanguages: pythonLanguage })]} 
        className="pb-2 text-lg"
      />
      <div className="flex justify-center items-center">
        <button 
          type="submit" 
          className="blue-btn"
          disabled={!code}
        >
          Submit
        </button>
      </div>
      
    </form>
  )
}

export default CodeForm;