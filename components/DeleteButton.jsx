'use client';

import { deleteAction } from "@app/action";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

const DeleteButton = ({ id, type }) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async() => {
      if (!confirm(`Are you sure you want to delete this ${type}? All submissions associated with this ${type} will be deleted as well.`)) 
        return;
      const toastId = toast.loading(`Deleting the ${type}...`, {autoClose: false});
      const {error, toSignOut} = await deleteAction(id, type);
      if (error) {
        toast.update(toastId, { render: error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000 });
      }
      else {
        toast.update(toastId, { render: `Deleted the ${type}!`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 2000 });
        if (!toSignOut) {
          router.push(`/${type}s`);
        }
        else {
          await signOut({callbackUrl: '/'});
        }
      }
    })
  }

  return (
    <button className="red-btn" onClick={handleClick} disabled={isPending}>
      {isPending ? `Deleting ${type}...` : `Delete ${type}`}
    </button>
  );
}

export default DeleteButton;