import TestForm from "@components/TestForm";
import Test from "@models/test";
import { getUserSession } from "@utils/utilFunc";
import { redirect } from "next/navigation";

const TestPageEdit = async({params}) => {
  const user = await getUserSession();
  if (!user?.admin) {
    redirect(`/tests/${params.id}`);
  }
  const db_data = await Test.findById(params.id);
  const test = JSON.parse(JSON.stringify(db_data));

  return (
    <TestForm existingTest={test} />
  )
}

export default TestPageEdit