import mongoose from "mongoose";
import User from "@models/user";
import Post from "@models/post";
import Test from "@models/test";

let isConnected = false; // track the connection

export const connectedToDB = async() => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    // console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "testCodeApp2",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
}