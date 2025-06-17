import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET() {
  try {
    await connectDB();
    const poll = await Poll.find();

    return NextResponse.json({ poll });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { error: "Failed to fetch polls. Please try again." },
      { status: 500 }
    );
  }
}
