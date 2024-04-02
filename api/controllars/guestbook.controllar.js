import Guestbook from "../models/guestbook.model.js";

export const guestbook = async (req, res, next) => {
  try {
    const guestbook = await Guestbook.create(req.body);
    return res.status(201).json(guestbook);
  } catch (error) {
    next(error);
  }
};
