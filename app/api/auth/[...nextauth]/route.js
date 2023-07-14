import User from "@models/user";
import { connectedToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // Sign in with CodeObie
      name: "CodeObie",
      //specify which fields should be submitted
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {
        await connectedToDB();
        const { username, password } = credentials;

        const user = await User.findOne({ username });
        const passwordCorrect = user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);
        
        
        if (user && passwordCorrect) {
          // token handling
          return {
            name: JSON.stringify({
              username: user.username,
              name: user.name,
              admin: user.admin,
              _id: user._id,
            })
          }
        }
        else {
          return Promise.reject(new Error('Invalid username or password'));
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  }
});

export {handler as GET, handler as POST}