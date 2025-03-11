import express from 'express';
import dotenv from 'dotenv'
import { mongoose } from 'mongoose';
import AuthRoutes from './routes/Auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import BlogRoutes from './routes/Blog.js';
import { Dashboard } from './controllers/Dashboard.js';
import CommentRoutes from './routes/comments.js';
import PublicRoutes from './routes/public.js';

dotenv.config();

const PORT=process.env.PORT || 8000
const mongoURI=process.env.MONGO_URL
const app=express();

const corsOptoins={
    origin:true,
    credentials:true
}
app.use(cors(corsOptoins));
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB successfully!"))
.catch(err => console.error("MongoDB Connection Error:", err));


app.use('/auth',AuthRoutes)
app.use('/blog',BlogRoutes)
app.use('/dashboard',Dashboard)
app.use('/comment',CommentRoutes)
app.use('/GetSinglePost',PublicRoutes)

app.listen(PORT,(req,res)=>{
    console.log(`app is running at ${PORT}`)
})
