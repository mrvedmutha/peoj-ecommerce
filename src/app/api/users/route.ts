import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import { getServerSession } from "next-auth";
import { errorResponse, successResponse } from "@/utils/jsonResponse";
import { authOptions } from "@/lib/auth";
import { Roles } from "@/types/enum/enumExports";

export async function GET(request: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  try {
    const sessionRole = session.user.role;
    if (
      sessionRole === Roles.CUSTOMER ||
      sessionRole === Roles.EDITOR ||
      sessionRole === Roles.INVENTORY ||
      sessionRole === Roles.MARKETER
    ) {
      return errorResponse("Unauthorized!", 403);
    }
    const users = (await userService.getUser()) || [];
    return successResponse("Users fetched successfully", 200, users);
  } catch (e) {
    return errorResponse("Error fetching users", 500, e);
  }
}
