'use client';

import { deleteTestAction } from "@app/action";
import { useTransition } from "react";

const DeleteTestButton = ({testId}) => {
  let [isPending, startTransition] = useTransition();
  return (
    <button className="red-btn" disabled={isPending} onClick={() => {
      if (confirm("Are you sure you want to delete this test? All submissions associated with this test will be deleted as well."))
        startTransition(() => deleteTestAction(testId))
    }}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  )
}

export default DeleteTestButton