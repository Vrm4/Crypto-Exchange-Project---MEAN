import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import api from './api.js'
import CryptoName from './schemas/CryptoName.js'
import Users from './schemas/Users.js'
import Board from './schemas/Board.js'

const app = express()
const port = process.env.PORT || 3000;

// create token 
const mytoken = crypto.randomBytes(64).toString('hex')
let jwsToken = (username) =>{
  return jsonwebtoken.sign(username ,mytoken,{ expiresIn: 86400 * 30 })
}

// connect database 
const connectURL = 'mongodb+srv://ngtutoriol:text1234@nodetuts.nhgzc.mongodb.net/cryptoApp?retryWrites=true&w=majority'
mongoose.connect(connectURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(cors())
app.use(express.json())

// login 
app.post('/login', (req,res) =>{
    Users.find({userName : req.body.userName , password : req.body.pass } , (err,data) =>{
      if(data.length){
        res.status(200).send({messages : 'Login Successful' , loginToken : jwsToken({userName : req.body.userName}) , userData : data})
      }else{
        res.status(500).send({messages : 'Login Not Successful'})
      }
    })
})

// buy coin 
app.post('/buy-coin' , (req,res)=>{
  let laststatus = 1
  // add database that order 
    Board.create({
      name : req.body.name , 
      coinPrice : req.body.submitValue.coinPrice , 
      order : true ,
      quantity : req.body.submitValue.coinQuantity , 
      price : req.body.submitValue.coinUsdt,
      date : req.body.data ,
      kind : 1,
      userId : req.body.userId 
    },(err,data) =>{
      if(!err){
      
        if(laststatus === 1){
          
          Users.find({_id : req.body.userId , coins : {$elemMatch: { coin : req.body.name}}},(err,data) => { 
            let userCoinData = { coin : req.body.name  , quantity : req.body.submitValue.coinQuantity , coinPrice :req.body.submitValue.coinPrice , coinUsdt : req.body.submitValue.coinUsdt }
            let buyDatas = []
            let newUsdt  = '';  
            let NewQuantity  = ''; 
            let waitData = async () =>{ 
              try {
                //if you have a coin add it on top
                if(data.length){
                  let forPromise = new Promise((resolve , reject) =>{
                    for( let i = 0; i < data[0].coins.length ; i ++){
                      if(data[0].coins[i].coin === req.body.name){
                        newUsdt = Number(data[0].coins[i].coinUsdt) + Number(req.body.submitValue.coinUsdt);
                        NewQuantity = Number(data[0].coins[i].quantity) + Number(req.body.submitValue.coinQuantity);
                        buyDatas.push(newUsdt)
                        buyDatas.push(NewQuantity)
             
                        resolve(buyDatas)
                      }
                    }
                  })
                  let ForPromiseResult ;
                  try {
                    ForPromiseResult = await forPromise;
                  } catch (e) {
                    console.log(e)
                  }
                  await Users.updateMany({_id : req.body.userId ,  'coins.coin' : req.body.name }, { $set : { 'coins.$.coinUsdt' : buyDatas[0].toFixed(2) , 'coins.$.quantity' : buyDatas[1].toFixed(4) }  } ,(err,data) =>{
                    if(!err){
                      return res.status(200).send({message : 'buyed'})
                    }else{
                      return res.status(500).send({message : 'error!'})
                    }
                  })
                }else{
                  
                  Users.updateMany({_id : req.body.userId}, { $push : {coins : userCoinData}} ,(err,data) =>{
                    if(!err){
                      return res.status(200).send({message : 'buyed'})
                      
                    }else{
                      return res.status(500).send({message : 'error!'})
                    }
                  })
                }
              } catch (e) {
                console.log(e)
                res.status(500).send({err : 'Error'})
              }
            }
            waitData();
          })

        }
      }else{
        res.status(500).send({message : 'Error'})
      }
    })
})
// sell coin 
app.post('/sell-coin' , (req,res) =>{
  // find that coin from coin of users 
  Users.find({_id : req.body.userId , coins : {$elemMatch: { coin : req.body.name}}},(err,data) => { 
    let newUsdtDatas = [];
    let newUsdtSell  = ''; 
    let NewQuantitySell  = ''; 
      let waitDataSell = async () =>{ 
        try {
          // if there's have a data and sell value of order  
          if(data.length && req.body.order === false){
            let forPromise = new Promise((resolve , reject) =>{
              for( let i = 0; i < data[0].coins.length ; i ++){
                if(data[0].coins[i].coin === req.body.name){
                  newUsdtSell = Number(data[0].coins[i].coinUsdt) - Number(req.body.submitValue.coinUsdt);
                  NewQuantitySell = Number(data[0].coins[i].quantity) - Number(req.body.submitValue.coinQuantity);
                  newUsdtDatas.push(newUsdtSell)
                  newUsdtDatas.push(NewQuantitySell)
                  resolve(newUsdtDatas)
                }
              }
            })
            let ForPromiseResult ;
            try {
              ForPromiseResult = await forPromise;
            } catch (e) {
              console.log(e)
            }
            await Users.updateMany({_id : req.body.userId ,  'coins.coin' : req.body.name }, { $set : { 'coins.$.coinUsdt' : newUsdtDatas[0].toFixed(2) , 'coins.$.quantity' : newUsdtDatas[1].toFixed(4) }  } ,(err,data) =>{
              if(!err){
                Board.create({
                  name : req.body.name , 
                  coinPrice : req.body.submitValue.coinPrice , 
                  order : false ,
                  quantity : req.body.submitValue.coinQuantity , 
                  price : req.body.submitValue.coinUsdt,
                  date : req.body.data ,
                  kind : 1,
                  userId : req.body.userId 
                },(err,data) => { (!err)? console.log('Coin Added to buy history') : console.log(err)} )
                res.status(200).send({message : 'Selled'})
              }else{
                res.status(500).send({message : 'error!'})
              }
            })
          }
        } catch (e) {
          console.log(e)
          res.status(500).send({errorMessage : 'Error'})
        }
      }
      waitDataSell()
    
  })


})
// refresh data 
app.post('/refresh-data' , (req,res) =>{
  Users.find({_id : req.body.UserId1} , (err,data) =>{
    if(data.length) {
      res.status(200).send({userData : data})
    }else{
      res.status(500).send({message : 'Error'})
    }
  })
})
// register 
app.post('/register' , (req,res) =>{
  Users.find({userName : req.body.userName},(err,data)=>{ 
    if(data.length){
      res.status(400).send({message : 'This user already have'})
    }else{
      Users.create({
        userName : req.body.userName , 
        name : req.body.name , 
        eMail : req.body.eMail,
        password : req.body.pass , 
        blance : 0 , 
        blanceStatus : '%0.00' ,
        coins : [
          
        ] ,
        pp : 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-PNG.png' ,
      },
      (err,resultData ) => { 
        if(!err){
          res.status(201).send({message : 'Register Successful'})
        }else{
          res.status(500).send({message : 'Register Not Successful'})
        }
      })
    }
  })

})
// update blance 
app.put('/update-blance/:id' , (req,res) =>{
  Users.updateMany({_id : req.params.id} , { $set : { blance : req.body.blance }}, (err,data) =>{
    if(!err) {
      return res.status(200).send({message : 'Updated' , id : req.params.id})
      
    }else{
      return res.status(500).send({message : 'Error!!!'})
    }
  })
})

// orders 
app.get('/order-history' , (req,res) =>{
    Board.find((err,data) =>{
      if(!err){
        res.status(200).send({orderData: data})
      }else{ 
        res.status(500).send({messages : 'err'})
      }
    })
})
// coin api from api.js 
app.get('/cryptocurrencies', (req, res) => { 
    let cryptoData = async () => { 
      try { 
        var coinsName = [] 
   
   
        let waitResultPromise = new Promise((resolve, reject) => { 
   
          CryptoName.find((err, data) => { 
            if (!err) { 
              for (var key in data) { 
                coinsName.push(data[key].coin) 
                resolve(coinsName) 
              } 
            } else { 
              reject(err) 
            } 
          }) 
        }) 
        let waitResult; 
        try{ 
         waitResult = await waitResultPromise; 
        } 
        catch(e){ 
         console.log(e) 
        } 
   
        let result = await api.getQuotes({ 
          symbol: coinsName 
        }); 
        res.status(200).send(result.data) 
        console.log(result) 
      } catch (error) { 
        res.status(500).send({ 
          messages: 'Error' 
        }) 
      } 
    } 
    cryptoData(); 
  })

app.listen(port , () => { 
    console.log('Connected!')
})
