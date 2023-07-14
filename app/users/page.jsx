import User from "@models/user";
import { connectedToDB } from "@utils/database";
import Link from "next/link";

const UserDashboard = async() => {
  await connectedToDB();
  // only fetch the _id, username, and name fields
  const db_data = await User.find({}, { _id: 1, username: 1, name: 1 });
  const users = JSON.parse(JSON.stringify(db_data));
  return (
    <>
      <h3 className="head_text">User Dashboard</h3>
      {
        users.map(user => 
          <div key={user._id}>
            <Link href={`/users/${user._id}`} className="test_link">
              {user.username} ({user.name})
            </Link>
          </div>
        )
      }
    </>
  )
}

export default UserDashboard