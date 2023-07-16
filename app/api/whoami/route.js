import { getUserSession } from "@utils/utilFunc";

export const GET = async() => {
  const user = await getUserSession();
  if (user) 
    return new Response(JSON.stringify(user), {status: 200});
  else 
    return new Response('No one', {status: 200});
}