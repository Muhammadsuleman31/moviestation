import mongoose from "mongoose"

const Schema = mongoose.Schema

const userschema = new Schema({
   name : String,
   email : String,
   password : String

})

const User = mongoose.model("users",userschema)
export default User