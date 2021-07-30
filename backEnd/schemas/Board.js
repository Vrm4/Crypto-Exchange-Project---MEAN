import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    name : String , 
    coinPrice : Number , 
    order : Boolean ,
    quantity : Number , 
    price : Number,
    date : String,
    kind : Number,
    userId : String 
})

export default mongoose.model('board' , boardSchema)