import { editTestAction } from "@app/action";
import TestForm from "@app/tests/TestForm";
import Test from "@models/test";

const TestPageEdit = async({params}) => {
  const db_data = await Test.findById(params.id);
  const test = JSON.parse(JSON.stringify(db_data));

  return (
    <TestForm action={editTestAction} existingTest={test} />
  )
}

export default TestPageEdit