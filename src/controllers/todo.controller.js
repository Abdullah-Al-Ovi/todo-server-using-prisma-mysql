import prisma from "../DB/db.config.js";
import {  Prisma } from '@prisma/client'
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

        const newTodo = await prisma.todo.create({
            data: {
                userId: Number(userId),
                title,
                description
            }
        })
        if(!newTodo){
            throw new ApiError(500, "Something went wrong while creating this todo")
        }
        console.log(newTodo);
        return res.status(200).json(
            new ApiResponse(200, "Todo added successfully", newTodo)
        )
})

const getTodosbyUserId = asyncHandler(async (req, res) => {
    // get user email from params and find user info and send response
    const userId = req.params?.id
    // console.log(userId);
    
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
        if(!todos){
            throw new ApiError(400,"No todos found")
        }
        // console.log(todos);
        return res.status(200).json(
            new ApiResponse(200, "User found successfully", todos)
        )
    
})

const getIndividualTodoByTodoId = asyncHandler(async (req, res) => {
    const todoId = req.params?.id
        const individualTodo = await prisma.todo.findFirst({
            where: {
                id: Number(todoId)
            }
        })
        console.log(individualTodo);
        if (!individualTodo) {
            throw new ApiError(400, "Todo not found")
        }
        return res.status(200).json(
            new ApiResponse(200, "Todo found successfully", individualTodo)
        )
})

const updateTodo = asyncHandler(async (req, res) => {
    const todoId = req.params?.id
    const { title, description, status } = req.body
    // console.log(req.body);
    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Updated fields are required")
    }

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
        if(!updatedTodo){
            throw new ApiError(500, "Something went wrong while updating this todo")
        }
        return res.status(200).json(
            new ApiResponse(200, "Todo updated successfully", updatedTodo)
        )
    
})

const deleteTodo=asyncHandler(async(req,res)=>{
    const todoId = req.params?.id 
    console.log(todoId);
   
     const deletedTodo = await prisma.todo.delete({
         where:{
             id: Number(todoId)
         }
     })
     if(!deleteTodo){
        throw new ApiError(500, "Something went wrong while deleting this todo")
     }
     return res.status(200).json(
         new ApiResponse(200,"Todo deleted succesfully",deletedTodo)
     )
   
})

export { createTodo, getTodosbyUserId, getIndividualTodoByTodoId, updateTodo, deleteTodo}