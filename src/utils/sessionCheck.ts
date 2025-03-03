import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const checkUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
