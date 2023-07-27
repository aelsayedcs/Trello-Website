import { Schema, model } from "mongoose";


const userSchema= new Schema({
    userName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    age:Number,
    phone:String,

},{timestamps:true})

const userModel = model("User",userSchema)

export default userModel