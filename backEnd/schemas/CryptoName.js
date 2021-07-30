import mongoose from 'mongoose'



const coinSchema = new mongoose.Schema({
    coin : String 
})

export default mongoose.model('coins' ,coinSchema  )