import express from "express";
import UserModel from "../models/UserModel";

const router = express.Router();

const ATTRIBUTE_MAP = {
  profile: {
    pk: {
      dataType: "S"
    },
    sk: {
      dataType: "S"
    },
    email: {
      dataType: "S"
    },
    display: {
      dataType: "S"
    },
    location: {
      dataType: "S"
    }
  },
  category: {
    pk: {
      dataType: "S"
    },
    sk: {
      dataType: "S"
    },
    email: {
      dataType: "S"
    },
    display: {
      dataType: "S"
    },
    location: {
      dataType: "S"
    }
  }
};

const keyType = sortKey => {};

const parse = item => {
  // ATTRIBUTE_MAP[profile];
};

// Post
const post = async (req, res) => {
  // @todo: add validation of the params before anything
  const { body } = req;
  const { user_id: userId, email, location, display } = body;

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await UserModel.create({
    user_id: userId,
    email,
    location,
    display
  });

  res.json({ user });
};

const get = async (req, res) => {
  const userId = req.params.userId;

  const user = await UserModel.findByPK(userId);

  res.send({ user: UserModel.asJSON(user) });
};

router.get("/:userId", get);
router.post("/", post);

export default router;
