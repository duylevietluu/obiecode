'use client';

import ReactCodeMirror from "@uiw/react-codemirror";
import { python, pythonLanguage } from '@codemirror/lang-python';
import { useState, useTransition } from "react";
import { addPostAction } from "@app/action";
import { useRouter } from "next/navigation";

const CodeForm = ({testId, userId}) => {
  const [code, setCode] = useState('');
  const [pending, startTransition] = useTransition();
  const router = useRouter();

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

  const handleAction = () => {
    startTransition(async() => {
      const {data, error} = await addPostAction(testId, userId, code);
      if (error) {
        alert(error);
      }
      if (data) {
        router.push(`/posts/${data}`);
      }
    })
  }

  return (
    <form action={handleAction}>
      <ReactCodeMirror
        placeholder="Please enter Python code."
        height="70vh"
        value=""
        onChange={(value) => setCode(value)} 
        extensions={[python({ base: python, codeLanguages: pythonLanguage })]} 
        className="pb-2 text-lg"
      />
      <div className="flex justify-center items-center">
        <button 
          type="submit" 
          className="blue-btn"
          disabled={pending || !code} 
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </div>
      
    </form>
  )
}

export default CodeForm;