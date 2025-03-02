import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import { errorResponse, successResponse } from "@/utils/jsonResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  try {
    const { id } = await params;
    const userDetails = await userService.getUserById(id);
    if (!userDetails) {
      return errorResponse("User not found", 404);
    }
    return successResponse("User fetched successfully", 200, userDetails);
  } catch (e) {
    console.error("Error fetching user:", e); //TODO remove
    return errorResponse("Error fetching user", 500, e);
  }
}
