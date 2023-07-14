'use static';

import Post from "@models/post";
import { connectedToDB } from "@utils/database"
import Link from "next/link";
import CodeView from "@components/CodeView";
import { getServerSession } from "next-auth";
import { extractUserInfo } from "@utils/utilFunc";

const PostViewPage = async({params}) => {
  await connectedToDB();
  // and populate to get user's username and test's title
  const db_data = await Post.findById(params.id).populate('user', 'username').populate('test', 'title');
  const post = JSON.parse(JSON.stringify(db_data));
  const user = extractUserInfo(await getServerSession());
  const isAuthorized = (post.user._id === user?._id || user?.admin)

  // set post datetime
  post.date = new Date(post.date).toLocaleString('en-GB');
  return (
    <>
      <h3 className="text-3xl font-bold mb-4">
        Submission by 
        Coder <Link href={`/users/${post.user._id}`} className="link_color">{post.user.username}</Link> for
        Challenge <Link href={`/tests/${post.test._id}`} className="link_color">{post.test.title}</Link>
      </h3>
      <div className="flex flex-col md:flex-row">
        {/* COL 1: USER INFO */}
        <div className="md:w-5/12">
          <div className="font-bold">Grade: {post.grade}</div>
          <div><span className="font-bold">Time submitted: </span>{post.date}</div>
          <div className="mt-5">
            {
                post.results ? 
                post.results.map((item, i) => <TestCaseCard key={item._id} result={item} order={i} isAuthorized={isAuthorized} /> )
                //<div key={i}>Test {i+1} {item.success? "passed" : "failed"}</div>) 
                :
                null
            }
          </div>
          
        </div>

        {/* COL 2: */}
        <div className="md:w-7/12">
          {isAuthorized && <CodeView inputCode={post.content} />}
        </div>
      </div>
    </>
  )
}

const TestCaseCard = ({result, order, isAuthorized}) => {
  return (
    <div className={`${result.success? "bg-[#acffd740] text-green-700" : "bg-[#ffe1d043] text-red-500"} 
        shadow-md rounded-lg p-4 border border-gray-400 my-1 mr-10`}>
      <h3 className={`text-lg font-bold mb-2`}>
        Test {order + 1} {result.success? "passed" : "failed"}
      </h3>
      <p className="whitespace-pre-wrap">
        {isAuthorized && result.message}
      </p>
    </div>
)
}

export default PostViewPage