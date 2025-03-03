import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import { errorResponse, successResponse } from "@/utils/jsonResponse";
import { Roles } from "@/types/enum/enumExports";
import { checkUserSession } from "@/utils/sessionCheck";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const session = await checkUserSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  try {
    const { id } = await params;
    const sessionUser = session.user;
    const userDetails = await userService.getUserById(id);
    if (!userDetails) {
      return errorResponse("User not found", 404);
    }
    if (
      sessionUser.role !== Roles.SUPERADMIN &&
      sessionUser.role !== Roles.ADMIN &&
      sessionUser._id !== id
    ) {
      return errorResponse("Access Denied! You are not authorized.", 403);
    }
    return successResponse("User fetched successfully", 200, userDetails);
  } catch (e) {
    console.error("Error fetching user:", e); //TODO remove
    return errorResponse("Error fetching user", 500, e);
  }
}
