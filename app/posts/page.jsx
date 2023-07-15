import Grade from "@components/Grade";
import Post from "@models/post";
import { connectedToDB } from "@utils/database";
import Link from "next/link";

const AllPosts = async({searchParams}) => {
  await connectedToDB();
  const search = {}
  if (searchParams.testid) {
    search.test = searchParams.testid;
  }
  if (searchParams.userid) {
    search.user = searchParams.userid;
  }
  const db_data = await Post.find(search)
    .populate('test', 'title')
    .populate('user', {'username':1});
  const posts = JSON.parse(JSON.stringify(db_data));
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  posts.forEach(post => {
    post.date = new Date(post.date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });
  if (posts.length === 0) {
    return (
      <div className="items-center">
        No submissions found for {searchParams.testid &&
        <span>
          <Link className="link_color" href={`/tests/${searchParams.testid}`}>this test</Link>
        </span>} {searchParams.userid && 
        <span>
          by <Link className="link_color" href={`/users/${searchParams.userid}`}>this user</Link>
        </span>}
      </div>
    )
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        Submissions {searchParams.testid &&
        <span>
          for <Link href={``}>{posts[0]?.test.title}</Link>
        </span>}
        {searchParams.userid && ` by ${posts[0]?.user.username}`}
      </h2>
      <table className="w-full rounded-lg overflow-hidden border border-gray-900 alt_table">
        <thead>
          <tr>
            <th className="w-[50%] text_th">Test Submitted</th>
            <th className="w-[15%] text_th">User</th>
            <th className="w-[20%] text_th">Date</th>
            <th className="w-[15%] text_th">Grade</th>
          </tr>
        </thead>
        <tbody>
          {
            posts.map(post =>
              <tr key={post._id}>
                <td className="border px-4 py-2">
                  <Link href={`/posts/${post._id}`} className="font-semibold link_color">
                    {post.test.title}
                  </Link>
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/users/${post.user._id}`} className="font-semibold link_color">
                    {post.user.username}
                  </Link>
                </td>
                <td className="border px-4 py-2 text-center">{post.date}</td>
                <td className="border px-4 py-2 text-center font-semibold">
                  <Grade grade={post.grade}  />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
    
  )
}

export default AllPosts;