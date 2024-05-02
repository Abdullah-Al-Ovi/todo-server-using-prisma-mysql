import { Router } from "express";
import { createTodo, getTodosbyUserId,  } from "../controllers/todo.controller.js";

const router = Router()

router.route("/createTodo").post(createTodo)
router.route("/my-todos/:id").get(getTodosbyUserId)

export default router