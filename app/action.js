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
import bcrypt from 'bcrypt';
import User from "@models/user";

// createOrEditTest
export const createOrEditTest = async(testId, title, content, testCases) => {
  // if testId is not null then edit test
  // else create test
  try {
    const user = extractUserInfo(await getServerSession());
    // if not authorized then return
    if (!user || !user.admin) {
      return({ error: "403 Unauthorized!" });
    }
    // validate
    if (!title || !content || !testCases || testCases.length === 0) {
      return({ error: "title, content, testCases are required!" });
    }
    await connectedToDB();
    const data = { title, content, testCases };
    if (testId) {
      await Test.findByIdAndUpdate(testId, data, {new: true});

    } else {
      const newTest = new Test(data);
      await newTest.save();
      testId = newTest._id;
    }
    revalidatePath('/tests');
    revalidatePath(`/tests/${testId}`);
    return({ data: testId });
  } catch (error) {
    return({ error: error.message });
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

export const addPostAction = async(testId, userId, code) => {
  try {
    await connectedToDB();

    // validation
    if (!code) {
      return {error: "code is empty"};
    }

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

    return {data: String(newPost._id)};
  } catch (error) {
    return {error: error.message};
  }
}

// register a new user
export const registerAction = async(username, name, password) => {
  try {
    await connectedToDB();
    if (!password || password.length < 8) {
      return {error: "Password must be available and at least 8 characters long"};
    }
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
      admin: false,
    });
    await user.save();
    return {data: String(user._id)};
  } catch (error) {
    if (error?.message && error.message.includes('duplicate key error')) {
      return {error: "Username already taken"};
    }
    return {error: error.message};
  }
}