import mongoose from "mongoose";
const UserSchema= new mongoose.Schema({
    FullName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    profile:{
        type:String,
    },
    role:{
         type: String,
        enum: ['admin', 'editor','reader'],
        default: 'editor',
    }
},{timestamps:true})

const UserModel=mongoose.model('User',UserSchema)

export default UserModel