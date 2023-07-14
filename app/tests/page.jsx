import Test from "@models/test";
import { connectedToDB } from "@utils/database";
import { extractUserInfo } from "@utils/utilFunc";
import { getServerSession } from "next-auth";
import Link from "next/link";

const AllTests = async() => {
  const user = extractUserInfo(await getServerSession());
  await connectedToDB();
  // only fetch the _id and title fields
  const db_data = await Test.find({}, { _id: 1, title: 1 });
  const tests = JSON.parse(JSON.stringify(db_data));
  return (
    <>
      <h3 className="head_text">Coding Challenges!</h3>
      {
        user?.admin &&
        <div className="text-center">
          <Link href='/tests/create' className="blue-btn text-xl">Create Test</Link>
        </div>
      }
      {
        tests.map(test => 
          <div key={test._id}>
            <Link href={`/tests/${test._id}`} className="test_link">
              {test.title}
            </Link>
          </div>
        )
      }
    </>
  )
}

export default AllTests