import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import CxUser from "@/models/cxUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, res: any): Promise<any> {
        try {
          await dbConnect();
          let user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            user = await CxUser.findOne({
              $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            });
          }
          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Password is incorrect");
          }
          return user;
        } catch (error: any) {
          throw new Error("Error connecting to database", error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("--------------");
      // console.log("User before jwt:");
      // console.log(user);
      if (user) {
        token._id = user._id;
        token.fullname = user.fullname;
        token.email = user.email;
        token.role = user.role;
      }
      // if (user && !user.role) {
      //   console.log("no user role found, finding user..."); //TODO remove
      //   let existingUser: any = User.findOne({ email: token.email });
      //   // console.log("--------------");
      //   // console.log("existing user:");
      //   // console.log(existingUser);
      //   if (!existingUser) {
      //     existingUser = CxUser.findOne({ email: token.email });
      //   }
      //   if (existingUser) {
      //     token.fullname = existingUser.fullname;
      //     token.role = existingUser.role;
      //   }
      // }
      // // console.log("--------------");
      // // console.log("Token after jwt:");
      // // console.log(token);
      return token;
    },
    async session({ session, token }) {
      console.log("--------------");
      console.log("Session before session:");
      console.log(session);
      if (token) {
        session.user._id = token._id;
        session.user.fullname = token.fullname;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      console.log("--------------");
      console.log("Session after session:");
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
