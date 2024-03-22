import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10); //10 is the number of rounds and we use bcryptjs for secure
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    // next(errorHandler(550, "Error from the function signup")); 
    next(error);
  }
};
