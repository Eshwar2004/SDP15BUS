import mongoose from 'mongoose';
const BusesSchema = mongoose.Schema({
    ID:{
        type:String,
        unique:true,
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
    boardingtime:{
        type:String,
        required:true,
    },
    droptime:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    noofseats:{
        type:String,
        required:true,
    },
    acornonac:{
        type:String,
        required:true,
    },
    seaterorsleeper:{
        type:String,
        required:true,
    },
    seatstatus:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    seatvacancy:{
        type:String,
        required:true,
    },
    

})
const Buses = mongoose.model("Buses",BusesSchema)
export default Buses;