import { Router } from "express";
import { createUser, getUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/createUser").post(createUser)
router.route("/:email").get(getUser)


export default router;