import mongoose from "mongoose";

const meesageSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
  },
  {timestamps: true}
);

export const Notification = mongoose.model("Notification", meesageSchema);
