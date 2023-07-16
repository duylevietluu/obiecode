import { getServerSession } from "next-auth";

export const extractUserInfo = (data) => {
  try {
    return data?.user?.name && JSON.parse(data.user.name);
  } catch (error) {
    return null;
  }
};

export const getUserSession = async () => {
  const data = await getServerSession();
  return extractUserInfo(data);
};
