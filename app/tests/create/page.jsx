import TestForm from '@components/TestForm';
import { getUserSession } from '@utils/utilFunc';
import { redirect } from 'next/navigation';
const CreateTest = async() => {
  const user = await getUserSession();
  if (!user?.admin) {
    redirect('/tests');
  }
  return <TestForm />
}

export default CreateTest;