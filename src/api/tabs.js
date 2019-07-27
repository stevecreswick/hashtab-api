import express from "express";
import TabModel from "../models/TabModel";

const router = express.Router();

// Post
const post = async (req, res) => {
  // @todo: add validation of the params before anything
  const { body } = req;
  const { url, category, user_id: userId } = body;

  if (!url || !category) {
    return res.sendStatus(400);
  }

  const tab = await TabModel.create({ url, category, user_id: userId });

  res.json({ tab });
};

const get = async (req, res) => {
  const userId = req.params.userId;
  console.log("Hello ", userId);
  const tab = await TabModel.findByPK(userId);

  res.send({ tab });
};

router.get("/:userId", get);
router.post("/", post);

export default router;
