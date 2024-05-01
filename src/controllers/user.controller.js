import prisma from "../DB/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createUser = asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    try {
        const existedUser = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(existedUser){
            throw new ApiError(409,"User with same email already exists")
        }
    
        const newUser = await prisma.user.create({
            data:{
                email
            }
        })
        console.log(newUser);
    
        return res.status(200).json(
            new ApiResponse(200,"User created successfully",newUser)
        )
    } catch (error) {
        throw new ApiError(error?.status || 500, error?.message || "Something went wrong while creating user.")
    }
})


export {createUser}