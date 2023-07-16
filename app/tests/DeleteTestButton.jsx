'use client';

import { deleteTestAction } from "@app/action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

const DeleteTestButton = ({testId}) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async() => {
      if (!confirm("Are you sure you want to delete this test? All submissions associated with this test will be deleted as well.")) 
        return;
      const id = toast.loading("Deleting the test...", {autoClose: false});
      const {error} = await deleteTestAction(testId);
      if (error) {
        toast.update(id, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      else {
        toast.update(id, { render: "Deleted the test!", type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
        router.push("/tests");
      }
    })
  }
  return (
    <button className="red-btn" disabled={isPending} onClick={handleClick}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  )
}

export default DeleteTestButton