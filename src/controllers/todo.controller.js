import prisma from "../DB/db.config.js";
import { PrismaClient, Prisma } from '@prisma/client'
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createTodo = asyncHandler(async (req, res) => {
    // get data from req.body
    // validate data
    // create todo and send response

    const { title, description, userId } = req.body
    // console.log(req.body);
    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    try {
        const newTodo = await prisma.todo.create({
            data: {
                userId: Number(userId),
                title,
                description
            }
        })
        console.log(newTodo);
        return res.status(200).json(
            new ApiResponse(200, "Todo added successfully", newTodo)
        )
    } catch (error) {
        // console.error("Prisma error:", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ApiError(error?.code, error?.message, error?.meta)
        }
        throw new ApiError(500, "Something went wrong while creating todo")
    }

})

const getTodosbyUserId = asyncHandler(async (req, res) => {
    // get user email from params and find user info and send response
    const userId = req.params?.id
    // console.log(userId);
    try {
        const todos = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            },
            include: {
                todo: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        });
        // console.log(todos);
        return res.status(200).json(
            new ApiResponse(200, "User found successfully", todos)
        )
    } catch (error) {
        // console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ApiError(error?.code, error?.message, error?.meta)
        }
        throw new ApiError(500, "Something went wrong while getting todos")
    }
})

const getIndividualTodoByTodoId = asyncHandler(async (req, res) => {
    const todoId = req.params?.id
    try {
        const individualTodo = await prisma.todo.findFirst({
            where: {
                id: Number(todoId)
            }
        })
        if (!individualTodo) {
            throw new ApiError(400, "Todo not found")
        }
        return res.status(200).json(
            new ApiResponse(200, "Todo found successfully", individualTodo)
        )
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ApiError(error?.code, error?.message, error?.meta)
        }
        throw new ApiError(500, "Something went wrong while getting this todo")
    }
})

const updateTodo = asyncHandler(async (req, res) => {
    const todoId = req.params?.id
    const { title, description, status } = req.body
    // console.log(req.body);
    try {
        const updatedTodo = await prisma.todo.update({
            where: {
                id: Number(todoId)
            },
            data: {
                title,
                description,
                status
            }
        })
        return res.status(200).json(
            new ApiResponse(200, "Todo updated successfully", updatedTodo)
        )
    } catch (error) {
        // console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ApiError(error?.code, error?.message, error?.meta);
        }
        throw new ApiError(500, "Something went wrong while updating the todo");
    }
})
export { createTodo, getTodosbyUserId, getIndividualTodoByTodoId, updateTodo}