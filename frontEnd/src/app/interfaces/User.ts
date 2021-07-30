export interface User { 
    _id  : Number,
    userName : String,
    name : String , 
    eMail : String ,
    password : String ,
    blance : Number ,
    blanceStatus : String ,
    coins : [
      {_id: String ,coin: String,quantity: Number , coinPrice: Number , coinUsdt : Number}
    ],
    pp : String  
}