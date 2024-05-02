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

export { createTodo }