'use client';

import { useEffect } from "react";

const error = ({ error, reset }) => {
  return (
    <div className="">
      <h2 className="error_text">Something went wrong! </h2>
      <div className="pb-4 max-w-3xl">It is possible that the user id you are looking for does not exist in the database. Please check that the link is correct and try again. If you continue to experience issues, please contact support for further assistance.</div>
      <button className="test_link" onClick={reset}>Click here to try again</button>
    </div>
  )
}

export default error