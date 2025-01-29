import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent recompiling model during hot reloads
export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
