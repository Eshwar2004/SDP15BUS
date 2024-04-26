import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        
    },
    message:{
        type:String,
        required:true,
    }
    

},{timestamps: true});

const contact=mongoose.model('contact',userSchema);

export default contact;