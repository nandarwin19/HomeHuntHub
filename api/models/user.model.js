import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://i.imgur.com/6VBx3io.png",
    },
  },
  { timestamps: true }
); //timestamps: true adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
