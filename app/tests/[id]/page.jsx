import CodeForm from "@components/CodeForm";
import BestGrade from "@models/bestgrade";
import Test from "@models/test";
import { connectedToDB } from "@utils/database"
import { getUserSession } from "@utils/utilFunc";

import DeleteButton from "@components/DeleteButton";
import Link from "next/link";
import Grade from "@components/Grade";

const TestPage = async({params}) => {
  await connectedToDB();
  const user = await getUserSession();
  const user_id = user?._id;
  // only show title, content, id
  const db_data = await Test.findById(params.id, { title: 1, content: 1, _id: 1 });
  const test = JSON.parse(JSON.stringify(db_data));
  const bestgrade = await BestGrade.findOne({ test: params.id, user: user_id });
  
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12">
          <h3 className="text-3xl font-bold mb-4 text-center">{test.title}</h3>
          <div className="text-center">
            {/* link to past self posts by using query params */}
            {
              user_id &&
              <Link href={`/posts/?testid=${params.id}&userid=${user_id}`} className="purple-btn">
                My Submissions
              </Link>
            }
            {/* all submission for this tests */}
            <Link href={`/posts/?testid=${params.id}`} className="blue-btn">
              All Submissions
            </Link>
          </div>
          {
            user?.admin &&
            <div className="text-center my-2">
              <Link href={`/tests/${params.id}/edit`} className="edit-link">Edit</Link>
              <DeleteButton type='test' id={params.id} />
            </div>
          }
          <div className="text-xl text-black py-4 whitespace-pre-wrap">{test.content}</div>
          <hr className="my-4 border-black w-full" />
          <div className="text-2xl font-bold mb-4 text-[#2b7a60]">
            Current grade
          </div>
          <div className="font-bold text-xl">
            <Grade grade={bestgrade?.result} loggedUser={user} />
          </div>
          
        </div>
        <div className="md:w-7/12 px-10">
            <CodeForm testId={params.id} userId={user_id} />
        </div>
      </div>
    </>
  )
}

export default TestPage