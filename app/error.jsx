'use client';

import { useEffect } from "react";

const error = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  
  return (
    <div>
      <h2 className="error_text">Something went wrong!</h2>
      <button className="test_link" onClick={reset}>Click here to try again</button>
    </div>
  )
}

export default error