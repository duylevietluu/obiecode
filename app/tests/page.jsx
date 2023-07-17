import Test from "@models/test";
import { connectedToDB } from "@utils/database";
import { getUserSession } from "@utils/utilFunc";

import Link from "next/link";

const AllTests = async() => {
  const user = await getUserSession();
  await connectedToDB();
  // only fetch the _id and title fields
  const db_data = await Test.find({}, { _id: 1, title: 1 });
  const tests = JSON.parse(JSON.stringify(db_data));
  return (
    <>
      <h3 className="head_text">Coding Challenges!</h3>
      {
        user?.admin &&
        <div className="text-center mb-4">
          <Link href='/tests/create' className="blue-btn text-xl">Create Test</Link>
        </div>
      }
      <table className="w-full rounded-lg overflow-hidden border border-gray-900 alt_table">
        <thead>
          <tr>
            <th className="w-2/5 text_th">Test</th>
            <th className="w-1/5 text_th">Category</th>
            <th className="w-1/5 text_th">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test._id}>
              <td className="border px-4 py-2 text-center">
                <Link href={`/tests/${test._id}`} className="test_link">
                  {test.title}
                </Link>
              </td>
              <td className="border text-cyan-700 px-4 py-2 font-bold text-center text-lg">
                {test.category ?? "Beginner"}
              </td>
              <td className="border px-4 py-2 font-bold text-center text-lg">
                <Difficulty difficulty={test.difficulty ?? "easy"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const Difficulty = ({ difficulty }) => {
  if (difficulty === "easy") {
    return <span className="text-green-600">Easy</span>;
  } else if (difficulty === "medium") {
    return <span className="text-yellow-500">Medium</span>;
  } else {
    return <span className="text-red-500">Hard</span>;
  }
};

export default AllTests