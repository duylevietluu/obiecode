import { addTestAction } from '@app/action';
import TestForm from '@app/tests/TestForm';
import { extractUserInfo } from '@utils/utilFunc';
import { getServerSession } from 'next-auth';

const CreateTest = async() => {
  const user = extractUserInfo(await getServerSession());
  if (!user?.admin) {
    return (
      <div className="text-center text-2xl">
        <span className="red-btn">You are not authorized to create a test!</span>
      </div>
    )
  }
  return <TestForm action={addTestAction}  />
}

export default CreateTest;