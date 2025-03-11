import express from 'express'
import { Create, DeleteBlog, GetPosts, update } from '../controllers/Blog.js'
import { upload } from '../middleware/Multer.js'
import { isAdmin } from '../middleware/CheckAdmin.js'

const BlogRoutes= express.Router()


BlogRoutes.post('/create',upload.single('image'),Create)
BlogRoutes.patch('/update/:id',isAdmin,upload.single('image'),update)
BlogRoutes.get('/GetPosts',GetPosts)
BlogRoutes.delete('/delete/:id',DeleteBlog)





export default BlogRoutes