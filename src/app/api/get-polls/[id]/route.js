// import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";
console.log("iiii");
export async function GET(req, { params }) {
  console.log("Calling");
  try {
    await connectDB();
    const poll = await Poll.findById(params.id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found." }, { status: 404 });
    }

    return NextResponse.json({ poll });
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json(
      { error: "Failed to fetch poll. Please try again." },
      { status: 500 }
    );
  }
}
