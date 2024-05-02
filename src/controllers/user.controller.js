import prisma from "../DB/db.config.js";
import { Prisma } from '@prisma/client'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createUser = asyncHandler(async (req, res) => {

    // get data from req.body
    // validate data
    // check for existing user
    // create user and send response

    const { email } = req.body
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
  
        const existedUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (existedUser) {
            throw new ApiError(409, "User with same email already exists")
        }

        const newUser = await prisma.user.create({
            data: {
                email
            }
        })
        // console.log(newUser);
        if(!newUser){
            throw new ApiError(500, "Something went wrong while creating user.")
        }


        return res.status(200).json(
            new ApiResponse(200, "User created successfully", newUser)
        )
 
})

const getUser = asyncHandler(async (req, res) => {
    // get user email from params and find user info and send response
    const userEmail = req.params?.email
        const user = await prisma.user.findFirst({
            where: {
               email: userEmail
            }
        })
        if(!user){
            throw new ApiError(500, "User not found")
        }
      return res.status(200).json(
            new ApiResponse(200, "User found successfully", user)
        )
})



export { createUser,getUser }