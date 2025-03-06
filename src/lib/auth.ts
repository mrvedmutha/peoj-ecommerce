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
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
