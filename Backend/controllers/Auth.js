import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken'
import fs from 'fs';
import bcrypt from 'bcrypt'
import { upload } from '../middleware/Multer.js';

const Register = async (req, res) => {
    try {
        const {FullName,email,password}=req.body
        // Upload the image to Cloudinary
        const imagePath = req.file.filename;
        // const cloudinaryResult = await FileUploadeToColoudinary(imagePath, 'user_profiles');
         console.log(imagePath)
        // Create a new user with the uploaded image URL
        const existUser= await UserModel.findOne({email})
        if (existUser) {
            return res.status(301).json({success:false,message:"User Already Exist Please Login"})
        }
        const hasePassword= await bcrypt.hashSync(password,10)
        const newUser = new UserModel({
            FullName: FullName,
            email: email,
            password: hasePassword,
            profile: imagePath,
        });

        // Save the user to the database
        await newUser.save();

        // // Remove the image from the local directory after uploading to Cloudinary
        //fs.unlinkSync(imagePath);

        res.status(201).json({success:true, message: 'User registered successfully',user:newUser});
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Error during registration' });
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const FindUser = await UserModel.findOne({ email });
        if (!FindUser) {
            return res.status(404).json({ success: false, message: "Account not found. Please register." });
        }
        const comparePassword = await bcrypt.compare(password, FindUser.password);
        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds
        });
        
        return res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const LogOut=async(req,res)=>{
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Return success message
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        // Handle error
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export  {Login,Register,LogOut};