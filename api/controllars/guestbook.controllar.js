import Guestbook from "../models/guestbook.model.js";

export const guestbook = async (req, res, next) => {
  try {
    const guestbook = await Guestbook.create(req.body);
    return res.status(201).json(guestbook);
  } catch (error) {
    next(error);
  }
};

export const getGuestbooks = async (req, res, next) => {
  try {
    const guestbooks = await Guestbook.find({}).sort({ createdAt: -1 });
    return res.status(200).json(guestbooks);
  } catch (error) {
    next(error);
  }
};
