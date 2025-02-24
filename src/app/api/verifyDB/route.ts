import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
    });
  }
}
