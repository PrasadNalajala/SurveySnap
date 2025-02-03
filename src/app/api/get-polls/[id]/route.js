import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Poll from "@/models/Poll";
import mongoose from "mongoose";

export async function GET(req, { params }) {
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

export async function POST(req, { params }) {
  console.log("coming")
  try {
    await connectDB();
    const { optionId } = await req.json();

    if (!optionId) {
      return NextResponse.json(
        { error: "Option ID is required to vote." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid poll ID." }, { status: 400 });
    }

    const poll = await Poll.findById(params.id);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found." }, { status: 404 });
    }

    const option = poll.options.find((opt) => opt._id.toString() === optionId);
    if (!option) {
      return NextResponse.json({ error: "Option not found in this poll." }, { status: 404 });
    }

    option.votes += 1;
    await poll.save();

    return NextResponse.json({ message: "Vote submitted successfully.", poll });
  } catch (error) {
    console.error("Error submitting vote:", error);
    return NextResponse.json(
      { error: "Failed to submit vote. Please try again." },
      { status: 500 }
    );
  }
}
