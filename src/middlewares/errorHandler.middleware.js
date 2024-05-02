import { ApiError } from "../utils/ApiError.js";
import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
    console.log("AT middleware code: ",err.code);
    console.log("AT middleware msg: ",err.meta.cause);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status:err.statusCode,
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    }
    else if(err instanceof Prisma.PrismaClientKnownRequestError){
        res.json({
            status:err.code,
            success: false,
            message: err.message || err.meta?.message || err.meta?.cause || "Prisma request error",
            errors: err.meta || err.meta?.errors || [],
            data: null
        });
    }
    else {
        // console.error('Unhandled error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            errors: [],
            data: null
        });
    }
};

export default errorHandler
