import TestForm from "@components/TestForm";
import Test from "@models/test";

const TestPageEdit = async({params}) => {
  const db_data = await Test.findById(params.id);
  const test = JSON.parse(JSON.stringify(db_data));

  return (
    <TestForm existingTest={test} />
  )
}

export default TestPageEdit