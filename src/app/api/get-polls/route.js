import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB

    const polls = await Poll.find({}).sort({ createdAt: -1 }); // Fetch polls from database
    return NextResponse.json({ polls });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { error: "Failed to fetch polls. Please try again." },
      { status: 500 }
    );
  }
}
