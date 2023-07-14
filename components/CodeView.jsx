'use client';

import ReactCodeMirror from "@uiw/react-codemirror";
import { python, pythonLanguage } from '@codemirror/lang-python';

const CodeView = ({inputCode}) => {
  return (
    <ReactCodeMirror 
      height="70vh"
      value={inputCode}
      extensions={[python({ base: python, codeLanguages: pythonLanguage })]} 
      className="pb-2 text-lg"
      editable={false}
    />
  )
}

export default CodeView;