import express, { urlencoded } from 'express'
import cors from 'cors'
import { routerPrefix } from './constants.js'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit:'16kb'
}))
app.use(urlencoded({
    extended:true,
    limit:'16kb'
}))
app.use(express.static('Public'))

// Import routes
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"

// Routes declaration
app.use(`/${routerPrefix}/users`,userRouter)
app.use(`/${routerPrefix}/todos`,todoRouter)


export {app}