
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()
connectDB()
 const app=express()
 app.use(express.json())
 app.use(cors())
 app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
 const PORT=process.env.PORT|| 5000

app.listen(PORT,()=>{
    console.log(`server running  on port ${PORT}`)
})