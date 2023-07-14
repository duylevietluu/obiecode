export const extractUserInfo = (data) => {
  try {
    return data?.user?.name && JSON.parse(data.user.name);
  } catch (error) {
    return null;
  }
};
