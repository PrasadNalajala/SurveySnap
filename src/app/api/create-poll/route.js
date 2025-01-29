import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function POST(request) {
  try {
    await connectDB();

    const { title, options } = await request.json();

    // Validate input
    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { error: "Title and at least two options are required!" },
        { status: 400 }
      );
    }

    // Save the poll to the database
    const poll = new Poll({
      title,
      options: options.map((option) => ({ text: option })),
    });

    await poll.save();

    return NextResponse.json({ message: "Poll created successfully!", poll });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { error: "Failed to create poll. Please try again." },
      { status: 500 }
    );
  }
}
