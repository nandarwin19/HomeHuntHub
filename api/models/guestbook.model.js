import mongoose from "mongoose";

const guestBookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Guestbook = mongoose.model("Guestbook", guestBookSchema);
export default Guestbook;
