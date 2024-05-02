import { Router } from "express";
import { createTodo, getIndividualTodoByTodoId, getTodosbyUserId,  } from "../controllers/todo.controller.js";

const router = Router()

router.route("/createTodo").post(createTodo)
router.route("/my-todos/:id").get(getTodosbyUserId)
router.route("/my-todos/individualTodo/:id").get(getIndividualTodoByTodoId)

export default router