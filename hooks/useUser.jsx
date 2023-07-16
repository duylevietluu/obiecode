import { extractUserInfo } from '@utils/utilFunc';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data, status } = useSession();
  const user = extractUserInfo(data);
  return { user, status };
}

export default useUser;