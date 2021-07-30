import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName : String , 
    name : String , 
    eMail : String,
    password : String , 
    blance : Number , 
    blanceStatus : String ,
    coins : [
        { coin : String , quantity : Number , coinPrice : Number , coinUsdt : Number}
    ] ,
    pp : String ,
})

export default mongoose.model('users', userSchema )