import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
export const checkUserSession = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  return session;
};
