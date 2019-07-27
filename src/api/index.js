import express from "express";
import tabs from "./tabs";
import users from "./users";

const router = express.Router();

router.use("/tabs", tabs);
router.use("/users", users);

export default router;
