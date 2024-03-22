import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found")); //if user not found
    }
    const validPw = bcryptjs.compareSync(password, user.password); //compare the password
    if (!validPw)
      //if password is not valid
      return next(errorHandler(401, "Password is not valid")); //401 is for unauthorized
    const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET);
    const { password: pw, ...rest } = user._doc; //to not send the password to the client
    res
      .cookie("token", token, {
        httpOnly: true, //to prevent cross site scripting
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //to set the expiration date
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
