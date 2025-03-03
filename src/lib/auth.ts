import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cxService } from "@/service/cxService";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import CxUser from "@/models/cxUser";
import bcrypt from "bcryptjs";
import { Roles } from "@/types/enum/enumExports";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any, res: any): Promise<any> {
        try {
          await dbConnect();
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { identifer: credentials.identifier },
            ],
          });
          if (!user) {
            console.log("User not found");
            throw new Error();
          }
          const isPasswordValid = bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Password is not correct!");
          }
          //console.log(`user: ${user}`); //TODO remove
          return user;
        } catch (e: any) {
          console.log(e);
          throw new Error("Error connecting database", e);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        console.log(profile);
        await dbConnect();
        const findUser = await cxService.getCxUserByEmail(profile.email);
        if (!findUser) {
          await cxService.createCxGoogleUser(
            profile.email,
            profile.name,
            Roles.CUSTOMER
          );
          //console.log(profile); //TODO remove
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log("User beforen jwt: ", user);
      console.log("--------------");
      console.log("Token beforen jwt: ", token);
      if (user) {
        await dbConnect();
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await CxUser.findOne({ email: user.email });
        }
        if (existingUser) {
          token._id = existingUser._id;
          token.username = existingUser.username;
          token.fullname = existingUser.fullname;
          token.role = existingUser.role;
        }
      }
      if (!user && token.email) {
        await dbConnect();
        let existingUser = await User.findOne({ email: token.email });
        if (!existingUser) {
          existingUser = await CxUser.findOne({ email: token.email });
        }
        if (existingUser) {
          token._id = existingUser._id;
          token.username = existingUser.username;
          token.fullname = existingUser.fullname;
          token.role = existingUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.fullname = token.fullname;
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
  secret: process.env.NEXTAUTH_SECRET,
};
