'use client';

import ReactCodeMirror from "@uiw/react-codemirror";
import { python, pythonLanguage } from '@codemirror/lang-python';
import { useState, useTransition } from "react";
import { addPostAction } from "@app/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
      onClick={() => {toast.error("Please login to submit.", {autoClose: 2000})}}
    />
  )

  const handleAction = () => {
    startTransition(async() => {
      const id = toast.loading("Submitting your code...", {autoClose: false});
      const {data, error} = await addPostAction(testId, userId, code);
      if (error) {
        toast.update(id, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      if (data) {
        router.push(`/posts/${data}`);
        toast.update(id, { render: "Submitted your code!", type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
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