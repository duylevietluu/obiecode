import User from "@models/user";
import Post from "@models/post";
import { connectedToDB } from "@utils/database"
import Link from "next/link";
import Grade from "@components/Grade";
import DeleteButton from "@components/DeleteButton";
import { getUserSession } from "@utils/utilFunc";

const UserPage = async({params}) => {
  await connectedToDB();
  // only show username, name, admin, and _id
  const db_data = await User.findById(params.id, { username: 1, name: 1, admin: 1, _id: 1 });
  const user = JSON.parse(JSON.stringify(db_data));
  const loggedUser = await getUserSession();
  user.role = user.admin ? "Admin" : "User";
  user.color = user.admin ? "text-red-500" : "text-green-500";
  // fetch posts associated with this user
  const db_data2 = await Post.find({ user: user._id }).populate('test', 'title');
  const posts = JSON.parse(JSON.stringify(db_data2));
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  posts.forEach(post => {
    post.date = new Date(post.date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* COL 1: USER INFO */}
        <div className="md:w-5/12">
          <div className="profile_card">
            <h3 className={`text-3xl font-bold mb-4 ${user.color}`}>Coder {user.username}</h3>
            <img
              className="py-4 mx-auto"
              width={200}
              src={user.image ?? '/default_pfp.png'}
              alt={`User's profile picture`}
            />
            <div>
              <span className="font-bold">Name: </span>
              <span>{user.name}</span>
            </div>
            <div>
              <span className="font-bold">Role: </span>
              <span>{user.role}</span>
            </div>
            <div>
              <span className="font-bold">Submission posted: </span>
              <span>{posts.length}</span>
            </div>
            {(loggedUser?.admin || loggedUser?._id === user?._id) && <DeleteButton id={user._id} type="user" />}            
          </div>
          
        </div>

        {/* COL 2: table of posts */}
        <div className="md:w-7/12">
          {
            posts.length === 0 ?
            <h3 className="text-2xl font-semibold mb-4">
              No submissions yet!
            </h3>
            :
            <table className="w-full rounded-lg overflow-hidden border border-gray-900 alt_table">
            <thead>
              <tr>
                <th className="w-60 text_th">Test Submitted</th>
                <th className="w-20 text_th">Date</th>
                <th className="w-20 text_th">Grade</th>
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
                    <td className="border px-4 py-2 text-center">{post.date}</td>
                    <td className="border px-4 py-2 text-center font-semibold">
                      <Grade grade={post.grade}  />
                    </td>
                  </tr>
                )
              }
            </tbody>
            </table>
          }
        </div>
      </div>
    </>
  )
}

export default UserPage