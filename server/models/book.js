import mongoose from 'mongoose';
const BookSchema = mongoose.Schema({
    ID:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    boarding:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    seatsselected:{
        type:String,
        required:true,
    },
})
const Book = mongoose.model("Book",BookSchema)
export default Book;