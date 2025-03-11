import express from 'express'
import{ Login, LogOut, Register} from '../controllers/Auth.js';
import { upload } from '../middleware/Multer.js';

const AuthRoutes=express.Router()

AuthRoutes.post('/register',upload.single('profile'),Register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout',LogOut)
export default AuthRoutes;
