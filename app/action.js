"use server";

import BestGrade from "@models/bestgrade";
import Post from "@models/post";
import Test from "@models/test";
import { connectedToDB } from "@utils/database";
import { grader } from "@utils/grader";
import { extractUserInfo } from "@utils/utilFunc";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const extractTestInfoFrom = (formData) => {
  const numTestCases = parseInt(formData.get('numTestCases'));
  // validate numTestCases
  if (isNaN(numTestCases) || numTestCases < 1 || numTestCases > 10) {
    throw new Error('Invalid number of test cases');
  }
  const test = {
    _id: formData.get('_id'),
    title: formData.get('title'),
    content: formData.get('content'),
    testCases: [],
  }
  if (!test._id) delete test._id;
  for (let i = 1; i <= numTestCases; i++) {
    test.testCases.push({
      input: formData.get(`input ${i}`),
      output: formData.get(`output ${i}`),
    })
  }
  return test;
}

export const addTestAction = async(formData) => {
  let new_test_id = null;
  try {
    const user = extractUserInfo(await getServerSession());
    // if not authorized then return
    if (!user || !user.admin) {
      throw new Error('unauthorized add test');
    }
    const test = extractTestInfoFrom(formData);
    await connectedToDB();
    const newTest = new Test(test);
    await newTest.save();
    revalidatePath('/tests');
    new_test_id = newTest._id;
  } catch (error) {
    console.log(error);
  }
  if (new_test_id) {
    redirect(`/tests/${new_test_id}`);
  }
}

export const editTestAction = async(formData) => {
  let new_test_id = null;
  try {
    const user = extractUserInfo(await getServerSession());
    // if not authorized then return
    if (!user || !user.admin) {
      throw new Error('unauthorized edit test');
    }
    const test = extractTestInfoFrom(formData);
    await connectedToDB();
    const updatedTest = await Test.findByIdAndUpdate(test._id, test, {new: true});
    revalidatePath('/tests');
    revalidatePath(`/tests/${test._id}`);
    new_test_id = updatedTest._id;
  } catch (error) {
    console.log(error);
  }
  if (new_test_id) {
    redirect(`/tests/${new_test_id}`);
  }
}

export const deleteTestAction = async(testId) => {
  let isError = false;
  try {
    const user = extractUserInfo(await getServerSession());
    // if not authorized then return
    if (!user || !user.admin) {
      throw new Error('unauthorized delete test');
    }
    await connectedToDB();
    await Test.findByIdAndDelete(testId);
    // have to delete all post and bestgrade of this test
    await Post.deleteMany({test: testId});
    await BestGrade.deleteMany({test: testId});
    revalidatePath('/tests');
  } catch (error) {
    isError = true;
    console.log(error);
  }
  if (!isError) {
    redirect('/tests');
  }
}

// todo editUserAction
// have to handle profilePic as well!

export const addPostAction = async(formData) => {
  const code = formData.get('code');
  const testId = formData.get('testId');
  const userId = formData.get('userId');

  let new_post_id = null;
  try {
    await connectedToDB();

    // grade it
    const test = await Test.findById(testId);
    const testCases = test.testCases;
    
    const {results, grade} = await grader(code, testCases);
    const newPost = new Post({
      content: code,
      date: new Date(),
      test: testId,
      user: userId,
      results: results,
      grade: grade,
    });

    await newPost.save();
    new_post_id = String(newPost._id);

    // bestgrade
    const bestGrade = await BestGrade.findOne({test: testId, user: userId});
    if (!bestGrade) {
      const newBestGrade = new BestGrade({
        test: testId,
        user: userId,
        result: newPost.grade,
      });
      await newBestGrade.save();
    } else if (bestGrade.result < newPost.grade) {
      await BestGrade.findByIdAndUpdate(bestGrade._id, {result: newPost.grade});
      revalidatePath(`/tests/${testId}`);
    }
  } catch (error) {
    console.log(error);
  }
  if (new_post_id) {
    redirect(`/posts/${new_post_id}`);
  }
}