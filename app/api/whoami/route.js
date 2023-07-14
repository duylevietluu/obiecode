import { extractUserInfo } from "@utils/utilFunc";
import { getServerSession } from "next-auth";

export const GET = async() => {
  const data = await getServerSession();
  const user = extractUserInfo(data);
  if (user) 
    return new Response(JSON.stringify(user), {status: 200});
  else 
    return new Response('No one', {status: 200});
}