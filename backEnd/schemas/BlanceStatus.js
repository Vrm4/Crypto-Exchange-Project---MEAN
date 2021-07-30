import mongoose from 'mongoose' 

const blanceStatusSchema = new mongoose.Schema({
    lastBlance : Number,
    lastStatus : String 
})

export default mongoose.model('blanceStatus' , blanceStatusSchema)
