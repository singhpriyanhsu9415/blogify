import mongoose from "mongoose";

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    image:{
        type:String,
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{
    timestamps:String
})

const Blogmodel= mongoose.model("Posts",BlogSchema)

export default Blogmodel